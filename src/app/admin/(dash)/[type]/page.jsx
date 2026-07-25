import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContentType } from '../../../../lib/content-types'
import { prisma } from '../../../../lib/db'

export const dynamic = 'force-dynamic'

export default async function ListPage({ params }) {
  const { type: typeKey } = await params
  const type = getContentType(typeKey)
  if (!type) notFound()

  const idField = type.idField ?? 'id'
  const rows = await prisma[type.model].findMany({
    where: type.scope ?? {},
    orderBy: type.orderBy ?? { position: 'asc' },
  })

  return (
    <>
      <div className="admin-header">
        <h1>{type.label}</h1>
        <Link href={`/admin/${type.key}/new`} className="admin-button">New</Link>
      </div>

      {rows.length === 0 ? (
        <p className="admin-empty">Nothing here yet.</p>
      ) : (
        <ul className="admin-list">
          {rows.map((row) => (
            <li key={row[idField]}>
              <Link href={`/admin/${type.key}/${encodeURIComponent(row[idField])}`}>
                <span className="admin-list-title">{type.title(row)}</span>
                {'position' in row && <span className="admin-list-meta">#{row.position}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
