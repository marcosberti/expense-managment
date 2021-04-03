import {Switch, Route, Redirect} from 'react-router-dom'
import {ModalProvider} from 'context/modal'
import {MutateProvider} from 'context/mutate'
import {Overview} from '../../overview/overview'
import {Movements} from '../../movements/movements'
import {Expenses} from '../../expenses/expenses'

const MovementProvider = () => (
  <ModalProvider>
    <MutateProvider>
      <Movements />
    </MutateProvider>
  </ModalProvider>
)

const ExpensesProvider = () => (
  <ModalProvider>
    <MutateProvider>
      <Expenses />
    </MutateProvider>
  </ModalProvider>
)

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Overview} />
    <Route path="/movements" exact component={MovementProvider} />
    <Route path="/expenses" exact component={ExpensesProvider} />
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>
)

export {Routes}
