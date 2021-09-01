import {Component} from "react";
import headerImg from "../img/header.png";
import {syncService} from "../sync/SyncService";

export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {syncing: syncService.isConnected()}

        this.updateSyncState = this.updateSyncState.bind(this)
    }

    componentDidMount() {
        syncService.registerOnConnectFunc(this.updateSyncState)
        syncService.registerOnCloseFunc(this.updateSyncState)
    }

    updateSyncState() {
        this.setState({syncing: syncService.isConnected()})
    }

    render() {
        return (
            <nav className="level">
                <p className="level-item has-text-centered">
                    <img src={headerImg} alt="Phasmophobia paranormal guide" style={{height: "150px"}} />
                </p>
                <button onClick={this.props.openSyncModal} className={"button" + (this.state.syncing ? " is-success" : " is-dark")}>Sync</button>
            </nav>
        )
    }
}
