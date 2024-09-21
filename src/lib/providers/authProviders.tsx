import { createBrowserClient } from '@/supabase/clients/browser'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect,  } from "react";
import { toast } from 'sonner';



interface AuthContextValue {
   user: User | null;
   loading: boolean;
   handleSignOut: () => Promise<void>;
   handleLogin: (email: string, password: string) => Promise<{ success: boolean }>; // Updated to return success field
   handleSignUp: (email: string, username: string, password: string) => Promise<{ success: boolean }>; // Updated to return success field
   updateUser: (username: string) => Promise<{ success: boolean }>;
 }
 


const AuthContext = createContext<AuthContextValue>({} as AuthContextValue );


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




   async function handleSignOut () {
      setLoading(true);
      const {error} = await supabase.auth.signOut()
      if(error){
         toast.error(error.message)
      }else{
         router.refresh()
         toast.success('Loggin out successfuly ');
      }
      setLoading(false)
   }

 
   async function handleLogin(email: string, password: string): Promise<{ success: boolean }> {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
    
      setLoading(false);
    
      if (error) {
        toast.error(error.message);
        return { success: false }; // Return an object indicating failure
      } else {
        router.refresh();
        toast.success('Loggin successfuly ');
        return { success: true }; // Return an object indicating success
      }
    }

   async function handleSignUp(email: string, username: string, password: string): Promise<{ success: boolean }> {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }
      });
    
      setLoading(false);
    
      if (error) {
        if (error.message === 'database error saving new user') {
          toast.error('Username already taken');
        } else {
          toast.error(error.message);
        }
        return { success: false }; // Return an object indicating failure
      } else {
        router.refresh();
        toast.success('Signin up successfuly ');
        return { success: true }; // Return an object indicating success

      }
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
        toast.success('Updating the user successfuly ');
        return { success: true }; // Return { success: true } on success
      }
    }


   return (
      <AuthContext.Provider value={{
      user, loading,handleSignOut, handleLogin, handleSignUp,updateUser,
   }}>{children}</AuthContext.Provider>
) 

}

export function useAuth() {
   const context= useContext(AuthContext)
   if(!context){
      throw new Error('useAuth must be used within an authprovider')
   }
   return context
}