// Just enough Python highlighting for the hero code blocks, using the site's
// existing .keyword/.string/... classes. Returns HTML with every piece escaped.

const KEYWORDS = new Set([
  'and', 'as', 'class', 'def', 'elif', 'else', 'False', 'for', 'from', 'if', 'import',
  'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'return', 'self', 'True', 'while', 'with',
])

const TOKEN = /(#.*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)/g

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const span = (cls, text) => `<span class="${cls}">${escape(text)}</span>`

export function highlightPython(source) {
  let html = ''
  let last = 0
  let prev = ''

  for (const match of source.matchAll(TOKEN)) {
    const [text, comment, string, number, word] = match
    html += escape(source.slice(last, match.index))
    last = match.index + text.length

    if (comment) html += span('comment', text)
    else if (string) html += span('string', text)
    else if (number) html += span('number', text)
    else if (prev === 'class' || (/^[A-Z]/.test(word) && source[last] === '(')) html += span('class-name', text)
    else if (prev === 'def') html += span('function', text)
    else if (KEYWORDS.has(word)) html += span('keyword', text)
    else html += escape(text)

    prev = word ?? ''
  }

  return html + escape(source.slice(last))
}
