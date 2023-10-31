import {
  createUserService,
  loginUserService,
  searchUserService,
  updateUserService,
  deleteUserService,
  getUserService,
} from "../services/userService.js";

export const userController = (req, res) => {
  res.send("user page");
};

export const profileUserController = (req, res) => {
  try {
    const response = req.body;
    if (response) {
      return res.json(response);
    }
  } catch (err) {
    return res.json({
      status: "401",
      message: "You are not Authorized",
    });
  }
};
export const searchUserController = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = await searchUserService(name);
      return res.json(response);
    }
  } catch (err) {
    return res.json({
      status: "err",
      message: err,
    });
  }
};
export const createUserController = async (req, res) => {
  const { email, password, name } = req.body;
  if (email && password && name) {
    const response = await createUserService({ email, password, name });
    return res.json(response);
  } else {
    return res.json({
      status: "err",
      message: "The email, password, name is require",
    });
  }
};
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const response = await loginUserService({ email, password });
    res.cookie('token', response.content.access_token).json(response)
  } else {
    return res.json({
      status: 400,
      message: "The email and password is require",
    });
  }
};
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (id) {
      const response = await updateUserService(id, data);
      if (response) {
        return res.json(response);
      } else {
        return res.json({
          status: 400,
          message: "The server is problem",
        });
      }
    } else {
      return res.json({
        status: 401,
        message: "The id of user is required",
      });
    }
  } catch (error) {
    return res.json({
      status: 400,
      message: error,
    });
  }
};
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const response = await deleteUserService(id);
      return res.status(200).json(response);
    } else {
      return res.status(200).json({
        status: "err",
        message: "The id is required",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "err",
      message: error,
    });
  }
};
export const getUserController = async (req, res) => {
  try {
    const response = await getUserService();
    return res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error,
    });
  }
};
export const uploadImageAvatar = async (req, res) => {
  const uploadImage = []
  for (let i = 0; i < req.files.length; i++) {
    const { path } = req.files[i]
    uploadImage.push(path);
  }
  console.log(uploadImage);
  // res.status(200).json({
  //   message: 'upload success',
  //   content: uploadImages
  // })
}