'use client'

import { useActionState } from 'react'
import { saveText } from './actions'

const HINTS = {
  paragraphs: 'Leave a blank line between paragraphs',
  lines: 'One per line',
  code: 'Python. Highlighted automatically.',
}

export default function TextForm({ pageKey, sectionKey, fields, values }) {
  const [state, formAction, pending] = useActionState(saveText.bind(null, pageKey, sectionKey), {})

  return (
    <form action={formAction} className="admin-card admin-form">
      {fields.map((field) => {
        const id = `text-${field.key}`
        const common = { id, name: field.key, defaultValue: values[field.key] }
        // Roughly fit the text: long lines wrap at about 80 characters
        const lineCount = String(values[field.key]).split('\n')
          .reduce((sum, line) => sum + Math.max(1, Math.ceil(line.length / 80)), 0)
        const rows = Math.min(16, Math.max(3, lineCount + 1))
        return (
          <div key={field.key} className="admin-field">
            <label htmlFor={id}>{field.label}</label>
            {field.type === 'text' ? (
              <input {...common} type="text" />
            ) : (
              <textarea
                {...common}
                rows={rows}
                className={field.type === 'code' ? 'admin-code' : undefined}
                spellCheck={field.type !== 'code'}
              />
            )}
            {HINTS[field.type] && <p className="admin-hint">{HINTS[field.type]}</p>}
          </div>
        )
      })}
      {state?.error && <p className="admin-error">{state.error}</p>}
      <div className="admin-actions">
        <button type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save text'}</button>
        {state?.saved && !pending && <span className="admin-saved" role="status">Saved</span>}
      </div>
    </form>
  )
}
