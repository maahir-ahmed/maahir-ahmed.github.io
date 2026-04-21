import { useRef, useEffect, useState } from 'react';

export default function CTFTerminal({ lines, onCommand, onClose }) {
  const [input, setInput] = useState('');
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <div className="ctf-terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <span className="terminal-title">🔐 CTF Terminal</span>
        <button className="terminal-close" onClick={onClose}>×</button>
      </div>
      <div className="terminal-content">
        <div className="terminal-output" ref={outputRef}>
          {lines.map((line, i) => (
            <div key={i} className="terminal-line">{line}</div>
          ))}
        </div>
        <div className="terminal-input-line">
          <span className="terminal-prompt">guest@maahir:~$ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
