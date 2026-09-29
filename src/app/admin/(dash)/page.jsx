import Link from 'next/link'
import { PAGES } from '../../../lib/pages'

export default function AdminHome() {
  return (
    <>
      <h1>Pages</h1>
      <div className="admin-grid">
        {PAGES.map((page) => (
          <Link key={page.key} href={`/admin/pages/${page.key}`} className="admin-card admin-tile">
            <span className="admin-tile-label">{page.label}</span>
            <span className="admin-tile-count">{page.path}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
