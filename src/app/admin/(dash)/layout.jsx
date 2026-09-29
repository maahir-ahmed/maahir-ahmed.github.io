import Link from 'next/link'
import { PAGES } from '../../../lib/pages'
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
          {PAGES.map((page) => (
            <Link key={page.key} href={`/admin/pages/${page.key}`}>{page.label}</Link>
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
