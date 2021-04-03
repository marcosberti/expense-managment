/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useForm} from 'react-hook-form'
import {useModal} from 'context/modal'
import {
  Button,
  Form,
  FormGroup,
  FormError,
  LabelText,
  Title,
  Modal,
} from 'common-components'
import {useMutate} from 'context/mutate'

const CategoryForm = () => {
  const {addCategory} = useMutate()
  const {register, handleSubmit, errors} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = data => {
    addCategory(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        <LabelText>categoria</LabelText>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Categoría"
          autoComplete="off"
          ref={register({required: 'Debe ingresar el nombre de la categoría'})}
        />
      </label>
      <FormError message={errors.name?.message} />
      <FormGroup>
        <label
          htmlFor="icon"
          css={css`
            flex-basis: 75%;
          `}
        >
          <LabelText>icono</LabelText>
          <input
            id="icon"
            name="icon"
            type="text"
            placeholder="Icono"
            autoComplete="off"
            ref={register({required: 'Debe ingresar el ícono'})}
          />
        </label>
        <label
          htmlFor="color"
          css={css`
            flex-basis: 25%;
          `}
        >
          <LabelText>color</LabelText>
          <input id="color" name="color" type="color" ref={register} />
        </label>
      </FormGroup>
      <FormError message={errors.icon?.message} />
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

const CategoryModal = () => {
  const {isCategoryOpen, onModal} = useModal()

  return (
    <Modal
      modalProps={{
        top: '0',
        right: '0',
        height: '100%',
        width: '400px',
        zIndex: '1',
      }}
      isOpen={isCategoryOpen}
      onClose={onModal}
    >
      <Title>Nueva categoria</Title>
      <CategoryForm />
    </Modal>
  )
}

export {CategoryModal}
