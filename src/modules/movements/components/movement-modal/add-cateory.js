/** @jsxImportSource @emotion/react */
import * as React from 'react'
import PropTypes from 'prop-types'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useData} from 'context/data'
import {AddIcon} from 'icons'
import {Button, Modal} from 'common-components'

const AddCategoryButton = styled(Button)`
  padding: 0;
  border: 1px solid;
  width: var(--category-size);
  height: var(--category-size);
  position: relative;
  border-radius: var(--border-radius);
`

const AddCategoryButtonInner = styled.div`
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  border: 1px dashed #000;
  transform: translate(-50%, -50%);
`

const AddCategory = ({onAddCat}) => {
  const {categorias} = useData()
  const [isAdding, setIsAdding] = React.useState(false)

  const handleAddCategory = e => {
    e.preventDefault()
    const {value} = e.currentTarget.dataset
    onAddCat(value)
    setIsAdding(false)
  }

  const handleIsAdding = e => {
    e.preventDefault()
    setIsAdding(!isAdding)
  }

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <Modal
        isOpen={isAdding}
        onClose={handleIsAdding}
        withBackdrop={false}
        modalProps={{
          left: '50%',
          zIndex: '1',
          top: '5.5rem',
          width: '7rem',
          padding: '0.5rem',
          transform: 'translateX(-50%)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--secondary-400)',
          backgroundColor: 'var(--secondary-400-op)',
        }}
      >
        <ul>
          {categorias.map(c => (
            <li key={c.nombre}>
              <Button
                variant="modal"
                onClick={handleAddCategory}
                data-value={c.nombre}
              >
                {c.nombre}
              </Button>
            </li>
          ))}
        </ul>
      </Modal>

      <AddCategoryButton variant="icon" onClick={handleIsAdding}>
        <AddCategoryButtonInner>
          <AddIcon size={24} fill="#000" />
        </AddCategoryButtonInner>
      </AddCategoryButton>
    </div>
  )
}

AddCategory.propTypes = {
  onAddCat: PropTypes.func.isRequired,
}

export {AddCategory}
