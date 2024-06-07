import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import './libs/fa/scss/fork-awesome.scss'
import ghosts from './data/ghosts.json'
import evidence from './data/evidence.json'
import { SyncContextProvider } from './context/SyncContext'
import { SelectionContextProvider } from './context/SelectionContext'
import { LocalSelectionContextProvider } from './context/LocalSelectionContext'
import { Home } from './pages/Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SyncContextProvider>
      <SelectionContextProvider>
        <LocalSelectionContextProvider>
          <Home rawEvidence={evidence} rawGhosts={ghosts} />
        </LocalSelectionContextProvider>
      </SelectionContextProvider>
    </SyncContextProvider>
  </React.StrictMode>,
)
