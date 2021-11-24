import {Component} from "react"

export const ObservationToggle = ({possibleGhosts, evidence, setEvidence}) => {
    console.log("ghosts", possibleGhosts)
    console.log("evidence", evidence)
    console.log("setter", setEvidence)
    const toggleSelect = () => {
        setEvidence({
            ...evidence,
            selected: !evidence.selected,
        })
    }

    const toggleReject = () => {
        setEvidence({
            ...evidence,
            rejected: !evidence.rejected,
        })
    }

    const totalGhosts = possibleGhosts.length
    const matchingGhosts = possibleGhosts.filter(g => g.evidence.some(e => e === evidence.name)).length

    return (
        <div className="columns is-mobile is-vcentered">
            <div className="column is-offset-2 is-narrow">
                <div className="buttons has-addons">
                    <button className={"button" + (evidence.rejected ? " is-danger" : "")}
                            onClick={toggleSelect}>
                            <span className="icon is-small">
                                <i className="fa fa-times" />
                            </span>
                    </button>

                    <button className={"button" + (evidence.selected ? " is-success" : "") + (matchingGhosts === 0 ? " is-dark" : "")}
                            onClick={toggleReject}>
                            <span className="icon is-small">
                                <i className={"fa fa-check" + (matchingGhosts === 0 ? " has-text-dark" : "")} />
                            </span>
                    </button>
                </div>
            </div>
            <div className="column is-mobile mt-1">
                <p>{evidence.name}</p>
                <p className="heading">{matchingGhosts} / {totalGhosts}</p>
            </div>
        </div>
    );
}
