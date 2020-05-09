import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

export class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //you can fetch the todo item from the props and populate here,
      //but you need to first check if the todo value is available
      todo:
        this.props.requested === true && this.props.todo.todo
          ? this.props.todo.todo
          : ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //  this.props.addTodo(this.state);
    //  this.setState({
    //    todo: '',
    //  });
  };

  render() {
    const { todo } = this.props;
    console.log(todo);
    console.log(this.props);
    return (
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;

  return {
    todo: state.firestore.ordered.todos
      ? state.firestore.ordered.todos.find((todo) => todo.id === id)
      : null,
    // this prop exist on the firestore reducer
    // helps you to check whether the items are fully loaded or not
    requested: state.firestore.status.requested.todos,
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todos" }])
)(EditTodo);
