import {
  createUserService,
  loginUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  refreshTokenService,
  profileAvatarService,
  updateAvatarService,
  verifyAccountService,
  createTokenVerifyService,
  forgotPasswordService,
  resetPasswordService,
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
      status: 400,
      message: "You are not Authorized",
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
    if (response.content == undefined) {
      res.json(response)
    } else {
      res.cookie('refreshToken', response.content.refresh_token, {
        secure: true,
        httpOnly: true,
        sameSite: 'None',
        maxAge: 60 * 24 * 60 * 60 * 1000
      }).json({
        status: 200,
        accessToken: response.content.access_token
      })
    }
  } else {
    return res.json({
      status: 400,
      message: "The email and password is require",
    });
  }
};
export const logoutUserController = (req, res) => {
  res.cookie('refreshToken', '', {}).json({ message: "You are logout", logOut: true })
};
export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    const response = await refreshTokenService(refreshToken);
    if (response.content == undefined) {
      res.json(response)
    } else {
      res.json(response.content.access_token)
    }
  } else {
    return res.status(406).json({ message: 'Unauthorized' });
  }
}
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
      return res.status(400).json({
        message: "The id is required",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
export const getUserController = async (req, res) => {
  try {
    const response = await getUserService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error,
    });
  }
};
export const createAvatarController = async (req, res) => {
  const { profile, avatar } = req.body
  if (profile, avatar) {
    const response = await updateAvatarService({ profile, avatar })
    return res.json(response)
  } else {
    return res.json({
      status: 400,
      message: "Data is require"
    })
  }
}
export const uploadImageAvatar = (req, res) => {
  try {
    const urlImage = req.file.path
    return res.status(200).json({
      message: 'upload success',
      content: urlImage
    })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
export const profileAvatarController = async (req, res) => {
  try {
    const { profileId } = req.params;
    if (profileId) {
      const response = await profileAvatarService(profileId);
      return res.json(response);
    }
    return res.json({
      status: 400,
      message: "The user is require",
    });
  } catch (err) {
    return res.json({
      status: "err",
      message: err
    });
  }
}
export const createTokenVerifyController = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const email = data.user
    const response = await createTokenVerifyService(id, email);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500)
  }
}
export const verifyAccountController = async (req, res) => {
  try {
    const { token } = req.params
    if (token) {
      const response = await verifyAccountService(token)
      return res.json(response.message)
    } else {
      return res.json({
        status: 400,
        message: "The token is require",
      });
    }
  } catch (error) {
    return res.json({
      status: "err",
      message: err,
    });
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body
    if (email) {
      const response = await forgotPasswordService(email)
      return res.json(response)
    } else {
      return res.json({
        status: 400,
        message: "User is require",
      });
    }
  } catch (error) {
    return res.json({
      status: "err",
      message: err,
    });
  }
}

export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body
    if (token || password) {
      const response = await resetPasswordService(password, token)
      return res.json(response)
    } else {
      return res.json({
        status: 400,
        message: "Missing required",
      });
    }
  } catch (error) {
    return res.json({
      status: "err",
      message: err,
    });
  }
}