import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bulmaswatch/cyborg/bulmaswatch.scss'
import './index.scss'
import './fa/scss/fork-awesome.scss'
import Ghost from "./data/Ghost"
import Evidence from "./data/Evidence"

// Evidence name constants
const fingerprints = "Fingerprints"
const spiritBox = "Spirit Box"
const ghostWriting = "Ghost Writing"
const freezing = "Freezing"
const emf = "EMF"
const ghostOrb = "Ghost Orb"

const collectEvidence = function() {
    return [
        new Evidence(freezing, false, false),
        new Evidence(emf, false, false),
        new Evidence(ghostOrb, false, false),
        new Evidence(spiritBox, false, false),
        new Evidence(ghostWriting, false, false),
        new Evidence(fingerprints, false, false),
    ]
}

const collectGhostData = function() {
    return [
        new Ghost(
            "Phantom",
            [freezing, emf, ghostOrb],
            "https://phasmophobia.fandom.com/wiki/Phantom",
            "A Phantom is a Ghost that can possess the living, most commonly summoned by a Ouija Board. It also induces fear into those around it.",
            ["Taking a photo of the Phantom will make it temporarily disappear"],
            ["Looking at a Phantom will considerably drop your Sanity"]
        ),
        new Ghost(
            "Banshee",
            [freezing, emf, fingerprints],
            "https://phasmophobia.fandom.com/wiki/Banshee",
            "A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.",
            ["Banshees fear the Crucifix"],
            ["A Banshee will focus on one player at a time"]
        ),
        new Ghost(
            "Mare",
            [freezing, ghostOrb, spiritBox],
            "https://phasmophobia.fandom.com/wiki/Mare",
            "A Mare is the source of all nightmares, making it most powerful in the dark.",
            ["Turning the lights on will lower its chance to attack"],
            ["Increased chance to attack in the dark"]
        ),
        new Ghost(
            "Yurei",
            [freezing, ghostOrb, ghostWriting],
            "https://phasmophobia.fandom.com/wiki/Yurei",
            "A Yurei is a Ghost that has returned to the physical world, usually for the purpose of revenge or hatred.",
            ["Using Smudge Sticks on the Yurei will cause it to not wander"],
            ["Yurei have been known to have a stronger effect on people's Sanity"]
        ),
        new Ghost(
            "Demon",
            [freezing, spiritBox, ghostWriting],
            "https://phasmophobia.fandom.com/wiki/Demon",
            "A Demon is one of the worst Ghosts you can encounter. It has been known to attack without a reason.",
            ["Asking a Demon successful questions on the Ouija Board won't lower the user's sanity"],
            ["Demons are the most aggressive ghosts and will begin Hunts more often"]
        ),
        new Ghost(
            "Wraith",
            [freezing, spiritBox, fingerprints],
            "https://phasmophobia.fandom.com/wiki/Wraith",
            "A Wraith is one of the most dangerous Ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls.",
            ["Wraiths have a toxic reaction to Salt"],
            ["Wraiths almost never touch the ground"]
        ),
        new Ghost(
            "Jinn",
            [emf, ghostOrb, spiritBox],
            "https://phasmophobia.fandom.com/wiki/Jinn",
            "A Jinn is a territorial Ghost that will attack when threatened. It also has been known to travel at significant speed.",
            ["Turning off the location's power source will prevent the Jinn from using its ability"],
            ["A Jinn will travel at a faster speed if its victim is far away"]
        ),
        new Ghost(
            "Shade",
            [emf, ghostOrb, ghostWriting],
            "https://phasmophobia.fandom.com/wiki/Shade",
            "A Shade is known to be a Shy Ghost. There is evidence that a Shade will stop all paranormal activity if there are multiple people nearby.",
            ["A Shade will rarely start a Hunt when players are grouped together"],
            ["As a shy ghost, a Shade will rarely perform actions in the presence of two or more people"]
        ),
        new Ghost(
            "Oni",
            [emf, spiritBox, ghostWriting],
            "https://phasmophobia.fandom.com/wiki/Oni",
            "Onis are a cousin to the Demon and possess extreme strength. There have been rumors that they become more active around their prey.",
            ["More active when people nearby", "Throws objects at great speed"],
            ["Being more active will make the Oni easier to find and identify"]
        ),
        new Ghost(
            "Revenant",
            [emf, ghostWriting, fingerprints],
            "https://phasmophobia.fandom.com/wiki/Revenant",
            "A Revenant is a slow but violent Ghost that will attack indiscriminantly. It has been rumored to travel at a significantly high speed when hunting.",
            ["Hiding from the Revenant will cause it to move at a significantly reduced speed"],
            ["A Revenant will travel significantly faster when hunting a victim"]
        ),
        new Ghost(
            "Poltergeist",
            [ghostOrb, spiritBox, fingerprints],
            "https://phasmophobia.fandom.com/wiki/Poltergeist",
            "One of the most famous Ghosts, a Poltergeist, also known as a noisy ghost can manipulate objects around it to spread fear into it's victims.",
            ["Innefective in empty rooms"],
            ["Can throw multiple objects at once", "Can close multiple doors at once"]
        ),
        new Ghost(
            "Spirit",
            [spiritBox, ghostWriting, fingerprints],
            "https://phasmophobia.fandom.com/wiki/Spirit",
            "A Spirit is the most common Ghost you will come across however it is still very powerful and dangerous. They are usually discovered at one of their hunting grounds after an unexplained death.",
            ["Smudge sticks"],
            ["None"]
        ),
        new Ghost(
            "Hantu",
            [ghostOrb, ghostWriting, fingerprints],
            "https://phasmophobia.fandom.com/wiki/Hantu",
            "A rare ghost that can be found in hot climates. They are known to attack more often in cold weather.",
            ["Hantu moves slower in warmer areas"],
            ["Hantu moves faster in colder areas"]
        ),
        new Ghost(
            "Yokai",
            [ghostOrb, spiritBox, ghostWriting],
            "https://phasmophobia.fandom.com/wiki/Yokai",
            "A common type of ghost that is attracted to human voices. They can usually be found haunting family homes.",
            ["While hunting, it can only hear voices close to it"],
            ["Talking near a Yokai will anger it and cause it to attack more often"]
        ),
    ]
}

ReactDOM.render(
  <React.StrictMode>
    <App evidence={collectEvidence()} ghosts={collectGhostData()} />
  </React.StrictMode>,
  document.getElementById('root')
)
