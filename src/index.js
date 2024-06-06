import React from 'react'
import ReactDOM from 'react-dom'
// import { App } from './App'
import './index.scss'
import './libs/fa/scss/fork-awesome.scss'
import ghosts from './data/ghosts.json'
import evidence from './data/evidence.json'
import { SyncContextProvider } from './context/SyncContext'
import { SelectionContextProvider } from './context/SelectionContext'
import { Home } from './pages/Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SyncContextProvider>
      <SelectionContextProvider>
        <Home rawEvidence={evidence} rawGhosts={ghosts} />
      </SelectionContextProvider>
    </SyncContextProvider>
  </React.StrictMode>,
)
