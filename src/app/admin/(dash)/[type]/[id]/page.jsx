import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContentType, present } from '../../../../../lib/content-types'
import { prisma } from '../../../../../lib/db'
import { adminPathOf } from '../../../../../lib/pages'
import EditForm from '../../../EditForm'
import { remove } from '../../../actions'

export const dynamic = 'force-dynamic'

export default async function EditPage({ params }) {
  const { type: typeKey, id } = await params
  const type = getContentType(typeKey)
  if (!type) notFound()

  const creating = id === 'new'

  let row = null
  if (!creating) {
    row = await prisma[type.model].findUnique({ where: { id } })
    if (!row) notFound()
  }

  // Role tick boxes come from the Role table, so new roles need no code change
  const roleChoices = type.fields.some((field) => field.type === 'roles')
    ? (await prisma.role.findMany({ orderBy: { position: 'asc' } })).map((role) => role.name)
    : []
  const fields = type.fields.map((field) => (field.type === 'roles' ? { ...field, options: roleChoices } : field))

  const values = Object.fromEntries(
    type.fields.map((field) => [field.name, present(field, row?.[field.name])]),
  )

  return (
    <>
      <div className="admin-header">
        <h1>{creating ? `New ${type.label.toLowerCase()}` : type.title(row)}</h1>
        <Link href={adminPathOf(type.key)} className="admin-link-button">Back</Link>
      </div>

      <EditForm
        typeKey={type.key}
        id={id}
        fields={fields}
        values={values}
      />

      {!creating && (
        <form action={remove.bind(null, type.key, id)} className="admin-danger">
          <button type="submit">Delete</button>
        </form>
      )}
    </>
  )
}
