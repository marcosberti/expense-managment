/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useForm} from 'react-hook-form'
import {useAuth} from 'context/auth'
import {Button, Big, Input, Label, FormError} from 'common-components'
import lgimg from './login-img.svg'

const Login = () => (
  <div
    css={css`
      flex-basis: 40%;
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        gap: 1rem;
        display: flex;
        flex-direction: column;
        margin-top: 4rem;
      `}
    >
      <Label htmlFor="username">username</Label>
      <Input
        id="username"
        type="email"
        name="username"
        placeholder="Usuario"
        autoComplete="off"
        ref={register({required: 'Debe ingresar un usuario'})}
      />
      {errors.username && <FormError>{errors.username.message}</FormError>}
      <Label htmlFor="password">password</Label>
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="Contraseña"
        ref={register({required: 'Debe ingresar la contraseña'})}
      />
      {errors.password && <FormError>{errors.password.message}</FormError>}
      <Button type="submit" variant="primary">
        Ingresar
      </Button>
    </form>
  )
}

const Unauthenticated = () => (
  <div
    css={css`
      padding: 2rem;
      width: 100vw;
      height: 100vh;
    `}
  >
    <div
      css={css`
        gap: 1.5rem;
        display: flex;
        padding: 2rem;
        width: calc(100vw / 1.25);
        margin: 5rem auto;
        border-radius: var(--border-radius);
        background-color: var(--background-color-light);
      `}
    >
      <img
        src={lgimg}
        alt="login"
        css={css`
          max-width: 60%;
          height: auto;
        `}
      />
      <Login />
    </div>
  </div>
)

export {Unauthenticated}
