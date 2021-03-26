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
  Modal,
  FormGroup,
  FormError,
  LabelText,
  ItemIcon,
  Small,
} from 'common-components'

const FechaCuota = ({register, errors}) => (
  <FormGroup>
    <label htmlFor="fechaPrimerPago">
      <LabelText>fecha primer pago</LabelText>
      <input
        id="fechaPrimerPago"
        name="fechaPrimerPago"
        type="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        ref={register({
          required: 'Campo obligatorio',
        })}
      />
    </label>
    <FormError message={errors?.fechaPrimerPago?.message} />
    <label htmlFor="cuotas">
      <LabelText>cuotas</LabelText>
      <input
        id="cuotas"
        name="cuotas"
        type="number"
        step="3"
        min="0"
        placeholder="Cuotas"
        ref={register({required: 'Campo obligatorio'})}
      />
    </label>
    <FormError message={errors?.cuotas?.message} />
  </FormGroup>
)

FechaCuota.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

const FechaFijo = ({register, errors}) => (
  <>
    <FormGroup>
      <label htmlFor="fechaActivo">
        <LabelText>fecha activo</LabelText>
        <input
          id="fechaActivo"
          name="fechaActivo"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          ref={register({
            required: 'Campo obligatorio',
          })}
        />
      </label>
      <label htmlFor="fechaInactivo">
        <LabelText>fecha inactivo</LabelText>
        <input
          id="fechaInactivo"
          name="fechaInactivo"
          type="date"
          ref={register}
        />
      </label>
    </FormGroup>
    <FormError message={errors?.fechaActivo?.message} />
  </>
)

FechaFijo.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

const Montos = () => {
  const {register, errors} = useFormContext()

  const {
    opciones: {monedas},
  } = useData()

  return (
    <>
      <FormGroup>
        <label htmlFor="monto">
          <LabelText>Monto</LabelText>
          <input
            id="monto"
            name="monto"
            type="number"
            min="0"
            placeholder="Monto"
            step="0.01"
            ref={register({required: 'Campo obligatorio'})}
          />
        </label>
        <label htmlFor="moneda">
          <LabelText>Moneda</LabelText>
          <select
            id="moneda"
            name="moneda"
            defaultValue={monedas[0]}
            ref={register}
          >
            {monedas.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
      </FormGroup>
      <FormError message={errors?.monto?.message} />
    </>
  )
}

// Montos.propTypes = {
//   register: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   monedas: PropTypes.array.isRequired,
// }

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
                <Small>{c.nombre}</Small>
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
  const {categorias} = useData()
  const {catRef, control, setError, clearErrors} = useFormContext()
  const {fields, append, remove} = useFieldArray({
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
    append(categoria)
    clearErrors('categoria')
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
}

// ModalCategories.propTypes = {
//   control: PropTypes.object.isRequired,
//   setError: PropTypes.func.isRequired,
//   clearErrors: PropTypes.func.isRequired,
// }

export {FechaCuota, FechaFijo, ModalCategories, Montos}
