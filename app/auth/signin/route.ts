// app/auth/signin/route.ts
/*import { NextRequest, NextResponse } from 'next/server'

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  // Create Supabase client bound to cookies
  const supabase = createServerSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies,
  })

  // Attempt sign-in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Redirect to dashboard if successful
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
*/
// app/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  const supabase = createClient()

  const { data, error } = await (await supabase).auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}
