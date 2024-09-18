import { createBrowserClient } from '@/supabase/clients/browser'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect,  } from "react";
import { toast } from 'sonner';



interface AuthContextValue {
   user: User | null,
   loading: boolean,
   handeleSignOut: () => Promise<void>,
   handeleLogin: (email: string, password: string) => Promise<void>,
   handeleSignUp: (email: string, username: string, password: string) => Promise<void>,
   updateUser: (username: string) => Promise<{ success: boolean }>,

}


const AuthContext = createContext<AuthContextValue | null>(null);


export default function AuthProvider({ children }: { children: React.ReactNode }) {


   const supabase = createBrowserClient()
   const router = useRouter()

   const [user, setUser] = useState<User | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
         if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') {
            setUser(session?.user ?? null)
         } else if (event === 'SIGNED_OUT') {
            setUser(null)
         }
         setLoading(false)
      })
      return () => {
         data?.subscription.unsubscribe()
      }
   }, []);



   async function handeleSignOut () {
      setLoading(true);
      const {error} = await supabase.auth.signOut()
      if(error){
         toast.error(error.message)
      }else{
         router.refresh()
      }
      setLoading(false)
   }

 
   async function handeleLogin(email:string, password: string) {
      setLoading(true);
      const {error} = await supabase.auth.signInWithPassword({
         email,
         password
      })
      if(error){
         toast.error(error.message)
      }else{
         router.refresh()
      }
      setLoading(false)

   }

   async function handeleSignUp(email:string, username:string, password: string) {
      setLoading(true);
      const {error} = await supabase.auth.signUp({
         email,
         password,
         options: {data:{username}}
      })
      if(error){
         if(error.message === 'database error saving new user'){

            toast.error('username already taken')
         }else{
            toast.error(error.message)

         }
      }else{
         router.refresh()
      }
      setLoading(false)

   }

   async function updateUser(username: string): Promise<{ success: boolean }> {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { username },
      });
      setLoading(false);
    
      if (error) {
        if (error.message === 'database error saving new user') {
          toast.error('Username already taken');
        } else {
          toast.error(error.message);
        }
        return { success: false }; // Return { success: false } in case of error
      } else {
        router.refresh();
        return { success: true }; // Return { success: true } on success
      }
    }


   return (
      <AuthContext.Provider value={{
      user, loading,handeleSignOut, handeleLogin, handeleSignUp,updateUser,
   }}>{children}</AuthContext.Provider>
) 

}

export function useAuth() {
   const context= useContext(AuthContext)
   if(!context){
      throw new Error('useAuth must be used within an authprovider')
   }
}