const LOGOS = [
  { name: 'UNSW ESports Society', img: '/logos/unsw-esports.webp'              },
  { name: 'UNSW',                 img: '/logos/unsw.png', invert: true         },
  { name: 'Oceanic Prodigies',    img: null                       },
  { name: 'TXG',                  img: '/logos/txg.webp'          },
  { name: 'WaveOCE',              img: '/logos/waveoce.webp', invert: true },
  { name: 'AUEC',                 img: null                       },
  { name: 'UNSW ESports Society', img: '/logos/unsw-esports.webp'              },
  { name: 'UNSW',                 img: '/logos/unsw.png', invert: true         },
  { name: 'Oceanic Prodigies',    img: null                       },
  { name: 'TXG',                  img: '/logos/txg.webp'          },
  { name: 'WaveOCE',              img: '/logos/waveoce.webp', invert: true },
  { name: 'AUEC',                 img: null                       },
];

export default function ProductionLogoScroller() {
  const items = [...LOGOS, ...LOGOS];

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
