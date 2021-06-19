import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulmaswatch/cyborg/bulmaswatch.scss';
import './fa/scss/fork-awesome.scss';
import Ghost from "./Ghost";
import Evidence from "./Evidence"

// Evidence name constants
const fingerprints = "Fingerprints"
const spiritBox = "Spirit Box"
const ghostWriting = "Ghost Writing"
const freezing = "Freezing Temperatures"
const emf = "EMF"
const ghostOrb = "Ghost Orb"

const collectEvidence = function() {
    return [
        new Evidence(fingerprints, false),
        new Evidence(spiritBox, false),
        new Evidence(ghostWriting, false),
        new Evidence(freezing, false),
        new Evidence(emf, false),
        new Evidence(ghostOrb, false),
    ]
}

const collectGhostData = function() {
    return [
        new Ghost("Spirit", [fingerprints, spiritBox, ghostWriting]),
        new Ghost("Wraith", [fingerprints, spiritBox, freezing]),
    ]
}

ReactDOM.render(
  <React.StrictMode>
    <App evidence={collectEvidence()} ghosts={collectGhostData()} />
  </React.StrictMode>,
  document.getElementById('root')
)
