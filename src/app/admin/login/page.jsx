'use client'

import { useActionState } from 'react'
import { login } from '../actions'
import '../admin.css'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {})

  return (
    <main className="admin-shell admin-centre">
      <form action={formAction} className="admin-card admin-login">
        <h1>Admin</h1>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" autoFocus required />
        {state?.error && <p className="admin-error">{state.error}</p>}
        <button type="submit" disabled={pending}>
          {pending ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
