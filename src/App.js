import {Component} from "react"
import Footer from "./nav/Footer"
import TopNav from "./nav/Header"
import LeftColumn from "./layout/LeftColumn"
import RightColumn from "./layout/RightColumn"
import {syncService} from "./sync/SyncService"
import SyncModal from "./layout/SyncModal"

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            evidence: this.props.evidence,
            syncModalOpen: false,
            syncOptions: {
                consent: false,
                url: "",
                roomId: "",
            },
            version: 0,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        }

        this.onEvidenceToggle = this.onEvidenceToggle.bind(this)
        this.onEvidenceReset = this.onEvidenceReset.bind(this)
        this.setSyncOptions = this.setSyncOptions.bind(this)
        this.onSyncStart = this.onSyncStart.bind(this)
        this.onSyncUpdate = this.onSyncUpdate.bind(this)
        this.openSyncModal = this.openSyncModal.bind(this)
        this.closeSyncModal = this.closeSyncModal.bind(this)
    }

    componentDidMount() {
        syncService.registerOnConnectFunc(this.onSyncStart)
        syncService.registerOnUpdateFunc(this.onSyncUpdate)
    }

    setSyncOptions(options) {
        console.log("updating options", options)
        this.setState({syncOptions: options})
    }

    openSyncModal() {
        this.setState({syncModalOpen: true})
    }

    closeSyncModal() {
        this.setState({syncModalOpen: false})
    }

    onSyncStart() {
        console.log("initializing room with current state")
        syncService.sendUpdate({version: 0, state: this.state.evidence})
    }

    onSyncUpdate(obj) {
        console.log("processing sync update")
        const status = obj.status
        if (status !== 200) {
            console.log("sync update with invalid status", status, obj)
        }
        const evidence = obj.payload.state
        this.setState({
            version: obj.payload.version,
            evidence: evidence,
            possibleGhosts: this.calcPossibleGhosts(evidence)
        })
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
        if (syncService.isConnected()) {
            console.log("syncing evidence reset")
            syncService.sendUpdate({version: this.state.version, state: this.props.evidence})
        } else {
            this.setState({
                evidence: this.props.evidence,
                possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
            })
        }
    }

    onEvidenceToggle(evidence, field) {
        console.log("syncing evidence change")
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

        if (syncService.isConnected()) {
            syncService.sendUpdate({version: this.state.version, state: updatedEvidence})
        } else {
            this.setState({
                evidence: updatedEvidence,
                possibleGhosts: this.calcPossibleGhosts(updatedEvidence)
            })
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-main">
                    <div className="container">
                        <TopNav openSyncModal={this.openSyncModal} />

                        { this.state.syncModalOpen === true ? <SyncModal syncOptions={this.state.syncOptions} setSyncOptions={this.setSyncOptions} closeSyncModal={this.closeSyncModal} /> : "" }

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
