import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContentType, present } from '../../../../../lib/content-types'
import { prisma } from '../../../../../lib/db'
import EditForm from '../../../EditForm'
import { remove } from '../../../actions'

export const dynamic = 'force-dynamic'

export default async function EditPage({ params }) {
  const { type: typeKey, id } = await params
  const type = getContentType(typeKey)
  if (!type) notFound()

  const creating = id === 'new'
  const idField = type.idField ?? 'id'

  let row = null
  if (!creating) {
    row = await prisma[type.model].findUnique({ where: { [idField]: decodeURIComponent(id) } })
    if (!row) notFound()
  }

  const values = Object.fromEntries(
    type.fields.map((field) => [field.name, present(field, row?.[field.name])]),
  )

  return (
    <>
      <div className="admin-header">
        <h1>{creating ? `New ${type.label.toLowerCase()}` : type.title(row)}</h1>
        <Link href={`/admin/${type.key}`} className="admin-link-button">Back</Link>
      </div>

      <EditForm
        typeKey={type.key}
        id={creating ? 'new' : decodeURIComponent(id)}
        fields={type.fields}
        values={values}
      />

      {!creating && (
        <form action={remove.bind(null, type.key, decodeURIComponent(id))} className="admin-danger">
          <button type="submit">Delete</button>
        </form>
      )}
    </>
  )
}
