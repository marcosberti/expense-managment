/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useForm, useFieldArray} from 'react-hook-form'
import {Button, FormGroup, FormError} from 'common-components'
import {useData} from 'context/data'
import {AddIcon} from 'icons'
import {AddCategoryButton, AddCategoryButtonInner, ItemIcon} from './common'
import {Modal, ModalBackdrop, ModalForm, ModalTitle, ModalMenu} from './modal'

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
    setIsAdding(true)
  }

  const listener = React.useCallback(e => {
    e.preventDefault()
    const {id} = e.target
    if (!id.includes('add-category')) {
      setIsAdding(false)
    }
  }, [])

  React.useEffect(() => {
    if (isAdding) {
      document.addEventListener('click', listener)
    } else {
      document.removeEventListener('click', listener)
    }
  }, [isAdding, listener])

  const cat = categorias.map(c => c.nombre)

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {isAdding && (
        <ModalMenu
          id="add-category"
          options={cat}
          handleOption={handleAddCategory}
          top="1rem"
          left="1rem"
        />
      )}
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

const MovementCategories = ({fields, onAddCat}) => (
  <ul
    css={css`
      gap: 0.25rem;
      display: flex;
    `}
  >
    {fields.map(f => (
      <li
        key={f.nombre}
        css={css`
          width: var(--category-size);
          height: var(--category-size);
        `}
      >
        <ItemIcon
          icon={f.icon}
          size={32}
          description={f.nombre}
          color={f.color}
        />
      </li>
    ))}
    <AddCategory onAddCat={onAddCat} />
  </ul>
)

MovementCategories.propTypes = {
  fields: PropTypes.array.isRequired,
  onAddCat: PropTypes.func.isRequired,
}

const MovementForm = () => {
  const {categorias} = useData()
  const {
    register,
    handleSubmit,
    errors,
    control,
    setError,
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
  })

  const {fields, append} = useFieldArray({
    control,
    name: 'categorias',
  })

  const onAddCat = catName => {
    const categoria = categorias.find(c => c.nombre === catName)
    const exist = Boolean(fields.find(f => f.nombre === categoria.nombre))
    if (exist) {
      setError('categoria', {
        message: `Categoria ${categoria.nombre} ya ha sido agregada`,
      })
      return
    }
    append(categoria)
    clearErrors('categoria')
  }

  const onSubmit = data => {
    if (!fields.length) {
      setError('categoria', {message: 'Debe haber al menos una categoria'})
      return
    }
    console.log('data', data, fields)
  }

  return (
    <ModalForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="detalle">detalle</label>
      <input
        id="detalle"
        name="detalle"
        type="text"
        placeholder="Detalle"
        ref={register({required: 'Debe ingresar un detalle'})}
      />
      {errors.detalle && <FormError>{errors.detalle.message}</FormError>}
      <FormGroup>
        <label htmlFor="tipo">tipo de movimiento</label>
        <select name="tipo" id="tipo" ref={register}>
          <option value="egreso">Egreso</option>
          <option value="ingreso">Ingreso</option>
        </select>
        <label htmlFor="fecha">fecha</label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          ref={register({required: 'Debe ingresar la fecha'})}
        />
      </FormGroup>
      {errors.fecha && <FormError>{errors.fecha.message}</FormError>}
      <FormGroup>
        <label htmlFor="monto">Monto</label>
        <input
          id="monto"
          name="monto"
          type="number"
          min="0"
          placeholder="Monto"
          ref={register({required: 'Debe ingresar el monto'})}
        />
        <label htmlFor="moneda">Moneda</label>
        <select name="moneda" id="moneda" ref={register}>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
        </select>
      </FormGroup>
      {errors.monto && <FormError>{errors.monto.message}</FormError>}
      <p>Categorias</p>
      <MovementCategories fields={fields} onAddCat={onAddCat} />
      {errors.categoria && <FormError>{errors.categoria.message}</FormError>}
      <Button type="submit">Guardar</Button>
    </ModalForm>
  )
}

const NewMovement = () => (
  <>
    <ModalBackdrop />
    <Modal
      css={css`
        --category-size: 5rem;
      `}
    >
      <ModalTitle>Nuevo movimiento</ModalTitle>
      <MovementForm />
    </Modal>
  </>
)

export {NewMovement}
