import { createContext, useEffect, useState } from 'react'

const SelectionContext = createContext()

const SelectionContextProvider = ({ children }) => {
  const [data, setData] = useState(getBaseData())
  const [onChangeHandler, setOnChangeHandler] = useState(() => () => {})

  useEffect(() => {
    if (data.source === 'local') {
      onChangeHandler(data)
    }
    // we don't want to re-sync data if the handler changes
    // eslint-disable-next-line
  }, [data])

  const setDataFromSync = (newData) => {
    console.log('set data from sync', newData)
    setData({ ...newData, source: 'ext' })
  }

  const getIsEvidenceSelected = (id) => {
    return data?.evidence?.[id]?.selected === true
  }

  const toggleEvidenceSelected = (id) => {
    console.log('toggle evidence selected', id)
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

  const getIsEvidenceRejected = (id) => {
    return data?.evidence?.[id]?.rejected === true
  }

  const toggleEvidenceRejected = (id) => {
    console.log('toggle evidence rejected', id)
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

  const getIsGhostRejected = (id) => {
    return data?.ghosts?.[id]?.rejected === true
  }

  const toggleGhostRejected = (id) => {
    console.log('toggle ghost rejected', id)
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

  const reset = () => {
    setData(getBaseData())
  }

  return (
    <SelectionContext.Provider
      value={{
        data,
        setDataFromSync,
        setOnChangeHandler,
        getIsEvidenceSelected,
        toggleEvidenceSelected,
        getIsEvidenceRejected,
        toggleEvidenceRejected,
        getIsGhostRejected,
        toggleGhostRejected,
        selectedEvidence: selectedEvidence(),
        rejectedEvidence: rejectedEvidence(),
        reset,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

const getBaseData = () => {
  return {
    source: 'local',
    evidence: {},
    ghosts: {},
    showTips: true,
  }
}

export { SelectionContext, SelectionContextProvider }
