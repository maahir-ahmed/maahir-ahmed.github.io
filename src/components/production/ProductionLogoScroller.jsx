export default function ProductionLogoScroller({ logos = [] }) {
  // Four copies: the track loops by scrolling a quarter of its width (one copy)
  const items = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="logo-scroller-wrapper">
      <div className="logo-scroller-track">
        {items.map((logo, i) => (
          <div key={i} className="logo-scroller-item">
            {logo.img
              ? <img src={logo.img} alt={logo.name} className={`logo-scroller-img${logo.invert ? ' logo-invert' : ''}`} />
              : <span className="logo-scroller-text">{logo.name}</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
