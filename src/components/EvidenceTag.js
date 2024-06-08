export const EvidenceTag = ({
  name,
  icon,
  isSelected,
  toggleEvidenceSelected,
  isForced,
}) => {
  return (
    <span
      className={
        'tag is-medium has-pointer-on-hover' +
        (isSelected ? ' is-success' : ' is-transparent') +
        (isForced ? ' is-forced-evidence' : '')
      }
      onClick={toggleEvidenceSelected}
      title={name}
    >
      <span className="icon">
        <i className={'fa fa-' + icon}></i>
      </span>
    </span>
  )
}

export default EvidenceTag
