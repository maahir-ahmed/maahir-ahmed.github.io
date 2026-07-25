import UniversityApp from '../../UniversityApp'
import { getUniversityContent } from '../../lib/content'

export const dynamic = 'force-dynamic'

export default async function UniversityPage() {
  return <UniversityApp content={await getUniversityContent()} />
}
