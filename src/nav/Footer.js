export const Footer = () => {
    const showVersion = () => {
        let version = process.env.REACT_APP_VERSION
        let buildTime = process.env.REACT_APP_BUILD_TIME

        if ((version === undefined || version === "") && (buildTime === undefined || buildTime === "")) {
            return ""
        }
        return (
            <div className="columns is-mobile is-centered">
                <div className="column is-2-desktop is-6-mobile heading">{version}</div>
                <div className="column is-2-desktop is-6-mobile heading">built on: {buildTime}</div>
            </div>
        )
    }

    return (
        <footer className="footer py-4 mt-6">
            <div className="content has-text-centered">
                <p className="heading has-text-centered my-2">
                    <a className="has-text-white has-hover-text-link-dark" href="https://gitlab.com/hectorjsmith/phasmophobia-guide">
                        <span className="icon"><i className="fa fa-gitlab"/></span>
                        Code on Gitlab
                    </a>
                </p>
                {showVersion()}
            </div>
        </footer>
    )
}
