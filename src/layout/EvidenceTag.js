export const EvidenceTag = ({evidence, evidenceList}) => {
    const isEvidenceSelected = () => {
        if (!evidenceList) {
            return false
        }
        return evidenceList.filter(e => e.selected).some(e => e.name === evidence)
    }

    return (
        <span className={"tag is-medium" + (isEvidenceSelected() ? " is-selected" : "")}>{evidence}</span>
    )
}
