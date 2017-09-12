import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Create an object to hold all errors and isValid property.
 * @function resolveErrors
 *
 * @param {object} errors - All validation errors
 *
 * @return {object} - An object containing errors and isValid property
 */
const resolveErrors = errors => ({
  errors,
  isValid: isEmpty(errors)
});

/**
 * A class to help validate all requests and posts made to the server.
 * @export Validator
 *
 * @class Validator
 */
export default class Validator {
  /**
   * Confirms validity of user signup data
   * @method validateSignUp
   *
   * @static
   *
   * @param {object} userData - Supplied user data
   *
   * @returns {object} - An object containing errors and isValid
   *
   * @memberof Validator
   */
  static validateSignUp({
    username, email, password, confirmPassword
  }) {
    this.errors = {};
    if (username === undefined || validator.isEmpty(username.toString())) {
      this.errors.username = 'username is required';
    }
    if (email === undefined || validator.isEmpty(email.toString())) {
      this.errors.email = 'email is required';
    } else if (!validator.isEmail(email.toString())) {
      this.errors.email = 'email is invalid';
    }
    if (password === undefined || validator.isEmpty(password.toString())) {
      this.errors.password = 'password is required';
    } else if (
      confirmPassword === undefined ||
      validator.isEmpty(confirmPassword.toString())
    ) {
      this.errors.password = 'confirmation password is required';
    } else if (password !== confirmPassword) {
      this.errors.password = "passwords don't match";
    }

    return resolveErrors(this.errors);
  }

  /**
   * Confirms the validity of user login data
   * @method validateSignIn
   *
   * @static
   *
   * @param {object} userData - An object containing user login data
   *
   * @returns {object} - An object containing errors and isValid
   *
   * @memberof Validator
   */
  static validateSignIn({
    identifier, password
  }) {
    this.errors = {};
    if (identifier === undefined || validator.isEmpty(identifier.toString())) {
      this.errors.identifier = 'email or username is required';
    }
    if (password === undefined || validator.isEmpty(password.toString())) {
      this.errors.password = 'password is required';
    }
    return resolveErrors(this.errors);
  }
}
