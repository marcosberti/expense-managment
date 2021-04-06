import * as React from 'react'
import PropTypes from 'prop-types'

const ListContext = React.createContext()
ListContext.displayName = 'ListContext'

const ListProvider = ({children}) => {
  const [items, setItems] = React.useState([])

  const handleItem = React.useCallback(
    item => {
      const indexOf = items.findIndex(({id}) => id === item.id)
      if (indexOf < 0) {
        setItems(prev => [...prev, item])
      } else {
        setItems(prev => prev.filter(({id}) => id !== item.id))
      }
    },
    [items]
  )

  const handleClear = React.useCallback(() => {
    setItems([])
  }, [])

  const value = React.useMemo(
    () => ({
      items,
      setItems,
      handleItem,
      handleClear,
    }),
    [items, setItems, handleItem, handleClear]
  )

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}
ListProvider.propTypes = {
  children: PropTypes.object,
}

const useList = () => {
  const context = React.useContext(ListContext)
  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider')
  }
  return context
}

export {ListProvider, useList}
