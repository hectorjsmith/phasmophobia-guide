import { compareStringsAsc } from '../util/stringSort'
import { ObservationToggle } from './ObservationToggle'

export const LeftColumn = ({
  evidence,
  setEvidence,
  resetEvidence,
  ghosts,
  showTips,
  toggleShowTips,
}) => {
  const maxSelected = 3
  const countSelectedEvidence = () => {
    return evidence.filter((e) => e.selected).length
  }
  const countRejectedEvidence = () => {
    return evidence.filter((e) => e.rejected).length
  }

  const showWarning = () => {
    if (countSelectedEvidence() > maxSelected) {
      return (
        <span
          className="icon has-text-warning"
          title="Too many observations selected"
        >
          <i className="fa fa-2x fa-warning" />
        </span>
      )
    }
    return ''
  }

  let selectedEvidenceCount = countSelectedEvidence()
  let rejectedEvidenceCount = countRejectedEvidence()
  let selectionCount = selectedEvidenceCount + rejectedEvidenceCount
  return (
    <div>
      <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">
        Observations
      </h2>

      {evidence
        .sort((a, b) => compareStringsAsc(a.name, b.name))
        .map((e, index) => {
          return (
            <ObservationToggle
              key={e.name}
              evidence={e}
              setEvidence={(newE) => {
                evidence[index] = newE
                setEvidence([...evidence])
              }}
              ghosts={ghosts}
            />
          )
        })}

      <div className="has-text-centered">
        <button
          className={
            'button my-4 is-outlined' +
            (selectionCount > 0 ? ' is-warning' : '')
          }
          onClick={resetEvidence}
          title="Reset all selected observations"
        >
          reset
        </button>

        <p className="heading mb-3">
          ({selectedEvidenceCount} of {maxSelected})
        </p>
        {showWarning()}
      </div>

      <div className="columns is-mobile is-centered is-vcentered is-narrow my-5">
        <button
          className={'button' + (showTips ? ' is-info' : '')}
          onClick={toggleShowTips}
          title="Show Tips"
        >
          <span className="icon is-small">
            <i className={'fa fa-info'} />
          </span>
        </button>
      </div>
    </div>
  )
}
