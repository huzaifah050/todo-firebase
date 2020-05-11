import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

export class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
 edit-page-display-loader-everytime
      gg: false,
      todo: ""

      //you can fetch the todo item from the props and populate here,
      //but you need to first check if the todo value is available
      todo: this.props.todo ? this.props.todo : "",
 master
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
    const { todo, requesting, requested } = this.props;
    console.log("props", this.props);
    console.log("state", this.state);

    const jsx = (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="">
          <input
            type="text"
            id="todo"
            value={this.state.todo.todo}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );

    if (!this.props.location.pathname) {
      return jsx;
    } else {
      if (requesting === true) {
        return <p>Loading...</p>;
      }
      if (requested === true && !todo) {
        return <p>Nothing here</p>;
      }
      if (requested === true && todo && !this.state.gg) {
        this.setState({ todo: todo, gg: true });
      }
      if (this.state.gg) {
        return jsx;
      }
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
 edit-page-display-loader-everytime
    todo: state.firestore.ordered.todos
      ? state.firestore.ordered.todos.find((todo) => todo.id === id)
      : null,
    // this prop exist on the firestore reducer
    // helps you to check whether the items are fully loaded or not
    requesting: state.firestore.status.requesting.todos,
    requested: state.firestore.status.requested.todos,

    todo: state.project.editTodoItem.todo,
    item: state.project
 master
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todos" }])
)(EditTodo);
