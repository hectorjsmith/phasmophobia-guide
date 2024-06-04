class VersionData {
    constructor(version, buildTime) {
        this.version = version
        this.buildTime = buildTime
    }
}

function getVersionData() {
    return new VersionData(process.env.REACT_APP_VERSION, process.env.REACT_APP_BUILD_TIME)
}

export default getVersionData
