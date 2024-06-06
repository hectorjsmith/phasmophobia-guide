export const ObservationToggle = ({
  id,
  name,
  icon,
  isSelected,
  toggleSelection,
  isRejected,
  toggleRejection,
  isAvailable,
}) => {
  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-offset-2 is-narrow">
        <div className="buttons has-addons">
          <button
            className={'button' + (isRejected ? ' is-danger' : '')}
            onClick={toggleRejection(id)}
          >
            <span className="icon is-small">
              <i className="fa fa-times" />
            </span>
          </button>

          <button
            className={
              'button' +
              (isSelected ? ' is-success' : '') +
              (isAvailable ? '' : ' is-dark')
            }
            onClick={toggleSelection(id)}
          >
            <span className="icon is-small">
              <i
                className={
                  'fa fa-' + icon + (isAvailable ? '' : ' has-text-dark')
                }
              />
            </span>
          </button>
        </div>
      </div>
      <div className="column is-mobile mt-1">
        <p>{name}</p>
      </div>
    </div>
  )
}
