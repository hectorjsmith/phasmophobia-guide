import {Component} from "react"
import Footer from "./nav/Footer"
import TopNav from "./nav/Header"
import LeftColumn from "./layout/LeftColumn"
import RightColumn from "./layout/RightColumn"
import GhostInfoModal from "./layout/GhostModal"

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGhost: null,
            evidence: this.props.evidence,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        }

        this.onEvidenceToggle = this.onEvidenceToggle.bind(this)
        this.onEvidenceReset = this.onEvidenceReset.bind(this)
        this.onShowModal = this.onShowModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
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

    onShowModal(ghost) {
        this.setState({selectedGhost: ghost})
    }

    onCloseModal() {
        this.setState({selectedGhost: null})
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-main">
                    <div className="container">
                        <TopNav />
                        { this.state.selectedGhost != null ? <GhostInfoModal evidence={this.state.evidence} ghost={this.state.selectedGhost} onCloseModal={this.onCloseModal} /> : "" }

                        <div className="columns">
                            <div className="column is-4">
                                <LeftColumn evidence={this.state.evidence}
                                            possibleGhosts={this.state.possibleGhosts}
                                            onEvidenceToggle={this.onEvidenceToggle}
                                            onEvidenceReset={this.onEvidenceReset} />
                            </div>
                            <div className="column is-8">
                                <RightColumn evidence={this.state.evidence}
                                             ghosts={this.state.possibleGhosts}
                                             onShowModal={this.onShowModal}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
