import PropTypes from 'prop-types'
import {FormGroup, FormError, Label, LabelText, Input} from 'common-components'

const FechaCuota = ({register, errors}) => (
  <FormGroup>
    <Label htmlFor="firstPaymentDate">
      <LabelText>fecha primer pago</LabelText>
      <Input
        id="firstPaymentDate"
        name="firstPaymentDate"
        type="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        ref={register({
          required: 'Campo obligatorio',
        })}
      />
    </Label>
    <FormError message={errors?.firstPaymentDate?.message} />
    <Label htmlFor="payments">
      <LabelText>cuotas</LabelText>
      <Input
        id="payments"
        name="payments"
        type="number"
        step="3"
        min="0"
        placeholder="Cuotas"
        ref={register({required: 'Campo obligatorio'})}
      />
    </Label>
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
      <Label htmlFor="activeDate">
        <LabelText>fecha activo</LabelText>
        <Input
          id="activeDate"
          name="activeDate"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          ref={register({
            required: 'Campo obligatorio',
          })}
        />
      </Label>
      <Label htmlFor="inactiveDate">
        <LabelText>fecha inactivo</LabelText>
        <Input
          id="inactiveDate"
          name="inactiveDate"
          type="date"
          ref={register}
        />
      </Label>
    </FormGroup>
    <FormError message={errors?.activeDate?.message} />
  </>
)

FechaFijo.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

export {FechaCuota, FechaFijo}
