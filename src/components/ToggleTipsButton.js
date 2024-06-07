export const ToggleTipsButton = ({ isTipsVisible, toggleIsTipsVisible }) => {
  return (
    <button
      className={'button' + (isTipsVisible ? ' is-info' : '')}
      onClick={toggleIsTipsVisible}
      title="Show Tips"
    >
      <span className="icon is-small">
        <i className={'fa fa-info'} />
      </span>
    </button>
  )
}

export default ToggleTipsButton
