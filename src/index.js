import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './index.scss'
import './fa/scss/fork-awesome.scss'
import ghosts from './data/ghosts.json'
import evidence from './data/evidence.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App rawEvidence={evidence} rawGhosts={ghosts} />
  </React.StrictMode>
)
