import App from '../App'
import { getPageContent } from '../lib/content'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return <App content={await getPageContent('home')} />
}
