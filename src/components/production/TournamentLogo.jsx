// A tournament logo, swapping to its dark-mode version when there is one
export default function TournamentLogo({ production, className }) {
  const { logo, logoDark, event } = production;
  if (!logo && !logoDark) return null;
  if (!logo || !logoDark) {
    return <img src={logo || logoDark} alt={`${event} logo`} className={className} loading="lazy" />;
  }
  return (
    <>
      <img src={logo} alt={`${event} logo`} className={`${className} logo-for-light`} loading="lazy" />
      <img src={logoDark} alt={`${event} logo`} className={`${className} logo-for-dark`} loading="lazy" />
    </>
  );
}
