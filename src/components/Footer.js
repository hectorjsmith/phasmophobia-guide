export const Footer = ({version, buildTime}) => {
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
        <div className="column is-half">
          <VersionData version={version} buildTime={buildTime} />
        </div>
      </div>
    </footer>
  )
}

const VersionData = ({version, buildTime}) => {
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
