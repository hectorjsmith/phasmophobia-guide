import EvidenceTag from './EvidenceTag'
import EvidenceTagFull from './EvidenceTagFull'

export const GhostRow = ({
  ghost,
  allEvidence,
  getIsEvidenceSelected,
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
      <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline">
        <div className="column is-narrow">
          <button
            className={'button is-text no-underline' + (expanded ? ' is-dark' : '')}
            onClick={() => toggleGhostExpanded(ghost.id)}
          >
            <span className="icon is-small">
              <i
                className={
                  'fa' + (expanded ? ' fa-chevron-up' : ' fa-chevron-down')
                }
              />
            </span>
          </button>
        </div>
        <div className="column">
          <InteractiveGhostNameHeader ghost={ghost} toggleGhostRejected={toggleGhostRejected} getIsGhostRejected={getIsGhostRejected} />
        </div>
        {!expanded && ghostEvidence.map((e) => {
          return (
            <div key={e.id} className="column is-narrow">
              <EvidenceTag
                name={e.name}
                icon={e.icon}
                isSelected={getIsEvidenceSelected(e.id)}
              />
            </div>
          )
        })}
      </div>
      <div
        hidden={!expanded}
        className="mt-4 mb-5 mx-4 has-border-left-dark"
      >
        <div className='columns is-centered'>
        {ghostEvidence.map((e) => {
          return (
            <div key={e.id} className="column is-narrow">
              <EvidenceTagFull
                name={e.name}
                icon={e.icon}
                isSelected={getIsEvidenceSelected(e.id)}
              />
            </div>
          )
        })}
          
        </div>
        <p className="mt-4">{ghost.description}</p>
        <div className="my-5 ml-4 columns is-mobile is-vcentered is-multiline">
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
              <ol className="ml-0 is-lower-alpha">
                {ghost.tips?.map((w) => {
                  return <li key={w}>{w}</li>
                })}
              </ol>
            </div>
          )}
        </div>
        <a
          className="button is-outlined is-info mb-4"
          href={ghost.wikiUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon mr-3">
            <i className="fa fa-book" />
          </span>
          wiki
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
              'has-text-left ml-6 is-uppercase has-text-weight-light has-letter-spacing has-pointer-on-hover hover-parent'
            }
          >
            <span className={(isRejected
                ? ' has-text-line-through has-text-danger'
                : '')}>{ghost.name}</span>
            <span className={'ml-3 is-size-7 is-visible-on-hover' + (isRejected ? '' : ' has-text-danger')}>
              {isRejected ? '(include)' : '(exclude)' }
            </span>
          </p>
  )
}
