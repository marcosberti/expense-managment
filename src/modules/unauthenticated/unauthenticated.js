import {useForm} from 'react-hook-form'
import {useAuth} from 'context/auth'

const Unauthenticated = () => {
  const {login} = useAuth()
  const {register, handleSubmit, errors} = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = ({username, password}) => {
    // login(username, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">
        username
        <input type="email" name="username" ref={register({required: true})} />
      </label>
      <label htmlFor="password">
        password
        <input
          type="password"
          name="password"
          ref={register({required: true})}
        />
      </label>
      <button type="submit">log</button>
    </form>
  )
}

export {Unauthenticated}
