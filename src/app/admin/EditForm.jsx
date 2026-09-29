'use client'

import { useActionState } from 'react'
import { save } from './actions'

function Field({ field, defaultValue }) {
  if (field.type === 'checkbox') {
    return (
      <div className="admin-field">
        <label className="admin-check">
          <input type="checkbox" name={field.name} defaultChecked={defaultValue} />
          {field.label}
        </label>
        {field.hint && <p className="admin-hint">{field.hint}</p>}
      </div>
    )
  }

  if (field.type === 'roles') {
    const other = defaultValue.filter((role) => !field.options.includes(role))
    return (
      <fieldset className="admin-field admin-roles">
        <legend>
          {field.label}
          {field.required && <span className="admin-required"> *</span>}
        </legend>
        <div className="admin-role-grid">
          {field.options.map((role) => (
            <label key={role} className="admin-check">
              <input type="checkbox" name={field.name} value={role} defaultChecked={defaultValue.includes(role)} />
              {role}
            </label>
          ))}
        </div>
        <label htmlFor={`${field.name}-other`}>Other roles</label>
        <textarea id={`${field.name}-other`} name={field.name} rows={2} defaultValue={other.join('\n')} />
        <p className="admin-hint">One per line. Shown after the ticked roles, joined with " / ".</p>
      </fieldset>
    )
  }

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
