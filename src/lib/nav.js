// Section links follow the page's section order; Home stays first and links
// to other pages stay last.
export function sortLinks(links, order) {
  const rank = ({ href }) => {
    if (href === '#home') return -1;
    const i = order.indexOf(href.slice(1));
    return href.startsWith('#') && i >= 0 ? i : Infinity;
  };
  return [...links].sort((a, b) => rank(a) - rank(b));
}
