import Link from 'next/link'
import { CONTENT_TYPES } from '../../../lib/content-types'
import { requireAdmin } from '../../../lib/session'
import { logout } from '../actions'
import '../admin.css'

export const metadata = { title: 'Admin' }

export default async function AdminLayout({ children }) {
  await requireAdmin()

  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <Link href="/admin" className="admin-brand">Admin</Link>
        <nav>
          {CONTENT_TYPES.map((type) => (
            <Link key={type.key} href={`/admin/${type.key}`}>{type.label}</Link>
          ))}
        </nav>
        <div className="admin-nav-footer">
          <Link href="/" target="_blank">View site ↗</Link>
          <form action={logout}>
            <button type="submit" className="admin-link-button">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}
