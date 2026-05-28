
import * as navigation from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    navigation.redirect('/login')
  }

  

  return (
    <div className="p-8">
      <h1>Welcome, {user.email} to Emmanuel Health Web App Demo</h1>
      <p>You’re logged in with a server-side session.</p>
      <form  action="/auth/signout" method="post" className="mt-4">
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}



