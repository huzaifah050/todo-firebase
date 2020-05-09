import React from 'react';
import './App.css';
import Todos from './Todos';
import Navbar from './Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import EditTodo from './EditTodo';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Todos} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/edit/:id" component={EditTodo} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
