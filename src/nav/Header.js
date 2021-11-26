import headerImg from '../img/header.png'

export const TopNav = ({isSyncing, openSyncModal}) => {
    return (
        <nav className="columns is-multiline is-vcentered mb-5">
            <div className="column is-2-desktop" />
            <p className="column is-8-desktop is-12-mobile has-text-centered">
                <img src={headerImg} alt="Phasmophobia paranormal guide" style={{height: "150px"}} />
            </p>
            <div className="column is-2-desktop is-12-mobile has-text-centered mt--5">
                <button className={"button is-outlined" + (isSyncing ? " is-success" : "")}
                        onClick={openSyncModal}>
                        <span className="icon mr-3">
                            <i className={"fa fa-sync" + (isSyncing ? " fa-spin" : "")} />
                        </span>
                    {isSyncing ? "Connected" : "Sync"}
                </button>
            </div>
        </nav>

    )
}
