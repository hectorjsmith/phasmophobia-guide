export const Footer = () => {
  const showVersion = () => {
    let version = process.env.REACT_APP_VERSION
    let buildTime = process.env.REACT_APP_BUILD_TIME

    if (
      (version === undefined || version === '') &&
      (buildTime === undefined || buildTime === '')
    ) {
      return ''
    }
    return (
      <div className="has-text-right">
        <p className="heading">
          {version}
          <span className="icon">
            <i className="fa fa-code" />
          </span>
        </p>
        <p className="heading">
          Built on {buildTime}
          <span className="icon">
            <i className="fa fa-calendar" />
          </span>
        </p>
      </div>
    )
  }

  return (
    <footer className="footer mt-6">
      <div className="columns mx-4">
        <div className="column is-half">
          <p className="heading">
            <a
              className="has-text-white has-hover-text-link-dark"
              target="_blank"
              rel="noreferrer"
              href="https://gitlab.com/hectorjsmith/phasmophobia-guide"
            >
              <span className="icon">
                <i className="fa fa-gitlab" />
              </span>
              Code on Gitlab
            </a>
          </p>
          <p className="heading">
            <a
              className="has-text-white has-hover-text-link-dark"
              target="_blank"
              rel="noreferrer"
              href="https://umami.is/"
            >
              <span className="icon">
                <i className="fa fa-line-chart" />
              </span>
              Analytics by Umami
            </a>
          </p>
        </div>
        <div className="column is-half">{showVersion()}</div>
      </div>
    </footer>
  )
}
