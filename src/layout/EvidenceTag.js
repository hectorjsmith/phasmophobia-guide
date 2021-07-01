import {Component} from "react";

export default class EvidenceTag extends Component {
    isEvidenceSelected() {
        if (!this.props.evidenceList) {
            return false
        }
        return this.props.evidenceList.filter(e => e.selected).some(e => e.name === this.props.evidence)
    }

    render() {
        return (
            <span className={"tag is-medium" + (this.isEvidenceSelected() ? " is-selected" : "")}>{this.props.evidence}</span>
        )
    }
}
