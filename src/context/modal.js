import * as React from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import {useData} from 'context/data'

const ModalContext = React.createContext()
ModalContext.displayName = 'ModalContext'

const ModalProvider = ({children}) => {
  const data = useData()
  const location = useLocation()
  const editDataRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleModal = React.useCallback(
    editRef => {
      if (editRef?.id) {
        editDataRef.current = editRef
      }
      if (isOpen) {
        editDataRef.current = null
      }
      setIsOpen(!isOpen)
    },
    [isOpen]
  )

  React.useEffect(() => {
    editDataRef.current = null
    setIsOpen(false)
  }, [data])

  React.useEffect(() => {
    editDataRef.current = null
    setIsOpen(false)
  }, [location])

  const value = React.useMemo(
    () => ({
      isOpen,
      handleModal,
      editDataRef: editDataRef.current,
    }),
    [isOpen, handleModal]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

ModalProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

const useModal = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export {ModalProvider, useModal}
