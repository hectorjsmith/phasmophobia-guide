import EvidenceTag from './EvidenceTag'
import EvidenceTagFull from './EvidenceTagFull'

export const GhostRow = ({
  ghost,
  allEvidence,
  getIsEvidenceSelected,
  toggleEvidenceSelected,
  getIsGhostRejected,
  toggleGhostRejected,
  getIsGhostExpanded,
  toggleGhostExpanded,
  showTips,
}) => {
  const ghostEvidence = allEvidence.filter((e) => ghost.evidence.includes(e.id))

  const expanded = getIsGhostExpanded(ghost.id)
  return (
    <div>
      <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline is-justify-content-end">
        <div className="column is-narrow">
          <GhostExpanderButton
            ghost={ghost}
            isExpanded={expanded}
            toggleGhostExpanded={toggleGhostExpanded}
          />
        </div>
        <div className="column">
          <InteractiveGhostNameHeader
            ghost={ghost}
            toggleGhostRejected={toggleGhostRejected}
            getIsGhostRejected={getIsGhostRejected}
          />
        </div>
        {ghostEvidence.map((e) => {
          return (
            <div key={e.id} className="column is-narrow">
              {expanded ? (
                <EvidenceTagFull
                  name={e.name}
                  icon={e.icon}
                  isSelected={getIsEvidenceSelected(e.id)}
                  toggleEvidenceSelected={() => toggleEvidenceSelected(e.id)}
                />
              ) : (
                <EvidenceTag
                  name={e.name}
                  icon={e.icon}
                  isSelected={getIsEvidenceSelected(e.id)}
                  toggleEvidenceSelected={() => toggleEvidenceSelected(e.id)}
                />
              )}
            </div>
          )
        })}
      </div>
      <div
        hidden={!expanded}
        className="mt-4 mb-5 mx-5 pl-4 has-border-left-dark has-text-left"
      >
        <p className="mt-4 has-text-centered-tablet">{ghost.description}</p>

        <div className="my-4 columns is-mobile is-vcentered is-multiline">
          <div className="column is-6-mobile">
            <h2 className="is-size-6 is-uppercase has-letter-spacing">
              Strengths
            </h2>
            {ghost.strengths.map((s) => {
              return <p key={s}>{s}</p>
            })}
          </div>
          <div className="column is-6-mobile">
            <h2 className="is-size-6 is-uppercase has-letter-spacing">
              Weaknesses
            </h2>
            {ghost.weaknesses.map((w) => {
              return <p key={w}>{w}</p>
            })}
          </div>

          {showTips && (
            <div className="column is-12 is-12-mobile">
              <h2 className="is-size-6 is-uppercase has-letter-spacing">
                Tips
              </h2>
              <ol className="ml-4 is-lower-alpha">
                {ghost.tips?.map((w) => {
                  return <li key={w}>{w}</li>
                })}
              </ol>
            </div>
          )}
        </div>
        <a
          className="button is-outlined is-info mb-3 is-lowercase"
          href={ghost.wikiUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon mr-2">
            <i className="fa fa-book" />
          </span>
          link to wiki
        </a>
      </div>
      <hr className="my-3" />
    </div>
  )
}

export default GhostRow

const InteractiveGhostNameHeader = ({
  ghost,
  toggleGhostRejected,
  getIsGhostRejected,
}) => {
  const isRejected = getIsGhostRejected(ghost.id)

  return (
    <p
      onClick={() => toggleGhostRejected(ghost.id)}
      className={
        'has-text-left is-uppercase has-text-weight-light has-letter-spacing has-pointer-on-hover hover-parent'
      }
    >
      <span
        className={isRejected ? ' has-text-line-through has-text-danger' : ''}
      >
        {ghost.name}
      </span>
      <span
        className={
          'is-hidden-mobile ml-3 is-size-7 is-visible-on-hover' +
          (isRejected ? '' : ' has-text-danger')
        }
      >
        {isRejected ? '(include)' : '(exclude)'}
      </span>
    </p>
  )
}

const GhostExpanderButton = ({ ghost, isExpanded, toggleGhostExpanded }) => {
  return (
    <button
      className={'button is-text no-underline' + (isExpanded ? ' is-dark' : '')}
      onClick={() => toggleGhostExpanded(ghost.id)}
    >
      <span className="icon is-small">
        <i
          className={
            'fa' + (isExpanded ? ' fa-chevron-up' : ' fa-chevron-down')
          }
        />
      </span>
    </button>
  )
}
