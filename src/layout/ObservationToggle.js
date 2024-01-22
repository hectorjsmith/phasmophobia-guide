export const ObservationToggle = ({
  possibleGhosts,
  evidence,
  setEvidence,
}) => {
  const toggleSelect = () => {
    setEvidence({
      ...evidence,
      selected: !evidence.selected,
    })
  }

  const toggleReject = () => {
    setEvidence({
      ...evidence,
      rejected: !evidence.rejected,
    })
  }

  const matchingGhosts = possibleGhosts.filter((g) =>
    g.evidence.some((e) => e === evidence.id),
  ).length

  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-offset-2 is-narrow">
        <div className="buttons has-addons">
          <button
            className={'button' + (evidence.rejected ? ' is-danger' : '')}
            onClick={toggleReject}
          >
            <span className="icon is-small">
              <i className="fa fa-times" />
            </span>
          </button>

          <button
            className={
              'button' +
              (evidence.selected ? ' is-success' : '') +
              (matchingGhosts === 0 ? ' is-dark' : '')
            }
            onClick={toggleSelect}
          >
            <span className="icon is-small">
              <i
                className={
                  'fa fa-' +
                  evidence.icon +
                  (matchingGhosts === 0 ? ' has-text-dark' : '')
                }
              />
            </span>
          </button>
        </div>
      </div>
      <div className="column is-mobile mt-1">
        <p>{evidence.name}</p>
      </div>
    </div>
  )
}
