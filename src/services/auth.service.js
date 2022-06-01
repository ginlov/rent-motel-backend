import db from '../helpers/db.js';

export const login = async (userData) => {};

export const register = async (userData) => {
  try {
    const User = await db.User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!User) {
      return await db.User.create(userData);
    } else {
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
