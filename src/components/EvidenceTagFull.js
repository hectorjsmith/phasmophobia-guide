export const EvidenceTagFull = ({ name, icon, isSelected }) => {
    return (
      <span
        className={
          'tag is-medium' + (isSelected ? ' is-success' : ' is-dark')
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
  