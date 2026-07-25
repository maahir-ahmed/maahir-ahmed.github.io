import { useState, useCallback, useRef } from 'react';

// No flag values live here any more. The server decides what is correct; this
// hook only knows which challenge ids have been solved.
const INITIAL_LINES = [
  "Welcome to Maahir's Cybersecurity Challenge!",
  "Type 'help' for available commands.",
  '',
];

// curl is deliberately limited to this site's own challenge endpoints.
const CURL_ALLOWED = [
  /^\/api\/ctf(\/|$|\?)/,
  /^\/robots\.txt$/,
  /^\/\.well-known\/security\.txt$/,
];

function decodeData(text) {
  const [type, ...data] = text.split(' ');
  const dataStr = data.join(' ');
  switch (type) {
    case 'base64':
      try {
        const decoded = atob(dataStr);
        const lines = [`Decoded: ${decoded}`];
        if (decoded.includes('CTF{')) lines.push('Flag found! Use "flag <flag>" to submit it.');
        return lines;
      } catch {
        return ['Invalid Base64 string'];
      }
    case 'binary':
      try {
        const binary = dataStr.replace(/\s/g, '');
        let result = '';
        for (let i = 0; i < binary.length; i += 8) {
          result += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
        }
        const lines = [`Decoded: ${result}`];
        if (result.includes('CTF{')) lines.push('Flag found! Use "flag <flag>" to submit it.');
        return lines;
      } catch {
        return ['Invalid binary string'];
      }
    default:
      return ['Supported types: base64, binary', 'Usage: decode <type> <data>'];
  }
}

function cipherData(text) {
  const [type, shift, ...data] = text.split(' ');
  if (type === 'caesar') {
    const shiftNum = parseInt(shift) || 13;
    let result = '';
    for (const char of data.join(' ')) {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        result += String.fromCharCode(((code - base + shiftNum) % 26) + base);
      } else {
        result += char;
      }
    }
    const lines = [`Decrypted: ${result}`];
    if (result.includes('CTF{')) lines.push('Flag found! Use "flag <flag>" to submit it.');
    return lines;
  }
  return ['Supported ciphers: caesar', 'Usage: cipher caesar <shift> <text>'];
}

export function useCTF(showNotification) {
  const [solved, setSolved] = useState([]);
  const [stages, setStages] = useState([]);
  const [total, setTotal] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [terminalLines, setTerminalLines] = useState(INITIAL_LINES);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const celebrated = useRef(false);

  const addLines = useCallback((lines) => {
    setTerminalLines(prev => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  }, []);

  const applyState = useCallback((state) => {
    if (!state) return;
    setSolved(state.solved ?? []);
    setStages(state.stages ?? []);
    setTotal(state.total ?? 0);
    if (state.total && state.solved?.length === state.total && !celebrated.current) {
      celebrated.current = true;
      setTimeout(() => showNotification('CTF COMPLETED! You found every flag!', 'success'), 800);
    }
  }, [showNotification]);

  const activateCTF = useCallback(async () => {
    setTerminalVisible(true);
    setProgressVisible(true);

    let state = null;
    try {
      const response = await fetch('/api/ctf', { cache: 'no-store' });
      state = await response.json();
      applyState(state);
    } catch {
      // the terminal still works without the server, just without scoring
    }

    const done = state?.solved?.length ?? 0;
    addLines([
      'CTF Challenge Activated!',
      `Find ${state?.total ?? 7} hidden flags. The server checks them, so reading`,
      'the JavaScript bundle will not hand you the answers any more.',
      '',
      done > 0 ? `Progress restored: ${done}/${state.total} already solved.` : '',
      'How to submit flags:',
      '   flag CTF{YourFlagHere}',
      '',
      'Some challenges now live on the server. "curl" is your friend.',
      'Type "hint" for your next clue...',
    ].filter(Boolean));
  }, [addLines, applyState]);

  const handleLogoClick = useCallback(() => {
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        showNotification('CTF CHALLENGE UNLOCKED! Cybersecurity mode activated', 'success');
        setTimeout(activateCTF, 1500);
        return 0;
      }
      showNotification(`${newCount}/5 - Keep clicking the logo...`, 'info');
      return newCount;
    });
  }, [activateCTF, showNotification]);

  const processCommand = useCallback(async (command) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const output = [`guest@maahir:~$ ${trimmed}`];
    const [cmd, ...args] = trimmed.split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        output.push(
          '  - help - Show available commands',
          '  - ls - List files',
          '  - cat <file> - View file contents',
          "  - curl <path> - Request one of this site's endpoints",
          '  - decode <type> <data> - Decode Base64/Binary',
          '  - cipher caesar <shift> <text> - Caesar cipher',
          '  - flag <flag> - Submit discovered flags',
          '  - hint - Get your next clue',
          '  - status - Show progress',
          '  - clear - Clear terminal',
          '  - exit - Close terminal',
          '',
          'Tip: the files are served by the backend now. So is the scoring.',
        );
        break;

      case 'ls': {
        try {
          const response = await fetch('/api/ctf/fs', { cache: 'no-store' });
          const { files } = await response.json();
          output.push(...files.map(name => `-rw-r--r-- 1 guest guest  ${name}`));
        } catch {
          output.push('ls: could not reach the server');
        }
        break;
      }

      case 'cat': {
        if (!args[0]) {
          output.push('usage: cat <file>');
          break;
        }
        try {
          const response = await fetch(`/api/ctf/fs?file=${encodeURIComponent(args[0])}`, { cache: 'no-store' });
          const body = await response.json();
          output.push(...(body.lines ?? [body.error]));
        } catch {
          output.push('cat: could not reach the server');
        }
        break;
      }

      case 'curl': {
        const path = args[0] ?? '';
        if (!CURL_ALLOWED.some(pattern => pattern.test(path))) {
          output.push(
            "curl: this terminal may only request this site's own endpoints.",
            'Try: curl /api/ctf   or   curl /.well-known/security.txt',
          );
          break;
        }
        try {
          const response = await fetch(path, { cache: 'no-store' });
          output.push(`HTTP ${response.status}`);
          response.headers.forEach((value, key) => output.push(`${key}: ${value}`));
          output.push('');
          const text = await response.text();
          output.push(...text.split('\n'));
        } catch {
          output.push(`curl: could not reach ${path}`);
        }
        break;
      }

      case 'decode':
        output.push(...decodeData(args.join(' ')));
        break;

      case 'cipher':
        output.push(...cipherData(args.join(' ')));
        break;

      case 'flag': {
        const candidate = args.join(' ').trim();
        try {
          const response = await fetch('/api/ctf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flag: candidate }),
          });
          if (response.status === 429) {
            output.push('Too many attempts. Wait a moment and try again.');
            break;
          }
          const body = await response.json();
          applyState(body);
          if (!body.correct) {
            output.push('Incorrect flag.', `You entered: "${candidate}"`);
          } else if (body.already) {
            output.push('Flag already submitted!');
          } else {
            output.push(`Correct! Progress: ${body.solved.length}/${body.total}`);
            if (body.solved.length === body.total) {
              output.push('', 'You found every flag. Nicely done.');
            } else if (body.hint) {
              output.push(`Next: ${body.hint}`);
            }
          }
        } catch {
          output.push('Could not reach the scoring server.');
        }
        break;
      }

      case 'hint': {
        try {
          const response = await fetch('/api/ctf', { cache: 'no-store' });
          const body = await response.json();
          applyState(body);
          output.push(body.hint ?? 'No more hints — you have found them all.');
        } catch {
          output.push('Could not reach the server for a hint.');
        }
        break;
      }

      case 'status':
        output.push(`Solved ${solved.length}/${total || '?'}`);
        stages.forEach(stage => output.push(`  [${stage.solved ? 'x' : ' '}] ${stage.label}`));
        break;

      case 'clear':
        setTerminalLines(['Terminal cleared.']);
        return;

      case 'exit':
        setTerminalVisible(false);
        setProgressVisible(false);
        return;

      default:
        output.push(`Command not found: ${cmd}`, 'Type "help" for available commands.');
    }

    addLines(output);
  }, [addLines, applyState, solved, stages, total]);

  const closeTerminal = useCallback(() => {
    setTerminalVisible(false);
    setProgressVisible(false);
  }, []);

  return {
    solved,
    stages,
    total,
    terminalVisible,
    progressVisible,
    terminalLines,
    logoClickCount,
    handleLogoClick,
    processCommand,
    closeTerminal,
  };
}
