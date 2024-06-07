import { useState } from 'react'
import { SyncModal } from './SyncModal'
import { Footer } from '../../components/Footer'
import { TopNav } from '../../components/Header'
import useVersionData from '../../utils/version'
import { EvidenceSelectorPanel } from './EvidenceSelectorPanel'

export const Home = ({ rawEvidence, rawGhosts }) => {
  
  const versionData = useVersionData()
  const [syncModalOpen, setSyncModalOpen] = useState(false)
  const toggleSyncModalOpen = () => {
    setSyncModalOpen((prevState) => !prevState)
  }

//   const visibleGhosts = useMemo(() => {
//     console.log('filtering ghosts') // Still gets called twice instead of once
//     return filterPossibleGhosts(
//       selectedEvidence(),
//       rejectedEvidence(),
//       rawGhosts,
//     )
//   }, [data])

  return (
    <div className="content-wrapper">
      <div className="content-main content">
        <div className="container">
          <TopNav />
          {syncModalOpen && (
            <SyncModal toggleSyncModalOpen={toggleSyncModalOpen} />
          )}
          <div className='columns'>
            <EvidenceSelectorPanel evidence={rawEvidence} ghosts={rawGhosts} toggleSyncModal={toggleSyncModalOpen} />
          </div>
          
        </div>
      </div>
      <Footer version={versionData.version} buildTime={versionData.buildTime} />
    </div>
  )
}

export default Home
