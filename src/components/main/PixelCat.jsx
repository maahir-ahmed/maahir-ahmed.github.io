'use client'

import { useEffect, useRef, useState } from 'react';

// One character per pixel. '#' is fur, 'e' is an eye. The tail is drawn in
// two frames that swap on a stepped animation, like a sprite sheet.
const BODY = [
  '...#......#...',
  '...##....##...',
  '...########...',
  '..##########..',
  '..##e####e##..',
  '..##########..',
  '...########...',
  '....######....',
  '...########...',
  '..##########..',
  '..##########..',
  '..##########..',
  '..##########..',
  '..###########.',
  '..###.##.###..',
];

const TAIL_UP = [
  [15, 8], [15, 9], [15, 10], [15, 11], [14, 12], [15, 12], [12, 13], [13, 13], [14, 13],
];
const TAIL_FLICK = [
  [16, 7], [16, 8], [15, 9], [15, 10], [15, 11], [14, 12], [15, 12], [12, 13], [13, 13], [14, 13],
];

const WIDTH = 17;
const HEIGHT = BODY.length;

function pixels(char) {
  const out = [];
  BODY.forEach((row, y) => [...row].forEach((c, x) => c === char && out.push([x, y])));
  return out;
}

const FUR = pixels('#');
const EYES = pixels('e');

const Rects = ({ cells }) => cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);

const CTF_HINT = <>Meow. The &lt;MA&gt; logo up top does something after 5 clicks.</>;

export default function PixelCat({ hint = CTF_HINT }) {
  const [talking, setTalking] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const meow = () => {
    setTalking(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTalking(false), 5000);
  };

  return (
    <div className="pixel-cat">
      <p className={`cat-bubble${talking ? ' show' : ''}`} role="status">
        {talking && hint}
      </p>
      <button
        type="button"
        className={`cat-sprite${talking ? ' hop' : ''}`}
        onClick={meow}
        aria-label="Pixel cat. Tap it"
      >
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} shapeRendering="crispEdges" aria-hidden="true">
          <g className="cat-fur"><Rects cells={FUR} /></g>
          <g className="cat-eyes"><Rects cells={EYES} /></g>
          <g className="cat-tail cat-tail-a"><Rects cells={TAIL_UP} /></g>
          <g className="cat-tail cat-tail-b"><Rects cells={TAIL_FLICK} /></g>
        </svg>
      </button>
    </div>
  );
}
