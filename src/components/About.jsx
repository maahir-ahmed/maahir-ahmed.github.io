import { useVisible } from '../hooks/useVisible';

const FACTS = [
  { icon: '📍', label: 'Location',   value: 'Sydney, Australia'             },
  { icon: '🎓', label: 'Degree',     value: 'B. Computer Science, UNSW'     },
  { icon: '💼', label: 'Roles',      value: 'Treasurer — SecSoc & PCSoc'    },
  { icon: '🔐', label: 'Focus',      value: 'Cybersecurity & AV Production' },
];

export default function About() {
  const [ref, visible] = useVisible({ threshold: 0.1 });

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div ref={ref} className={`about-body fade-in${visible ? ' visible' : ''}`}>
          <p className={`about-intro${visible ? ' visible' : ''}`}>
            Hi! I&apos;m Maahir — a Computer Science student at UNSW and Treasurer of both SecSoc
            and PCSoc. I&apos;ve spent the last year managing society finances, running hardware
            workshops, directing live esports broadcasts, and deploying self-hosted infrastructure.
            I like understanding how systems work at every level, from software all the way down to
            the silicon.
          </p>
          <ul className={`about-list${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.08s' }}>
            <li>Managed a $20,000 annual budget and $10,000+ in sponsorship at SecSoc</li>
            <li>Deployed Vaultwarden &amp; Snipe-IT for PCSoc, overhauling asset management on $100k+ of equipment</li>
            <li>Directed end-to-end production for Oceanic Prodigies RE:BIRTH as Production Lead / Technical Director</li>
            <li>Designed SecSoc&apos;s Scones hardware badge (RP2040 + e-ink) and ran a PCB design workshop</li>
          </ul>
          <p className={`about-intro${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.16s' }}>
            Outside of all that I love tinkering with electronics, rock climbing, competing in CTF
            competitions, and finding bargains on OzBargain.
          </p>

          <div className="about-facts">
            {FACTS.map(({ icon, label, value }) => (
              <div key={label} className={`fact-card${visible ? ' visible' : ''}`}>
                <span className="fact-icon">{icon}</span>
                <div>
                  <p className="fact-label">{label}</p>
                  <p className="fact-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
