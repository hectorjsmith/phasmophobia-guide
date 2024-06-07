import { useState } from 'react'
import { SyncModal } from './SyncModal'
import { Footer } from '../../components/Footer'
import { TopNav } from '../../components/Header'
import useVersionData from '../../utils/version'
import { EvidenceSelectorPanel } from './EvidenceSelectorPanel'
import { GhostListPanel } from './GhostListPanel'

export const Home = ({ rawEvidence, rawGhosts }) => {
  const versionData = useVersionData()
  const [syncModalOpen, setSyncModalOpen] = useState(false)
  const toggleSyncModalOpen = () => {
    setSyncModalOpen((prevState) => !prevState)
  }

  return (
    <div className="content-wrapper">
      <div className="content-main content">
        <div className="container">
          <TopNav />
          {syncModalOpen && (
            <SyncModal toggleSyncModalOpen={toggleSyncModalOpen} />
          )}
          <div className="columns">
            <EvidenceSelectorPanel
              evidence={rawEvidence}
              ghosts={rawGhosts}
              toggleSyncModal={toggleSyncModalOpen}
            />
            <GhostListPanel ghosts={rawGhosts} evidence={rawEvidence} />
          </div>
        </div>
      </div>
      <Footer version={versionData.version} buildTime={versionData.buildTime} />
    </div>
  )
}

export default Home
