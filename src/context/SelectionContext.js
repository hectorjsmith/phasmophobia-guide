import { createContext, useEffect, useState } from 'react';

const SelectionContext = createContext();

const SelectionContextProvider = ({ children }) => {
    const [data, setData] = useState({source: 'local', evidence: {}, ghosts: {}});
    const [onChangeHandler, setOnChangeHandler] = useState(() => () => {});

    useEffect(() => {
        if (data.source === 'local'){
            onChangeHandler(data)
        }
    }, [data, onChangeHandler])

    const setDataFromSync = (newData) => {
        console.log("set data from sync", newData)
        setData({...newData, source: 'ext'})
    }

    const isEvidenceSelected = (id) => {
        return data?.evidence?.[id]?.selected === true
    }

    const toggleEvidenceSelected = (id) => {
        setData(current => {
            return {
                ...current,
                source: 'local',
                evidence: {
                    ...current?.evidence ?? {},
                    [id]: {
                        ...current?.evidence?.[id] ?? {},
                        selected: !(current?.evidence?.[id]?.selected ?? false)
                    }
                }
            }
        })
    }

    const isEvidenceRejected = (id) => {
        return data?.evidence?.[id]?.rejected === true
    }

    const toggleEvidenceRejected = (id) => {
        setData(current => {
            return {
                ...current,
                source: 'local',
                evidence: {
                    ...current?.evidence ?? {},
                    [id]: {
                        ...current?.evidence?.[id] ?? {},
                        rejected: !(current?.evidence?.[id]?.rejected ?? false)
                    }
                }
            }
        })
    }

    const isGhostRejected = (id) => {
        return data?.ghosts?.[id]?.rejected === true
    }

    const toggleGhostRejected = (id) => {
        setData(current => {
            return {
                ...current,
                source: 'local',
                ghosts: {
                    ...current?.ghosts ?? {},
                    [id]: {
                        ...current?.ghosts?.[id] ?? {},
                        rejected: !(current?.ghosts?.[id]?.rejected ?? false)
                    }
                }
            }
        })
    }

    return (
        <SelectionContext.Provider value={{
            data,
            setDataFromSync,
            setOnChangeHandler,
            isEvidenceSelected,
            toggleEvidenceSelected,
            isEvidenceRejected,
            toggleEvidenceRejected,
            isGhostRejected,
            toggleGhostRejected,
        }}>
            {children}
        </SelectionContext.Provider>
    )
}

export { SelectionContext, SelectionContextProvider }
