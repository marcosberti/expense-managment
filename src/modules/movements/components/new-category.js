import {useForm} from 'react-hook-form'
import {Button, FormError} from 'common-components'
import {Modal, ModalBackdrop, ModalForm, ModalTitle} from './modal'

const CategoryForm = () => {
  const {register, handleSubmit, errors} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = data => {
    console.log('data', data)
  }

  return (
    <ModalForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="categoria">categoria</label>
      <input
        id="categoria"
        name="categoria"
        type="text"
        placeholder="Categoría"
        ref={register({required: 'Debe ingresar el nombre de la categoría'})}
      />
      {errors.categoria && <FormError>{errors.categoria.message}</FormError>}
      <label htmlFor="icon">icono</label>
      <input
        id="icon"
        name="icon"
        type="text"
        placeholder="Icono"
        ref={register({required: 'Debe ingresar el ícono'})}
      />
      <label htmlFor="color">color</label>
      <input id="color" name="color" type="color" ref={register} />
      <Button type="submit">Guardar</Button>
    </ModalForm>
  )
}

const NewCategory = () => (
  <>
    <ModalBackdrop />
    <Modal>
      <ModalTitle>Nueva categoria</ModalTitle>
      <CategoryForm />
    </Modal>
  </>
)

export {NewCategory}
