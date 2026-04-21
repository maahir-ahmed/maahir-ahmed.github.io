import { useState, useCallback } from 'react';

const VALID_FLAGS = [
  'CTF{H1dd3n_1n_C0d3_B10ck}',
  'CTF{D3v3l0p3r_T00ls_4r3_C00l}',
  'CTF{C43s4r_C1ph3r_M4st3r}',
  'CTF{B1n4ry_D3c0d3r}',
  'CTF{B45364_Unm45k3d}',
];

const HINTS = [
  'Look at the Python code block on the page. Sometimes hidden there...',
  'Open developer tools and inspect the page source. Look for hidden comments...',
  'I wonder whats in my directory...',
  'Looks like theres some encrytped text files',
  'Look for binary data in the decoder.py file and decode it!',
];

const INITIAL_LINES = [
  "Welcome to Maahir's Cybersecurity Challenge!",
  "Type 'help' for available commands.",
  '',
];

function catFile(filename) {
  switch (filename) {
    case 'secret.txt':
      return [
        'Q1RGe0I0NTM2NF9Vbm00NWszZH0=',
        '',
        'Hint: This looks like Base64...',
      ];
    case 'encrypted.txt':
      return [
        'Message 1: Gur frperg vf va gur pbqr. Ybbx pybfryl ng gur Clguba oybpx.',
        'Message 2: PGS{P43f4e_P1cu3e_Z4fg3e}',
        '',
        'Hint: Caesar cipher with shift 13...',
      ];
    case 'decoder.py':
      return [
        '#!/usr/bin/env python3',
        'import base64',
        'import binascii',
        '',
        '# Binary message:',
        '# 01000011010101000100011001111011010000100011000101101110001101000111001001111001010111110100010000110011011000110011000001100100001100110111001001111101',
        '',
        '# Use: decode binary <binary_string>',
      ];
    default:
      return [`cat: ${filename}: No such file or directory`];
  }
}

function decodeData(text) {
  const [type, ...data] = text.split(' ');
  const dataStr = data.join(' ');
  switch (type) {
    case 'base64':
      try {
        const decoded = atob(dataStr);
        const lines = [`Decoded: ${decoded}`];
        if (decoded.includes('CTF{')) lines.push('🎉 Flag found! Use "flag <flag>" to submit it.');
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
        if (result.includes('CTF{')) lines.push('🎉 Flag found! Use "flag <flag>" to submit it.');
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
    if (result.includes('CTF{')) lines.push('🎉 Flag found! Use "flag <flag>" to submit it.');
    return lines;
  }
  return ['Supported ciphers: caesar', 'Usage: cipher caesar <shift> <text>'];
}

export function useCTF(showNotification) {
  const [flags, setFlags] = useState(new Set());
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [terminalLines, setTerminalLines] = useState(INITIAL_LINES);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const addLines = useCallback((lines) => {
    setTerminalLines(prev => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  }, []);

  const activateCTF = useCallback(() => {
    setTerminalVisible(true);
    setProgressVisible(true);
    addLines([
      '🔐 CTF Challenge Activated!',
      'Find 5 hidden flags on this website.',
      '',
      '📝 How to submit flags:',
      '   flag CTF{YourFlagHere}',
      '',
      'Type "hint" for your first clue...',
    ]);
  }, [addLines]);

  const handleLogoClick = useCallback(() => {
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        showNotification('🔓 CTF CHALLENGE UNLOCKED! Cybersecurity mode activated', 'success');
        setTimeout(activateCTF, 1500);
        return 0;
      }
      showNotification(`${newCount}/5 - Keep clicking the logo...`, 'info');
      return newCount;
    });
  }, [activateCTF, showNotification]);

  const processCommand = useCallback((command) => {
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
          '  - decode <type> <data> - Decode Base64/Binary',
          '  - cipher caesar <shift> <text> - Caesar cipher',
          '  - flag <flag> - Submit discovered flags',
          '  - hint - Get progressive hints',
          '  - clear - Clear terminal',
          '  - exit - Close terminal',
          '',
          '💡 Tip: Start with "hint" to get your first clue!',
        );
        break;
      case 'ls':
        output.push(
          'total 8',
          'drwxr-xr-x 2 guest guest 4096 Dec  1 12:00 .',
          'drwxr-xr-x 3 guest guest 4096 Dec  1 12:00 ..',
          '-rw-r--r-- 1 guest guest   42 Dec  1 12:00 secret.txt',
          '-rw-r--r-- 1 guest guest  128 Dec  1 12:00 encrypted.txt',
          '-rwxr-xr-x 1 guest guest  256 Dec  1 12:00 decoder.py',
        );
        break;
      case 'cat':
        output.push(...catFile(args[0]));
        break;
      case 'decode':
        output.push(...decodeData(args.join(' ')));
        break;
      case 'cipher':
        output.push(...cipherData(args.join(' ')));
        break;
      case 'flag': {
        const normalizedFlag = args.join(' ').trim();
        if (VALID_FLAGS.includes(normalizedFlag)) {
          setFlags(prev => {
            if (prev.has(normalizedFlag)) {
              addLines([...output, '❌ Flag already submitted!']);
              return prev;
            }
            const newFlags = new Set(prev);
            newFlags.add(normalizedFlag);
            const lines = [...output, `✅ Correct flag! Progress: ${newFlags.size}/5`];
            if (newFlags.size === 5) {
              lines.push(
                '🎉🎉🎉 CONGRATULATIONS! 🎉🎉🎉',
                'You have found all 5 flags!',
                'You are a true cybersecurity enthusiast!',
                '',
                "Thanks for playing Maahir's CTF challenge!",
              );
              setTimeout(() => showNotification('🏆 CTF COMPLETED! You found all flags!', 'success'), 1000);
            }
            addLines(lines);
            return newFlags;
          });
          return;
        }
        output.push(
          '❌ Invalid flag format or incorrect flag.',
          '📝 Flag format: CTF{...}',
          `📥 You entered: "${normalizedFlag}"`,
        );
        break;
      }
      case 'hint': {
        const hintIndex = flags.size;
        output.push(
          hintIndex < HINTS.length
            ? `Hint ${hintIndex + 1}: ${HINTS[hintIndex]}`
            : 'No more hints available!',
        );
        break;
      }
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
  }, [flags, addLines, showNotification]);

  const closeTerminal = useCallback(() => {
    setTerminalVisible(false);
    setProgressVisible(false);
  }, []);

  return {
    flags,
    terminalVisible,
    progressVisible,
    terminalLines,
    logoClickCount,
    handleLogoClick,
    processCommand,
    closeTerminal,
  };
}
