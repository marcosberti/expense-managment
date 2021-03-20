import {useForm} from 'react-hook-form'
import {Button, Form, FormError, Title, Modal} from 'common-components'
import {useData} from 'context/data'

const CategoryForm = () => {
  const {addCategory} = useData()
  const {register, handleSubmit, errors} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = data => {
    addCategory(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="nombre">categoria</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Categoría"
        autoComplete="off"
        ref={register({required: 'Debe ingresar el nombre de la categoría'})}
      />
      {errors.nombre && <FormError>{errors.nombre.message}</FormError>}
      <label htmlFor="icon">icono</label>
      <input
        id="icon"
        name="icon"
        type="text"
        placeholder="Icono"
        autoComplete="off"
        ref={register({required: 'Debe ingresar el ícono'})}
      />
      <label htmlFor="color">color</label>
      <input id="color" name="color" type="color" ref={register} />
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

const CategoryModal = props => (
  <Modal
    modalProps={{
      top: '0',
      right: '0',
      height: '100%',
      width: '400px',
      zIndex: '1',
    }}
    {...props}
  >
    <Title>Nueva categoria</Title>
    <CategoryForm />
  </Modal>
)

export {CategoryModal}
