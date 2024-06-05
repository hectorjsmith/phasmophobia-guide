export const EvidenceTag = ({ name, icon, isSelected }) => {
  return (
    <span
      className={
        'tag is-medium' + (isSelected ? ' is-success' : ' is-black')
      }
      title={name}
    >
      <span class="icon">
        <i class={'fa fa-' + icon}></i>
      </span>
    </span>
  )
}
