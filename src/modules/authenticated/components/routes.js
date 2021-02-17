import {Switch, Route, Redirect} from 'react-router-dom'
import {Overview} from '../../overview/overview'
import {Movements} from '../../movements/movements'

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Overview />
    </Route>
    <Route exact path="/movements">
      <Movements />
    </Route>
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>
)

export {Routes}
