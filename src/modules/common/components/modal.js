/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {useFieldArray, useFormContext} from 'react-hook-form'
import {useData} from 'context/data'
import {AddIcon} from 'icons'
import {
  Button,
  FormGroup,
  FormError,
  Input,
  Label,
  Select,
  Small,
  LabelText,
} from './styled'
import {ItemIcon} from './list'

const ModalBackdrop = styled.button`
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  position: absolute;
  ${({noBackground = false}) =>
    noBackground
      ? {opacity: 0}
      : {
          backgroundColor: 'var(--text-color)',
          opacity: '0.25',
        }}
`

const Modal = ({
  isOpen,
  onClose,
  withBackdrop = true,
  modalProps,
  children,
}) => {
  const handleClose = () => {
    onClose()
  }

  return isOpen ? (
    <>
      {withBackdrop && <ModalBackdrop onClick={handleClose} />}
      <div
        css={css`
          padding: 2rem;
          position: absolute;
          border-radius: var(--border-radius);
          background-color: var(--background-color-light);
          ${modalProps}
        `}
      >
        {children}
      </div>
    </>
  ) : null
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  withBackdrop: PropTypes.bool,
  modalProps: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
}

const Montos = () => {
  const {register, errors, watch, exchangeNeeded} = useFormContext()

  const {
    options: [{currencies}],
  } = useData()
  const currency = watch('currency', currencies[0])

  return (
    <>
      <FormGroup>
        <Label htmlFor="amount">
          <LabelText>Monto</LabelText>
          <Input
            id="amount"
            name="amount"
            type="number"
            min="0"
            placeholder="Monto"
            step="0.01"
            ref={register({required: 'Campo obligatorio'})}
          />
        </Label>
        <Label htmlFor="currency">
          <LabelText>Moneda</LabelText>
          <Select
            id="currency"
            name="currency"
            defaultValue={currencies[0]}
            ref={register}
          >
            {currencies.map(curr => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </Select>
        </Label>
      </FormGroup>
      <FormError message={errors?.amount?.message} />
      {exchangeNeeded && currency !== 'ars' && (
        <>
          <Label htmlFor="exchange">
            <LabelText>Tipo de cambio</LabelText>
            <Input
              id="exchange"
              name="exchange"
              type="number"
              min="0"
              placeholder="Tipo de cambio"
              step="0.01"
              ref={register({required: 'Campo obligatorio'})}
            />
          </Label>
          <FormError message={errors?.exchange?.message} />
        </>
      )}
    </>
  )
}

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
  const {categories} = useData()
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
          {categories.map(c => (
            <li key={c.name}>
              <Button
                variant="modal"
                onClick={handleAddCategory}
                data-value={c.name}
              >
                <Small>{c.name}</Small>
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

const ModalCategories = () => {
  const {categories} = useData()
  const {catRef, control, setError, clearErrors} = useFormContext()
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'categories',
  })

  const onAddCat = catName => {
    const exist = Boolean(fields.find(f => f.name === catName))
    if (exist) {
      setError('category', {
        message: `Categoria ${catName} ya ha sido agregada`,
      })
      return
    }

    const {id, ...category} = categories.find(c => c.name === catName)
    append(category)
    clearErrors('category')
  }

  React.useEffect(() => {
    remove()
    if (catRef?.length) {
      append(catRef)
    }
  }, [remove, catRef, append])

  return (
    <>
      <p>Categorias</p>
      <ul
        css={css`
          gap: 0.25rem;
          display: flex;
        `}
      >
        {fields.map(f => (
          <li
            key={f.name}
            css={css`
              width: var(--category-size);
              height: var(--category-size);
            `}
          >
            <ItemIcon
              icon={f.icon}
              size={32}
              description={f.name}
              color={f.color}
            />
          </li>
        ))}
        <AddCategory onAddCat={onAddCat} />
      </ul>
    </>
  )
}

export {Montos, ModalCategories}

export {Modal, ModalBackdrop}
