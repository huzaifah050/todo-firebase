import React, { Component } from "react";
import { addTodo, deleteTodo, dispatchEditTodo } from "./store/actions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state);
    this.setState({
      todo: "",
    });
  };

  handleDispatchEdit = (id) => {
    this.props.dispatchEditId(id);
    return <Redirect to={`/edit/${id}`} />;
  };

  render() {
    // console.log(this.props);
    const { todos, auth, deleteTodo } = this.props;
    // console.log(todos);

    if (!auth.uid) return <Redirect to="/signin" />;

    const todo = todos
      ? todos.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              {todo.todo}
              <br />
              <hr />
              <p className="creator">Created by, {todo.name}</p>
              <p className="creator">
                Created at:
                {moment(todo.createdAt.toDate().toString()).calendar()}
              </p>
            </div>
          );
        })
      : "loading...";

    const personalTodos = todos
      ? todos.map((todo) => {
          if (auth.uid === todo.uid) {
            return (
              <div className="todo" key={todo.id}>
                {todo.todo}
                <br />
                <hr />
                <p className="creator">
                  Created at:
                  {moment(todo.createdAt.toDate().toString()).calendar()}
                </p>
                <div className="buttons">
                  <button
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                    className="delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      this.props.dispatchEditTodo(todo);
                      return this.props.history.push(`/edit/${todo.id}`);
                    }}
                    className="edit"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      : null;

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="">
            <input
              type="text"
              id="todo"
              value={this.state.todo}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="container">
          <div className="col">
            <div className="header">General Todo</div>

            {todo}
          </div>
          <div className="col">
            <div className="header">Personal Todo</div>

            {personalTodos}
          </div>
          <div className="notifications col">
            <div className="header">Notifications</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  // console.log(state.auth);
  // console.log(state.firebase.profile.name);
  return {
    todos: state.firestore.ordered.todos,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  dispatchEditTodo,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todos" }])
)(Todos);
