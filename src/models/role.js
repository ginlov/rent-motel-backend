import { DataTypes } from 'sequelize';

const Role = (sequelize) => {
  return sequelize.define(
    'role',
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
        type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
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

export default Role;
