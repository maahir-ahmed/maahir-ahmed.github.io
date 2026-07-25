'use client'

import { useActionState } from 'react'
import { save } from './actions'

function Field({ field, defaultValue }) {
  const common = {
    id: field.name,
    name: field.name,
    defaultValue,
    required: field.required && field.type !== 'list',
  }

  return (
    <div className="admin-field">
      <label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="admin-required"> *</span>}
      </label>
      {field.type === 'textarea' || field.type === 'list' ? (
        <textarea {...common} rows={field.type === 'list' ? 4 : 6} />
      ) : (
        <input {...common} type={field.type === 'number' ? 'number' : 'text'} />
      )}
      {field.hint && <p className="admin-hint">{field.hint}</p>}
    </div>
  )
}

export default function EditForm({ typeKey, id, fields, values }) {
  const [state, formAction, pending] = useActionState(save.bind(null, typeKey, id), {})

  return (
    <form action={formAction} className="admin-card admin-form">
      {fields.map((field) => (
        <Field key={field.name} field={field} defaultValue={values[field.name]} />
      ))}
      {state?.error && <p className="admin-error">{state.error}</p>}
      <button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}
