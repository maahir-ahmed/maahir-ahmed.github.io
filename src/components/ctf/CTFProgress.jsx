// Stages come from the server so the labels can never drift from the flags.
export default function CTFProgress({ stages = [], solved = [], total = 0 }) {
  return (
    <div className="ctf-progress">
      <div className="progress-header">CTF Progress</div>
      <div className="progress-stages">
        {stages.map((stage, i) => (
          <div key={stage.id} className={`stage${stage.solved ? ' completed' : ''}`}>
            {`Stage ${i + 1}: ${stage.label}`}
          </div>
        ))}
      </div>
      <div className="flags-collected">
        <span>Flags: </span>
        <span>{solved.length}</span>/{total}
      </div>
    </div>
  );
}
