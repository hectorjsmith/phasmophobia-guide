const isGhostPossible = (ghost, selectedEvidence, rejectedEvidence) => {
  let ghostHasSelectedEvidence =
    selectedEvidence.length === 0 ||
    selectedEvidence.every((selected) =>
      ghost.evidence.some((ghostEvidence) => ghostEvidence === selected.id),
    )
  let ghostHasRejectedEvidence =
    rejectedEvidence.length > 0 &&
    rejectedEvidence.some((rejected) =>
      ghost.evidence.some((ghostEvidence) => ghostEvidence === rejected.id),
    )

  return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
}

export const filterPossibleGhosts = (
  selectedEvidence,
  rejectedEvidence,
  allGhosts,
) => {
  return allGhosts.filter((ghost) =>
    isGhostPossible(ghost, selectedEvidence, rejectedEvidence),
  )
}

export const anyVisibleGhostWithEvidence = (
  ghosts,
  selectedEvidence,
  rejectedEvidence,
  evidenceId,
) => {
  return ghosts.some(
    (ghost) =>
      isGhostPossible(ghost, selectedEvidence, rejectedEvidence) &&
      ghost.evidence.includes(evidenceId),
  )
}
