import PropTypes from 'prop-types'
import {FormGroup, FormError, LabelText} from 'common-components'

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

export {FechaCuota, FechaFijo}
