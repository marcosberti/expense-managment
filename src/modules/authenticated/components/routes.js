import {Switch, Route, Redirect} from 'react-router-dom'
import {Overview} from '../../overview/overview'
import {Movements} from '../../movements/movements'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Overview} />
    <Route path="/movements" exact component={Movements} />
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>
)

export {Routes}
