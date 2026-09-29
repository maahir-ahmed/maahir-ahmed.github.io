import assert from 'node:assert/strict'
import { test } from 'node:test'
import { highlightPython } from './highlight.js'

test('highlights the hero code the way the hand-written HTML did', () => {
  const html = highlightPython('class Developer:\n    def __init__(self):\n        self.year = 2  # Feb\n\nme = Developer()')
  assert.equal(html, [
    '<span class="keyword">class</span> <span class="class-name">Developer</span>:',
    '    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="keyword">self</span>):',
    '        <span class="keyword">self</span>.year = <span class="number">2</span>  <span class="comment"># Feb</span>',
    '',
    'me = <span class="class-name">Developer</span>()',
  ].join('\n'))
})

test('strings win over comments and everything is escaped', () => {
  assert.equal(
    highlightPython('x = "a # b" # <c>'),
    'x = <span class="string">"a # b"</span> <span class="comment"># &lt;c&gt;</span>',
  )
  assert.equal(highlightPython('<script>'), '&lt;script&gt;')
})
