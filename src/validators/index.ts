import { body } from 'express-validator'

class UserValidator {
  checkCreateUser() {
    return [
      body('name').notEmpty().withMessage('The name value should not be empty'),
      body('email')
        .notEmpty()
        .withMessage('The email value should not be empty'),
      body('password')
        .notEmpty()
        .withMessage('The password value should not be empty'),
    ]
  }
}

export default new UserValidator()
