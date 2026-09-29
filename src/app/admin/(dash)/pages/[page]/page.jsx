import Link from 'next/link'
import { notFound } from 'next/navigation'
import { settingsMap } from '../../../../../lib/content'
import { getPage, getSection, orderKey, sectionOrder } from '../../../../../lib/pages'
import { reorderSections } from '../../../actions'
import SortableList from '../../../SortableList'

export const dynamic = 'force-dynamic'

export default async function PageSections({ params }) {
  const { page: pageKey } = await params
  const page = getPage(pageKey)
  if (!page) notFound()

  const map = await settingsMap()
  const href = (section) => `/admin/pages/${page.key}/${section.key}`
  const pinned = page.sections.filter((section) => section.pinned)
  const tiles = sectionOrder(page, map[orderKey(page)]).map((key) => {
    const section = getSection(page, key)
    return { id: key, title: section.label, href: href(section), meta: section.shared ? 'Shared by all pages' : '' }
  })

  return (
    <>
      <div className="admin-header">
        <h1>{page.label}</h1>
        <Link href={page.path} target="_blank" className="admin-link-button">View page ↗</Link>
      </div>

      <p className="admin-hint admin-lead">Drag the sections into the order they appear on the page. Open one to edit it.</p>

      <ol className="admin-tiles">
        {pinned.map((section) => (
          <li key={section.key} className="admin-tile-row is-pinned">
            <span className="drag-handle" aria-hidden="true" />
            <Link href={href(section)} className="admin-tile-link">
              <span className="admin-list-title">{section.label}</span>
              <span className="admin-list-meta">Always first</span>
            </Link>
          </li>
        ))}
      </ol>
      <SortableList items={tiles} onReorder={reorderSections.bind(null, page.key)} />
    </>
  )
}
