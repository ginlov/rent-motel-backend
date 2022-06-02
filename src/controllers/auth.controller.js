import { HttpStatus, Role } from '../common/constants.js';
import * as authService from '../services/auth.service.js';
import i18n from 'i18n';
import _ from 'lodash';

export const login = (req, res, next) => {
  res.send({});
  next();
};

export const register = async (req, res, next) => {
  const userData = _.pick(req.body, ['email', 'password', 'phone']);
  userData.role = Role.USER;

  try {
    await authService.register(userData);
    res.status(HttpStatus.CREATED).send({
      code: HttpStatus.CREATED,
      message: res.__('register.success'),
      data: {},
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).send({
      errors: [
        {
          code: HttpStatus.CONFLICT,
          message: res.__('register.error.emailExist'),
        },
      ],
    });
  }

  next();
};
