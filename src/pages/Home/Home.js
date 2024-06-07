import { useState } from 'react'
import { SyncModal } from './SyncModal'
import { TopNav, Footer } from '../../components'
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
            <div className="column is-4">
              <EvidenceSelectorPanel
                evidence={rawEvidence}
                ghosts={rawGhosts}
                toggleSyncModal={toggleSyncModalOpen}
              />
            </div>
            <div className="column is-8">
              <GhostListPanel ghosts={rawGhosts} evidence={rawEvidence} />
            </div>
          </div>
        </div>
      </div>
      <Footer version={versionData.version} buildTime={versionData.buildTime} />
    </div>
  )
}

export default Home
