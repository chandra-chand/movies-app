import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import MoviesHome from './components/MoviesHome'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={MoviesHome} />
  </Switch>
)

export default App
