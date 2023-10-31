import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token is missing"
      })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({
          message: "User is not authorized"
        })
      }
      req.body = data
      next()
      // if (data.isAdmin) {
      //   next();
      // } else {
      //   return res.status(404).json({
      //     message: "The user is not Administrator",
      //   });
      // }
    })
  }
};
export default authMiddleware;
