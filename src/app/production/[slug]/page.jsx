import { notFound } from 'next/navigation'
import ProductionEventPage from '../../../components/production/ProductionEventPage'
import { getProduction } from '../../../lib/content'

export const dynamic = 'force-dynamic'

export default async function EventPage({ params }) {
  const { slug } = await params
  const production = await getProduction(slug)
  if (!production) notFound()
  return <ProductionEventPage production={production} />
}
