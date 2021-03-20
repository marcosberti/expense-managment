/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useForm, useFieldArray} from 'react-hook-form'
import {useData} from 'context/data'
import {
  Button,
  Form,
  FormGroup,
  FormError,
  Modal,
  Title,
} from 'common-components'
import {AddIcon} from 'icons'
import {AddCategoryButton, AddCategoryButtonInner, ItemIcon} from './common'

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

const MovementCategories = ({fields, onAddCat}) => (
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
  </>
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
    const exist = Boolean(fields.find(f => f.nombre === catName))
    if (exist) {
      setError('categoria', {
        message: `Categoria ${catName} ya ha sido agregada`,
      })
      return
    }

    const categoria = categorias.find(c => c.nombre === catName)
    console.log('cat', categoria)
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
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <MovementCategories fields={fields} onAddCat={onAddCat} />
      {errors.categoria && <FormError>{errors.categoria.message}</FormError>}
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

const MovementModal = props => (
  <Modal
    modalProps={{
      '--category-size': '5rem',
      top: '0',
      right: '0',
      height: '100%',
      width: '400px',
      zIndex: '1',
    }}
    {...props}
  >
    <Title>Nuevo movimiento</Title>
    <MovementForm />
  </Modal>
)

export {MovementModal}
