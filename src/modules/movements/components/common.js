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
    <label htmlFor="firstPaymentDate">
      <LabelText>fecha primer pago</LabelText>
      <input
        id="firstPaymentDate"
        name="firstPaymentDate"
        type="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        ref={register({
          required: 'Campo obligatorio',
        })}
      />
    </label>
    <FormError message={errors?.firstPaymentDate?.message} />
    <label htmlFor="payments">
      <LabelText>cuotas</LabelText>
      <input
        id="payments"
        name="payments"
        type="number"
        step="3"
        min="0"
        placeholder="Cuotas"
        ref={register({required: 'Campo obligatorio'})}
      />
    </label>
    <FormError message={errors?.payments?.message} />
  </FormGroup>
)

FechaCuota.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

const FechaFijo = ({register, errors}) => (
  <>
    <FormGroup>
      <label htmlFor="activeDate">
        <LabelText>fecha activo</LabelText>
        <input
          id="activeDate"
          name="activeDate"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          ref={register({
            required: 'Campo obligatorio',
          })}
        />
      </label>
      <label htmlFor="inactiveDate">
        <LabelText>fecha inactivo</LabelText>
        <input
          id="inactiveDate"
          name="inactiveDate"
          type="date"
          ref={register}
        />
      </label>
    </FormGroup>
    <FormError message={errors?.activeDate?.message} />
  </>
)

FechaFijo.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
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
        <label htmlFor="amount">
          <LabelText>Monto</LabelText>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            placeholder="Monto"
            step="0.01"
            ref={register({required: 'Campo obligatorio'})}
          />
        </label>
        <label htmlFor="currency">
          <LabelText>Moneda</LabelText>
          <select
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
          </select>
        </label>
      </FormGroup>
      {exchangeNeeded && currency !== 'ars' && (
        <>
          <label htmlFor="exchange">
            <LabelText>Tipo de cambio</LabelText>
            <input
              id="exchange"
              name="exchange"
              type="number"
              min="0"
              placeholder="Tipo de cambio"
              step="0.01"
              ref={register({required: 'Campo obligatorio'})}
            />
          </label>
        </>
      )}
      <FormError message={errors?.amount?.message} />
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

export {FechaCuota, FechaFijo, ModalCategories, Montos}
