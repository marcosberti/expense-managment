import {useForm} from 'react-hook-form'
import {Button, FormError} from 'common-components'
import {useData} from 'context/data'
import {Modal, ModalBackdrop, ModalForm, ModalTitle} from './modal'

const CategoryForm = () => {
  const {addCategory} = useData()
  const {register, handleSubmit, errors} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = data => {
    addCategory(data)
  }

  return (
    <ModalForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="nombre">categoria</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Categoría"
        ref={register({required: 'Debe ingresar el nombre de la categoría'})}
      />
      {errors.nombre && <FormError>{errors.nombre.message}</FormError>}
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
