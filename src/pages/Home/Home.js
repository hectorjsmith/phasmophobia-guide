import { useState, useContext, useEffect, useMemo } from 'react'
import { SyncModal } from './SyncModal'
import { Footer } from '../../components/Footer'
import { TopNav } from '../../components/Header'
import useVersionData from '../../utils/version'
import { SyncContext } from '../../context/SyncContext'
import { SelectionContext } from '../../context/SelectionContext'
import { filterPossibleGhosts } from '../../utils/filtering'

export const Home = ({ rawEvidence, rawGhosts }) => {
  const { room, userName, isConnected } = useContext(SyncContext)
  const {
    data,
    setDataFromSync,
    isEvidenceSelected,
    toggleEvidenceSelected,
    selectedEvidence,
    rejectedEvidence,
  } = useContext(SelectionContext)

  const [syncModalOpen, setSyncModalOpen] = useState(true)
  const toggleSyncModalOpen = () => {
    setSyncModalOpen((prevState) => !prevState)
  }
  const versionData = useVersionData()

  const syncEvent = () => {
    console.log('sync event')
    setDataFromSync({ evidence: {}, ghosts: {} })
  }

  const visibleGhosts = useMemo(() => {
    console.log('filtering ghosts') // Still gets called twice instead of once
    return filterPossibleGhosts(
      selectedEvidence(),
      rejectedEvidence(),
      rawGhosts,
    )
  }, [data])

  return (
    <div className="content-wrapper">
      <div className="content-main content">
        <div className="container">
          <TopNav />
          {syncModalOpen && (
            <SyncModal toggleSyncModalOpen={toggleSyncModalOpen} />
          )}
          <h1>Home page</h1>
          <button className="button" onClick={toggleSyncModalOpen}>
            Modal
          </button>
          <br />
          <p>
            Dots: {isEvidenceSelected('dots') ? 'selected' : 'not selected'}
          </p>
          <button
            className="button"
            onClick={() => toggleEvidenceSelected('dots')}
          >
            Toggle
          </button>
          <br />
          <p>
            Connected: {isConnected ? 'yes' : 'no'} / Room: {room} / User:{' '}
            {userName}
          </p>
          <button className="button" onClick={syncEvent}>
            Sync Event
          </button>
          <br />
          {visibleGhosts &&
            visibleGhosts.map((ghost) => {
              return <p key={ghost.name}>Ghost: {ghost.name}</p>
            })}
        </div>
      </div>
      <Footer version={versionData.version} buildTime={versionData.buildTime} />
    </div>
  )
}

export default Home
