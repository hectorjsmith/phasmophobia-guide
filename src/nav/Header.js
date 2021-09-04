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
            <nav className="columns is-multiline is-vcentered mb-5">
                <div className="column is-2-desktop" />
                <p className="column is-8-desktop is-12-mobile has-text-centered">
                    <img src={headerImg} alt="Phasmophobia paranormal guide" style={{height: "150px"}} />
                </p>
                <div className="column is-2-desktop is-12-mobile has-text-centered mt--5">
                    <button className={"button is-outlined" + (this.state.syncing ? " is-success" : "")}
                            onClick={this.props.openSyncModal}>
                        <span className="icon mr-3">
                            <i className={"fa fa-sync" + (this.state.syncing ? " fa-spin" : "")} />
                        </span>
                        {this.state.syncing ? "Connected" : "Sync"}
                    </button>
                </div>
            </nav>
        )
    }
}
