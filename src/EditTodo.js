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
      gg:false,
      todo: ""
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
    console.log('props',this.props);
    console.log('state',this.state);

    if (requesting === true) {
      return <p>Loading...</p>
    }
    if (requested === true && !todo) {
      return <p>Nothing here</p>
    }
    if (requested === true && todo && !this.state.gg){
      this.setState({todo: todo, gg: true})
    } 
    if(this.state.gg){
    return (
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
    }
    return null
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
    requesting: state.firestore.status.requesting.todos,
    requested: state.firestore.status.requested.todos,
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "todos" }])
)(EditTodo);
