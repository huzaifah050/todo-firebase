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
      todo: this.props.todo ? this.props.todo : "",
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
  return {
    todo: state.project.editTodoItem.todo,
    item: state.project
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todos" }])
)(EditTodo);
