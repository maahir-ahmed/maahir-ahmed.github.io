import ProductionApp from '../../ProductionApp'
import { getPageContent } from '../../lib/content'

export const dynamic = 'force-dynamic'

export default async function ProductionPage() {
  return <ProductionApp content={await getPageContent('production')} />
}
