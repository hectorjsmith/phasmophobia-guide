export const EvidenceTagFull = ({ name, icon, isSelected }) => {
  return (
    <span
      className={
        'tag is-medium' +
        (isSelected ? ' is-success' : ' is-transparent has-border')
      }
      title={name}
    >
      <span className="icon">
        <i className={'fa fa-' + icon}></i>
      </span>
      <span>{name}</span>
    </span>
  )
}

export default EvidenceTagFull
