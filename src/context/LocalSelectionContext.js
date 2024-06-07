import { createContext, useEffect, useState } from 'react'

const LocalSelectionContext = createContext()

const LocalSelectionContextProvider = ({ children }) => {
  const [expandedGhosts, setExpandedGhosts] = useState([])
  const [showTips, setShowTips] = useState(true)

  const getIsGhostExpanded = (id) => {
    return expandedGhosts.includes(id)
  }

  const toggleGhostExpanded = (id) => {
    setExpandedGhosts((current) => {
      if (current.includes(id)) {
        return current.filter((e) => e !== id)
      } else {
        return [...current, id]
      }
    })
  }

  const toggleIsTipsVisible = () => {
    setShowTips(current => !current)
  }

  const reset = () => {
    setExpandedGhosts([])
    setShowTips(true)
  }

  return (
    <LocalSelectionContext.Provider
      value={{
        getIsGhostExpanded,
        toggleGhostExpanded,
        isTipsVisible: showTips,
        toggleIsTipsVisible,
        reset,
      }}
    >
      {children}
    </LocalSelectionContext.Provider>
  )
}

export { LocalSelectionContext, LocalSelectionContextProvider }
