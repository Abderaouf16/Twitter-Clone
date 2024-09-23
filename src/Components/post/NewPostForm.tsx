'use client';
import { input } from '@nextui-org/theme';
import React, { useRef } from 'react';
import SubmitBtn from '../ui/SubmitBtn';
import RequiresAuth from '../Layout/auth/RequiresAuth';
import Avatar from '../ui/Avatar';
import { useAuth } from '@/src/lib/providers/authProviders';
import { createPost } from '@/src/lib/actions/createPost';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';

interface NewPostFormProps {
  className?: string;
  parentId?: string;
  autoFocus?: boolean;
  onPostCreated?: () => void;
}

export default function NewPostForm({
  className,
  parentId,
  autoFocus = false,
  onPostCreated,
}: NewPostFormProps) {
  const { user } = useAuth();
  const ref = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus();

  async function handleFormAction(formData: FormData) {
    // Handle form data
    const {success} = await createPost(formData)
    if(success){
      toast("Post created successfully")
      if(onPostCreated){
        onPostCreated()
      }
      ref?.current?.reset()
    }else{
      toast.error("An error occurred, please try again")
    }
  }

  return (
    <form action={handleFormAction} ref={ref} className={`w-full p-4 border-b border-gray-200 ${className}`}>
      <div className="flex items-start gap-4 w-full mb-4">
        <Avatar username={user?.user_metadata?.username} profileId={user?.id} />
        <textarea
          name="content"
          placeholder="What's happening?!"
          autoFocus={autoFocus}
          maxLength={250}
          required
          rows={3}
          className="w-full p-2 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 text-xl"
        />
        {parentId && <input type="hidden" name="parentId" value={parentId} />}
      </div>
      <div className="flex items-center justify-end">
        <RequiresAuth as="div"  onClick={() => {}} className="">
          <SubmitBtn  className='' >Post</SubmitBtn>
        </RequiresAuth>
      </div>
    </form>
  );
}
