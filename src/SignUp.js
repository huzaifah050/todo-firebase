import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from './store/authActions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
    this.setState({
      name: '',
      email: '',
      password: '',
    });
    this.props.history.push('/');
  };

  render() {
    const { auth, error } = this.props;
    // console.log(auth);
    // console.log(this.props);

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <div className="header"> SignUp</div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="">
            <input
              type="text"
              id="name"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <input
              type="email"
              id="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <input
              type="password"
              id="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
          <div className="">{error ? <p>{error}</p> : null}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  error: state.auth.authError,
});

const mapDispatchToProps = {
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
