import { User } from "../model/UserModel.js";
import { Avatar } from "../model/AvatarModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generalAccessToken = (data) => {
  const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
  return access_token
};

const generalRefreshToken = (data) => {
  const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
  return refresh_token
};
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
          message: "Email is not a email",
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
        if (useDb == "") {
          resolve({
            status: 401,
            message: "Email is not existed",
          })
        } else if (useDb) {
          const checkPassword = bcrypt.compareSync(password, useDb[0].password);
          if (checkPassword) {
            const access_token = generalAccessToken({
              isAdmin: useDb[0].isAdmin,
              _id: useDb[0]._id,
              email: useDb[0].email,
              name: useDb[0].name,
            });
            const refresh_token = generalRefreshToken({
              _id: useDb[0]._id,
            });
            resolve({
              status: 200,
              message: "Login successfully",
              content: {
                access_token,
                refresh_token
              },
            });
          } else {
            resolve({
              status: 402,
              message: "Email or password is wrong",
            })
          }
        }
      } else {
        resolve({
          status: 402,
          message: "Email is not a email",
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

export const refreshTokenService = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userData) => {
        if (err) {
          return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
          const { _id, email, name, isAdmin } = await User.findById(userData._id);
          const access_token = generalAccessToken({
            _id, email, name, isAdmin
          })
          resolve({
            status: 200,
            message: "New Access Token",
            content: {
              access_token,
            },
          });
        }
      })
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

export const profileAvatarService = (profileId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findAvatar = await Avatar.find({ "profile": profileId });
      if (findAvatar) {
        resolve({
          status: 200,
          content: findAvatar,
        });
      }
      resolve({
        status: 204,
        message: "User is not defined",
      });
    } catch (err) {
      reject({
        message: err,
        status: 400,
      });
    }
  }).catch((e) => console.log(e));
}

export const createAvatarService = ({ profile, avatar }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (profile) {
        const avatarCreate = await Avatar.create({
          profile, avatar
        })
        const findAvatar = await Avatar.find({ "profile": profile });
        if (findAvatar.length <= 1) {
          resolve({
            status: 200,
            message: "Upload Avatar Success",
            data: {
              avatarCreate
            }
          })
        } else {
          findAvatar[0].avatar = avatarCreate.avatar
          await findAvatar[0].save()
          await Avatar.findByIdAndDelete(avatarCreate._id)
          if (findAvatar[0]) {
            resolve({
              status: 200,
              message: "Updated successfully",
              data: findAvatar[0],
            });
          } else {
            resolve({
              status: 204,
              message: "The avatar is not defined",
            });
          }
        }
      }
      else {
        resolve({
          status: 402,
          message: "please login to your account",
        })
      }
    } catch (error) {
      reject({
        message: error,
        status: 403,
      });
    }
  }).catch((e) => console.log(e));
}