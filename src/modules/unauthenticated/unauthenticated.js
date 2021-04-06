/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useForm} from 'react-hook-form'
import {useAuth} from 'context/auth'
import {
  Button,
  Big,
  Label,
  LabelText,
  Input,
  Form,
  FormError,
} from 'common-components'
import lgimg from './login-img.svg'

const Login = () => (
  <div
    css={css`
      gap: 4rem;
      display: flex;
      flex-basis: 40%;
      flex-direction: column;
    `}
  >
    <Big>Expense Manager</Big>
    <LoginForm />
  </div>
)

const LoginForm = () => {
  const {login} = useAuth()
  const {register, handleSubmit, errors} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = ({username, password}) => {
    login(username, password)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="username">
        <LabelText>username</LabelText>
        <Input
          id="username"
          type="email"
          name="username"
          placeholder="Usuario"
          autoComplete="off"
          ref={register({required: 'Debe ingresar un usuario'})}
        />
      </Label>
      {errors.username && <FormError>{errors.username.message}</FormError>}
      <Label htmlFor="password">
        <LabelText>password</LabelText>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Contraseña"
          ref={register({required: 'Debe ingresar la contraseña'})}
        />
      </Label>
      {errors.password && <FormError>{errors.password.message}</FormError>}
      <Button type="submit" variant="primary">
        Ingresar
      </Button>
    </Form>
  )
}

const Unauthenticated = () => (
  <div
    css={css`
      width: 100vw;
      height: 100vh;
      padding: 2rem;
    `}
  >
    <div
      css={css`
        gap: 1.5rem;
        display: flex;
        padding: 2rem;
        margin: 5rem auto;
        width: calc(100vw / 1.25);
        border-radius: var(--border-radius);
        background-color: var(--background-color-light);
      `}
    >
      <img
        src={lgimg}
        alt="login"
        css={css`
          height: auto;
          max-width: 60%;
        `}
      />
      <Login />
    </div>
  </div>
)

export {Unauthenticated}
