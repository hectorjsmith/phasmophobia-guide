export const EvidenceTag = ({ title, selected }) => {
  return (
    <span className={'tag is-medium' + (selected ? ' is-selected' : '')}>
      {title}
    </span>
  )
}
