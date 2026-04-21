import { useState, useEffect, useRef } from 'react';

const SLIDES = [
  { src: '/images/SecSocProjects2025.jpg', caption: 'Projects ❤️', alt: 'SecSoc Projects 2025' },
  { src: '/images/NFCBusinessCard.jpg', caption: 'NFC Business Card', alt: 'NFC Business Card' },
  { src: '/images/ProjectsWorkshop.jpg', caption: 'Projects Workshop', alt: 'Projects Workshop' },
  { src: '/images/AV.jpg', caption: 'Scones AV', alt: 'Scones AV' },
  { src: '/images/AtlassianSiteVisit.jpg', caption: '', alt: 'Atlassian Site Visit' },
  { src: '/images/SecSoc2025.jpg', caption: '', alt: 'SecSoc 2025' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const total = SLIDES.length;

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 4000);
  };

  const resetAutoPlay = () => {
    clearInterval(intervalRef.current);
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const prev = () => {
    setCurrent(c => (c - 1 + total) % total);
    resetAutoPlay();
  };

  const next = () => {
    setCurrent(c => (c + 1) % total);
    resetAutoPlay();
  };

  const goTo = (i) => {
    setCurrent(i);
    resetAutoPlay();
  };

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className="carousel-slide">
              <img src={slide.src} alt={slide.alt} className="carousel-image" />
              {slide.caption && (
                <div className="carousel-caption">{slide.caption}</div>
              )}
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prev}>❮</button>
        <button className="carousel-btn next" onClick={next}>❯</button>
      </div>
      <div className="carousel-indicators">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`indicator${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
