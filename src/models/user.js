import { DataTypes } from 'sequelize';

import { Gender } from '../common/constants.js';

const User = (sequelize) => {
  return sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(Object.keys(Gender)),
      },
      birthday: {
        type: DataTypes.DATE,
      },
      address_id: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true },
  );
};

export default User;
