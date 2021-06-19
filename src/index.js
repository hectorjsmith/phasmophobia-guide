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
const freezing = "Freezing"
const emf = "EMF"
const ghostOrb = "Ghost Orb"

const collectEvidence = function() {
    return [
        new Evidence(freezing, false),
        new Evidence(emf, false),
        new Evidence(ghostOrb, false),
        new Evidence(spiritBox, false),
        new Evidence(ghostWriting, false),
        new Evidence(fingerprints, false),
    ]
}

const collectGhostData = function() {
    return [
        new Ghost("Phantom", [freezing, emf, ghostOrb]),
        new Ghost("Banshee", [freezing, emf, fingerprints]),
        new Ghost("Mare", [freezing, ghostOrb, spiritBox]),
        new Ghost("Yurei", [freezing, ghostOrb, ghostWriting]),
        new Ghost("Demon", [freezing, spiritBox, ghostWriting]),
        new Ghost("Wraith", [freezing, spiritBox, fingerprints]),
        new Ghost("Jinn", [emf, ghostOrb, spiritBox]),
        new Ghost("Shade", [emf, ghostOrb, ghostWriting]),
        new Ghost("Oni", [emf, spiritBox, ghostWriting]),
        new Ghost("Revenant", [emf, ghostWriting, fingerprints]),
        new Ghost("Poltergeist", [ghostOrb, spiritBox, fingerprints]),
        new Ghost("Spirit", [spiritBox, ghostWriting, fingerprints]),
        new Ghost("Hantu", [ghostOrb, ghostWriting, fingerprints]),
        new Ghost("Yokai", [ghostOrb, spiritBox, ghostWriting]),
    ]
}

ReactDOM.render(
  <React.StrictMode>
    <App evidence={collectEvidence()} ghosts={collectGhostData()} />
  </React.StrictMode>,
  document.getElementById('root')
)
