import Link from 'next/link'
import { CONTENT_TYPES } from '../../../lib/content-types'
import { prisma } from '../../../lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const counts = await Promise.all(
    CONTENT_TYPES.map((type) =>
      prisma[type.model].count({ where: type.scope ?? {} }),
    ),
  )

  return (
    <>
      <h1>Content</h1>
      <div className="admin-grid">
        {CONTENT_TYPES.map((type, i) => (
          <Link key={type.key} href={`/admin/${type.key}`} className="admin-card admin-tile">
            <span className="admin-tile-label">{type.label}</span>
            <span className="admin-tile-count">{counts[i]}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
