"use client"
import { useAuth } from '@/src/lib/providers/authProviders';
import React, { useState } from 'react'
import SubmitBtn from '../../ui/SubmitBtn';
import Link from 'next/link';

interface AuthFormProps {
  type: "login" | "signup";
}


export default function AuthForm({ type }: AuthFormProps) {

  const { handleLogin, handleSignUp, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (type === "login") {
      handleLogin(email, password)
    } if (type === "signup") {
      handleSignUp(email, username, password)
    }
  }
  return (
    <>
      <form action=""
        className=' flex flex-col space-y-7  p-4 md:p-6'
        onSubmit={handleSubmit}>
        <h2 className=' text-2xl font-semibold text-gray-600'>
          {type === "login" ? "Login" : "Sign up"}</h2>
        <div className='space-y-3'>


          {type === "signup" && (
            <div className="flex flex-col gap-3 ">
              <label htmlFor="username">Username</label>
              <input type="text"
                id='username'
                name='username'
                autoComplete='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className='rounded-xl p-2 border-gray-300 border-2 '
              />
            </div>
          )}
          <div className="flex flex-col gap-3 ">
            <label htmlFor="email">Email</label>
            <input type="email"
              id='email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='rounded-xl p-2 border-gray-300 border-2 '
            />
          </div>
          <div className="flex flex-col gap-3  ">
            <label htmlFor="password">Password</label>
            <input type="password"
              id='password'
              name='password'
              autoComplete={type === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='rounded-xl p-2 border-gray-300 border-2 '
            />
          </div>
        </div>
        <SubmitBtn loading={loading} className='w-max px-8 '>
          {type === "signup" ? "Sign Up " : 'Sign in'}
        </SubmitBtn>
        <p>
          {type === "signup" ? "Already have an account ?" : "Don't have an account ?"}
          <Link href={` /${ type === "signup" ? "login" : "sign-up"}`} 
          className='text-blue-500 ml-2' >
            {type === "signup" ? "Login": "Sign Up"}
          </Link>
        </p>
      </form>
    </>
  )
}
