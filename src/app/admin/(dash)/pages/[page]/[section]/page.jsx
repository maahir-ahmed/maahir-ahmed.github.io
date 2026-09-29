import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContentType } from '../../../../../../lib/content-types'
import { settingsMap, sectionText } from '../../../../../../lib/content'
import { prisma } from '../../../../../../lib/db'
import { getPage, getSection } from '../../../../../../lib/pages'
import { reorder } from '../../../../actions'
import SortableList from '../../../../SortableList'
import TextForm from '../../../../TextForm'

export const dynamic = 'force-dynamic'

export default async function SectionEditor({ params }) {
  const { page: pageKey, section: sectionKey } = await params
  const page = getPage(pageKey)
  const section = getSection(page, sectionKey)
  if (!section) notFound()

  const types = (section.lists ?? []).map(getContentType)
  const [map, ...rows] = await Promise.all([
    settingsMap(),
    ...types.map((type) =>
      prisma[type.model].findMany({ where: type.scope ?? {}, orderBy: { position: 'asc' } }),
    ),
  ])

  return (
    <>
      <div className="admin-header">
        <h1>{section.label}</h1>
        <Link href={`/admin/pages/${page.key}`} className="admin-link-button">Back to {page.label}</Link>
      </div>

      {section.shared && <p className="admin-hint admin-lead">This section is shared: changes show on every page that has it.</p>}

      {section.fields.length > 0 && (
        <TextForm
          pageKey={page.key}
          sectionKey={section.key}
          fields={section.fields}
          values={sectionText(page, section, map)}
        />
      )}

      {types.map((type, i) => (
        <div key={type.key} className="admin-list-block">
          <div className="admin-header">
            <h2>{type.label}</h2>
            <Link href={`/admin/${type.key}/new`} className="admin-button">New</Link>
          </div>
          <SortableList
            items={rows[i].map((row) => ({ id: row.id, title: type.title(row), href: `/admin/${type.key}/${row.id}` }))}
            onReorder={reorder.bind(null, type.key)}
          />
        </div>
      ))}
    </>
  )
}
