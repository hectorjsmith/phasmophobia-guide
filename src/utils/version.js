class VersionData {
  constructor(version, buildTime) {
    this.version = version
    this.buildTime = buildTime
  }
}

const useVersionData = () => {
  return new VersionData(
    process.env.REACT_APP_VERSION,
    process.env.REACT_APP_BUILD_TIME,
  )
}

export default useVersionData
