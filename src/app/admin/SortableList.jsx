'use client'

import Link from 'next/link'
import { useRef, useState, useTransition } from 'react'

function moved(list, from, to) {
  const next = [...list]
  next.splice(to, 0, ...next.splice(from, 1))
  return next
}

// Tiles you drag by the handle to reorder. Pointer events rather than HTML
// drag and drop, so a mouse, a finger and a pen all behave the same. The
// handle also takes the arrow keys. `onReorder` gets the ids in the new order.
export default function SortableList({ items, onReorder }) {
  const [order, setOrder] = useState(items)
  const [dragging, setDragging] = useState(null)
  const [saving, startSaving] = useTransition()
  const listRef = useRef(null)
  const startRef = useRef('')

  const ids = (list) => list.map((item) => item.id)
  const save = (next) => startSaving(() => onReorder(ids(next)))

  function onPointerDown(event, id) {
    event.currentTarget.setPointerCapture(event.pointerId)
    startRef.current = ids(order).join()
    setDragging(id)
  }

  function onPointerMove(event) {
    if (!dragging) return
    const from = order.findIndex((item) => item.id === dragging)
    const others = [...listRef.current.children].filter((_, i) => i !== from)
    // The new slot is how many other tiles sit above the pointer
    const to = others.filter((row) => {
      const box = row.getBoundingClientRect()
      return box.top + box.height / 2 < event.clientY
    }).length
    if (to !== from) setOrder(moved(order, from, to))
  }

  function onPointerUp() {
    if (!dragging) return
    setDragging(null)
    if (ids(order).join() !== startRef.current) save(order)
  }

  function onKeyDown(event, index) {
    const step = { ArrowUp: -1, ArrowDown: 1 }[event.key]
    const to = index + (step ?? 0)
    if (!step || to < 0 || to >= order.length) return
    event.preventDefault()
    const next = moved(order, index, to)
    setOrder(next)
    save(next)
  }

  if (order.length === 0) return <p className="admin-empty">Nothing here yet.</p>

  return (
    <>
      <ol ref={listRef} className="admin-tiles">
        {order.map((item, index) => (
          <li key={item.id} className={`admin-tile-row${dragging === item.id ? ' is-dragging' : ''}`}>
            <button
              type="button"
              className="drag-handle"
              aria-label={`Move ${item.title}. Drag, or use the up and down arrow keys.`}
              onPointerDown={(event) => onPointerDown(event, item.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <svg viewBox="0 0 10 16" aria-hidden="true">
                {[3, 8, 13].map((y) => [3, 7].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" />))}
              </svg>
            </button>
            <Link href={item.href} className="admin-tile-link">
              <span className="admin-list-title">{item.title}</span>
              {item.meta && <span className="admin-list-meta">{item.meta}</span>}
            </Link>
          </li>
        ))}
      </ol>
      <p className="admin-hint" aria-live="polite">{saving ? 'Saving order…' : ' '}</p>
    </>
  )
}
