
'use client'
//import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
//import { createBrowserClient } from '@supabase/ssr/dist/module/createBrowserClient'
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20))

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  //const supabase = createClient()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  async function handleSignup() {
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
    } else if (data.user && !data.session) {
      // Email confirmation enabled in Supabase
      setMessage('Check your email for the confirmation link')
    } else {
      // Auto login if email confirm is disabled
      router.refresh()
      router.push('/dashboard')
    }
  }

  return (
    
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        {loading ? 'Signing up...' : 'Create Account'}
      </button>
      {message && <p className="mt-4">{message}</p>}
      <p className="mt-4">
        Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
      </p>
    </div> 
  )

} 