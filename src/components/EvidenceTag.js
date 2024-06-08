export const EvidenceTag = ({ name, icon, isSelected }) => {
  return (
    <span
      className={
        'tag is-medium' + (isSelected ? ' is-success' : ' is-transparent')
      }
      title={name}
    >
      <span className="icon">
        <i className={'fa fa-' + icon}></i>
      </span>
    </span>
  )
}

export default EvidenceTag
