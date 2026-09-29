import SecSocApp from '../../SecSocApp'
import { getPageContent } from '../../lib/content'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Maahir Ahmed - SecSoc 2027 Nomination',
  description: 'Candidate statement for Vice President of Internals and Vice President of Technicals.',
}

export default async function SecSocPage() {
  return <SecSocApp content={await getPageContent('secsoc')} />
}
