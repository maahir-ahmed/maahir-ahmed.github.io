import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cookieName, cookieOptions, createToken, verifyToken } from './auth'

export async function isAuthenticated() {
  const store = await cookies()
  return verifyToken(store.get(cookieName)?.value)
}

// Every server action calls this. The admin layout check alone is not enough:
// actions are addressable endpoints and can be invoked directly.
export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect('/admin/login')
}

export async function startSession() {
  const store = await cookies()
  store.set(cookieName, createToken(), cookieOptions)
}

export async function endSession() {
  const store = await cookies()
  store.delete(cookieName)
}
