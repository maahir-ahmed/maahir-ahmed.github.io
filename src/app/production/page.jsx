import ProductionApp from '../../ProductionApp'
import { getProductions } from '../../lib/content'

export const dynamic = 'force-dynamic'

export default async function ProductionPage() {
  return <ProductionApp productions={await getProductions()} />
}
