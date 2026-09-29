// Each source line is its own block, so a long line wraps under its own
// indentation instead of running off a narrow screen.
export default function CodeBlock({ file, html }) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span className="file-name">{file}</span>
      </div>
      <pre className="code-content">
        <code>
          {html.split('\n').map((line, i) => (
            <span
              key={i}
              className="code-line"
              style={{ '--indent': line.length - line.trimStart().length }}
              dangerouslySetInnerHTML={{ __html: line.trimStart() || '&nbsp;' }}
            />
          ))}
        </code>
      </pre>
    </div>
  );
}
