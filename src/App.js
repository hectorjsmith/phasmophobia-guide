import {Component, useEffect} from "react"
import Footer from "./nav/Footer"
import TopNav from "./nav/Header"
import LeftColumn from "./layout/LeftColumn"
import RightColumn from "./layout/RightColumn"

export default App = ({evidence, ghosts}) => {
    const [evidenceData, setEvidenceData] = useState([])
    const [possibleGhosts, setPossibleGhosts] = useState([])

    const mapEvidence = (e) => {
        return e.map((e1) => {
            return {
                ...e1,
                selected: false,
                rejected: false
            }
        })
    }

    const filterGhosts = (evidence) => {
        let selectedEvidence = evidence.filter(e => e.selected)
        let rejectedEvidence = evidence.filter(e => e.rejected)

        if (selectedEvidence.length === 0 && rejectedEvidence.length === 0) {
            return ghosts
        }

        return ghosts.filter(ghost => {
            let ghostHasSelectedEvidence = selectedEvidence.length === 0
                || selectedEvidence.every(selected => ghost.evidence.some(ghostEvidence => ghostEvidence === selected.name))
            let ghostHasRejectedEvidence = rejectedEvidence.length > 0
                && rejectedEvidence.some(rejected => ghost.evidence.some(ghostEvidence => ghostEvidence === rejected.name))

            return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
        })
    }

    useEffect(() => setEvidenceData(mapEvidence(evidence)), [evidence])
    useEffect(() => setPossibleGhosts(filterGhosts(evidence)), [evidence, ghosts])

    return (
        <div className="content-wrapper">
            <div className="content-main">
                <div className="container">
                    <TopNav />
                    <div className="columns">
                        <div className="column is-4">
                            <LeftColumn evidence={evidenceData}
                                        setEvidence={setEvidenceData}
                                        possibleGhosts={possibleGhosts} />
                        </div>
                        <div className="column is-8">
                            <RightColumn evidence={this.state.evidence}
                                         ghosts={this.state.possibleGhosts}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            evidence: this.props.evidence,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        }

        this.onEvidenceToggle = this.onEvidenceToggle.bind(this)
        this.onEvidenceReset = this.onEvidenceReset.bind(this)
    }

    calcPossibleGhosts(evidence) {
        let selectedEvidence = evidence.filter(e => e.selected)
        let rejectedEvidence = evidence.filter(e => e.rejected)

        if (selectedEvidence.length === 0 && rejectedEvidence.length === 0) {
            return this.props.ghosts
        }

        return this.props.ghosts.filter(ghost => {
            let ghostHasSelectedEvidence = selectedEvidence.length === 0
                || selectedEvidence.every(selected => ghost.evidence.some(ghostEvidence => ghostEvidence === selected.name))
            let ghostHasRejectedEvidence = rejectedEvidence.length > 0
                && rejectedEvidence.some(rejected => ghost.evidence.some(ghostEvidence => ghostEvidence === rejected.name))

            return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
        })
    }

    onEvidenceReset() {
        this.setState({
            evidence: this.props.evidence,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        })
    }

    onEvidenceToggle(evidence, field) {
        // state update inspired by: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        let selectedToggle = (el) => el.selected
        let rejectedToggle = (el) => el.rejected

        if (field === "selected") {
            selectedToggle = (el) => !el.selected
            rejectedToggle = () => false
        }
        if (field === "rejected") {
            selectedToggle = () => false
            rejectedToggle = (el) => !el.rejected
        }

        const updatedEvidence = this.state.evidence.map(
            el => el.name === evidence.name ? {
                ...el,
                selected: selectedToggle(el),
                rejected: rejectedToggle(el)
            }: el
        )

        this.setState({
            evidence: updatedEvidence,
            possibleGhosts: this.calcPossibleGhosts(updatedEvidence)
        })
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-main">
                    <div className="container">
                        <TopNav />
                        <div className="columns">
                            <div className="column is-4">
                                <LeftColumn evidence={this.state.evidence}
                                            possibleGhosts={this.state.possibleGhosts}
                                            onEvidenceToggle={this.onEvidenceToggle}
                                            onEvidenceReset={this.onEvidenceReset} />
                            </div>
                            <div className="column is-8">
                                <RightColumn evidence={this.state.evidence}
                                             ghosts={this.state.possibleGhosts}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
