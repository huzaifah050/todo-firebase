import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from './store/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.signIn(this.state);
    this.setState({
      email: '',
      password: '',
    });
    this.props.history.push('/');
  };

  render() {
    // console.log(this.props);
    const { authError, auth } = this.props;
    // console.log(authError);

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <div className="header"> Log in</div>
        <form className="form" onSubmit={this.handleSubmit}>
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
        </form>
        <div className="error">{authError ? <p>{authError}</p> : null}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
});

const mapDispatchToProps = {
  signIn: signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
