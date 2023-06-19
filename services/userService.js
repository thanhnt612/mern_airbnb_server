import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";

//Process API
export const createUserService = ({ email, password, name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
      if (isEmail) {
        const isCheckEmail = await User.find({ email: email });
        const isCheckName = await User.find({ name: name });
        if (isCheckEmail.length || isCheckName.length) {
          resolve({
            status: 400,
            message: "The name or user nam is existed",
          });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          email,
          name,
          password: hashPassword,
        });
        resolve({
          status: 200,
          message: "Sign Up Success !!!",
          content: {
            email: newUser.email,
            name: newUser.name,
          },
        });
      } else {
        resolve({
          status: 400,
          message: "user name is not a email",
        });
      }
    } catch (error) {
      reject({
        message: error,
        status: 400,
      });
    }
  }).catch((e) => console.log(e));
};

export const loginUserService = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
      if (isEmail) {
        const useDb = await User.find({ email: email });
        if (useDb) {
          const checkPassword = bcrypt.compareSync(password, useDb[0].password);
          if (checkPassword) {
            resolve({
              status: 200,
              message: "Login successfully",
              content: {
                email: useDb[0].email,
                name: useDb[0].name,
                _id: useDb[0]._id,
                password: useDb[0].password,
              },
            });
          }
          resolve({
            status: 402,
            message: "The user name or password is wrong",
          })
        } else {
          resolve({
            status: 401,
            message: "the user name is not existed",
          });
        }
      } else {
        resolve({
          status: 402,
          message: "user name is not a email",
        });
      }
    } catch (error) {
      reject({
        message: error,
        status: 400,
      });
    }
  }).catch((e) => console.log(e));
};

export const getDetailUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findById(userId);
      if (findUser) {
        resolve({
          status: 200,
          data: findUser,
        });
      }
      resolve({
        status: 204,
        message: "FindUser is not defined",
      });
    } catch (err) {
      reject({
        message: err,
        status: 400,
      });
    }
  }).catch((e) => console.log(e));
};

export const searchUserService = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findName = await User.find({ name });
      if (findName) {
        resolve({
          status: 200,
          data: findName,
        });
      }
      resolve({
        status: 204,
        message: "The user is not defined",
      });
    } catch (err) {
      console.log(err);
      reject({
        message: err,
        status: 400,
      });
    }
  }).catch((e) => console.log(e));
};

export const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne(data);
      if (checkUser) {
        resolve({
          status: 204,
          message: "The user is duplicate",
        });
      }
      const findUser = await User.findById(id);
      findUser.name = data.name;
      findUser.password = data.password;
      await findUser.save();
      if (findUser) {
        resolve({
          status: 200,
          message: "Updated successfully",
          content: findUser,
        });
      } else {
        resolve({
          status: 204,
          message: "The user is not defined",
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        status: 400,
        massage: error,
      });
    }
  }).catch((e) => console.log(e));
};

export const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteUser = await User.findByIdAndDelete(id);
      if (deleteUser) {
        resolve({
          status: 200,
          message: "Deleted successfully ",
        });
      } else {
        resolve({
          status: 204,
          message: "The user is not defined",
        });
      }
    } catch (error) {
      reject({
        status: 400,
        massage: error,
      });
    }
  }).catch((e) => console.log(e));
};

export const getUserService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAllUser = await User.find();
      resolve({
        status: "OK",
        data: getAllUser,
      });
    } catch (error) {
      reject({
        status: 400,
        message: error,
      });
    }
  });
};