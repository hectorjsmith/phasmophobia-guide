import { useState } from 'react'
import EvidenceTag from './EvidenceTag'

export const GhostRow = ({
  ghost,
  allEvidence,
  getIsEvidenceSelected,
  getIsGhostRejected,
  toggleGhostRejected,
  showTips,
}) => {
  const [expanded, setExpanded] = useState(false)
  const ghostEvidence = allEvidence.filter((e) => ghost.evidence.includes(e.id))

  const toggleExpanded = () => {
    setExpanded((current) => !current)
  }

  return (
    <div>
      <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline">
        <div className="column is-narrow">
          <div className="buttons has-addons">
            <button
              className={
                'button' + (getIsGhostRejected(ghost.name) ? ' is-danger' : '')
              }
              onClick={() => toggleGhostRejected(ghost.name)}
            >
              <span className="icon is-small">
                <i className="fa fa-times" />
              </span>
            </button>
            <button
              className={'button' + (expanded ? ' is-dark' : '')}
              onClick={toggleExpanded}
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
        </div>
        <div className="column">
          <p
            className={
              'is-uppercase has-text-weight-light has-letter-spacing' +
              (getIsGhostRejected(ghost.name)
                ? ' has-text-line-through has-text-danger'
                : '')
            }
          >
            {ghost.name}
          </p>
        </div>
        {ghostEvidence.map((e) => {
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
        className="mt-4 mb-5 mx-4 ghost-info-accordion-content"
      >
        <h2 className="is-size-5 is-uppercase has-letter-spacing">
          Description
        </h2>
        <p className="ml-4">{ghost.description}</p>
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
