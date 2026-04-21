import { PRODUCTIONS } from '../../../data/productions';
import ProductionEventPage from '../../../components/production/ProductionEventPage';

export function generateStaticParams() {
  return PRODUCTIONS.map(p => ({ slug: p.slug }));
}

export default function EventPage({ params }) {
  const production = PRODUCTIONS.find(p => p.slug === params.slug) ?? null;
  return <ProductionEventPage production={production} />;
}
