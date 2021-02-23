import ReactDOM from 'react-dom'
import {Providers} from './context'
import {App} from './app'

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
)
