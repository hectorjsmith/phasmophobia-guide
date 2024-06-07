export const ResetButton = ({ reset }) => {
    return (
        <button
          className={'button is-outlined is-warning'}
          onClick={reset}
          title="Reset all selected observations"
        >
          reset
        </button>
    )
}

export default ResetButton
