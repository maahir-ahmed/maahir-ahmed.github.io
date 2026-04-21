const STAGE_LABELS = [
  'Stage 1: Source Code',
  'Stage 2: Developer Tools',
  'Stage 3: Caesar Cipher',
  'Stage 4: Binary Decode',
  'Stage 5: Final Challenge',
];

export default function CTFProgress({ flags, totalFlags = 5 }) {
  return (
    <div className="ctf-progress">
      <div className="progress-header">🏆 CTF Progress</div>
      <div className="progress-stages">
        {STAGE_LABELS.map((label, i) => (
          <div key={i} className={`stage${i < flags.size ? ' completed' : ''}`}>
            {label}
          </div>
        ))}
      </div>
      <div className="flags-collected">
        <span>Flags: </span>
        <span>{flags.size}</span>/{totalFlags}
      </div>
    </div>
  );
}
