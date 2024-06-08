export const EvidenceTagFull = ({
  name,
  longName,
  icon,
  isSelected,
  toggleEvidenceSelected,
  isForced,
}) => {
  return (
    <span
      className={
        'tag is-medium has-pointer-on-hover' +
        (isSelected ? ' is-success' : ' is-transparent has-border') +
        (isForced ? ' is-forced-evidence' : '')
      }
      title={longName}
      onClick={toggleEvidenceSelected}
    >
      <span className="icon">
        <i className={'fa fa-' + icon}></i>
      </span>
      <span>{name}</span>
    </span>
  )
}

export default EvidenceTagFull
