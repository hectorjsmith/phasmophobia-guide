import { createContext, useEffect, useState } from 'react'

const SelectionContext = createContext()

const getBaseData = () => {
return {
    source: 'local',
    evidence: {},
    ghosts: {},
    showTips: true,
  }
}

const SelectionContextProvider = ({ children }) => {
  const [data, setData] = useState(getBaseData())
  const [onChangeHandler, setOnChangeHandler] = useState(() => () => {})

  useEffect(() => {
    if (data.source === 'local') {
      onChangeHandler(data)
    }
  }, [data])

  const setDataFromSync = (newData) => {
    console.log('set data from sync', newData)
    setData({ ...newData, source: 'ext' })
  }

  const isEvidenceSelected = (id) => {
    return data?.evidence?.[id]?.selected === true
  }

  const toggleEvidenceSelected = (id) => {
    console.log("toggle evidence selected", id)
    setData((current) => {
      return {
        ...current,
        source: 'local',
        evidence: {
          ...(current?.evidence ?? {}),
          [id]: {
            ...(current?.evidence?.[id] ?? {}),
            id: id,
            selected: !(current?.evidence?.[id]?.selected ?? false),
          },
        },
      }
    })
  }

  const isEvidenceRejected = (id) => {
    return data?.evidence?.[id]?.rejected === true
  }

  const toggleEvidenceRejected = (id) => {
    console.log("toggle evidence rejected", id)
    setData((current) => {
      return {
        ...current,
        source: 'local',
        evidence: {
          ...(current?.evidence ?? {}),
          [id]: {
            ...(current?.evidence?.[id] ?? {}),
            id: id,
            rejected: !(current?.evidence?.[id]?.rejected ?? false),
          },
        },
      }
    })
  }

  const isGhostRejected = (id) => {
    return data?.ghosts?.[id]?.rejected === true
  }

  const toggleGhostRejected = (id) => {
    console.log("toggle ghost rejected", id)
    setData((current) => {
      return {
        ...current,
        source: 'local',
        ghosts: {
          ...(current?.ghosts ?? {}),
          [id]: {
            ...(current?.ghosts?.[id] ?? {}),
            id: id,
            rejected: !(current?.ghosts?.[id]?.rejected ?? false),
          },
        },
      }
    })
  }

  const selectedEvidence = () => {
    return Object.values(data?.evidence ?? {}).filter((e) => e.selected) ?? []
  }

  const rejectedEvidence = () => {
    return Object.values(data?.evidence ?? {}).filter((e) => e.rejected) ?? []
  }

  const isTipsVisible = () => {
    return data?.showTips
  }

  const toggleIsTipsVisible = () => {
    setData((current) => {
      return {
        ...current,
        source: 'local',
        showTips: !current?.showTips,
      }})
  }

  const reset = () => {
    setData(getBaseData())
  }

  return (
    <SelectionContext.Provider
      value={{
        data,
        setDataFromSync,
        setOnChangeHandler,
        isEvidenceSelected,
        toggleEvidenceSelected,
        isEvidenceRejected,
        toggleEvidenceRejected,
        isGhostRejected,
        isTipsVisible,
        toggleIsTipsVisible,
        toggleGhostRejected,
        selectedEvidence,
        rejectedEvidence,
        reset,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export { SelectionContext, SelectionContextProvider }
