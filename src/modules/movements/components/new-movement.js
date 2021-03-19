/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useForm, useFieldArray} from 'react-hook-form'
import {
  Button,
  MovementForm as Form,
  FormGroup,
  FormError,
  Small,
} from 'common-components'
import {AddIcon, RentIcon, FitnessIcon, SchoolIcon} from 'icons'
import {
  AddCategoryButton,
  AddCategoryButtonInner,
  CategoriesWrapper,
  ItemIcon,
  MovementTitle,
} from './common'

const categorias = [
  {
    name: 'Alquiler',
    icon: RentIcon,
  },
  {name: 'Deporte', icon: FitnessIcon},
  {name: 'Cursos', icon: SchoolIcon},
]

const Categories = ({handleAddCategory}) => (
  <CategoriesWrapper>
    <ul>
      {categorias.map((c, i) => (
        <li key={c.name}>
          <Button
            id={`add-category-${c.name}`}
            variant="category"
            onClick={handleAddCategory}
            data-cat-index={i}
          >
            <Small>{c.name}</Small>
          </Button>
        </li>
      ))}
    </ul>
  </CategoriesWrapper>
)

Categories.propTypes = {
  handleAddCategory: PropTypes.func.isRequired,
}

const AddCategory = ({onAddCat}) => {
  const [isAdding, setIsAdding] = React.useState(false)

  const handleAddCategory = e => {
    e.preventDefault()
    const {catIndex} = e.currentTarget.dataset
    onAddCat(catIndex)
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

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {isAdding && <Categories handleAddCategory={handleAddCategory} />}
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
        key={f.name}
        css={css`
          width: var(--category-size);
          height: var(--category-size);
        `}
      >
        <ItemIcon icon={f.icon} size={32} description={f.name} />
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

  const onAddCat = catIndex => {
    const {name, icon} = categorias[catIndex]
    const exist = Boolean(fields.find(f => f.name === name))
    if (exist) {
      setError('categoria', {message: `Categoria ${name} ya ha sido agregada`})
      return
    }
    append({name, icon})
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
      <p>Categorias</p>
      <MovementCategories fields={fields} onAddCat={onAddCat} />
      {errors.categoria && <FormError>{errors.categoria.message}</FormError>}
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

const NewMovement = () => (
  <div
    css={css`
      --category-size: 5rem;

      height: 100%;
      padding: 2rem;
      max-width: 400px;
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);
    `}
  >
    <MovementTitle>Nuevo movimiento</MovementTitle>
    <MovementForm />
  </div>
)

export {NewMovement}
