import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin } from '../actions/index';
import '../Login.css';
import MyWallet from '../images/mywallet .png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toLocalStorage = this.toLocalStorage.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  toLocalStorage() {
    if (localStorage.getItem('transactions') === null) {
      localStorage.setItem('transactions', JSON.stringify([]));
    }
  }

  render() {
    const { login } = this.props;
    const { email, password } = this.state;
    const minPasswordLength = 6;
    return (
      <div className="alignLogin">
        <form className="loginForm">
          <img src={ MyWallet } className="money" alt="money" />
          <div>
            <h3 className="emailTitle">Email</h3>
            <input
              type="email"
              className="emailLogin"
              placeholder="Digite seu email"
              name="email"
              autoComplete="off"
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </div>
          <div>
            <h3 className="passwordTitle">Senha</h3>
            <input
              type="password"
              className="passwordLogin"
              placeholder="Digite sua senha"
              name="password"
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </div>
          <Link
            to="/carteira"
            onClick={ () => { login({ email }); this.toLocalStorage(); } }
          >
            <button
              type="submit"
              className="btn-login"
              disabled={
                !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
                || password.length < minPasswordLength
              }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
