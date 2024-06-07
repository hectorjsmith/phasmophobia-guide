export const NoGhostsFoundResult = () => {
  return (
    <div className="box has-text-centered">
      <span className="icon has-text-warning">
        <i className="fa fa-2x fa-times" />
      </span>
      <p className="my-3 is-uppercase has-letter-spacing">None found</p>
      <p>No ghosts found that match selected evidence</p>
    </div>
  )
}

export default NoGhostsFoundResult
