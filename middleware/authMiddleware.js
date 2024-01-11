import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    // console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
        req.body = decoded
        next()
      }
    )
    //   const token = req.cookies.token || '';
    //   if (!token) {
    //     return res.status(401).json({
    //       message: "You need to Login"
    //     })
    //   }
    //   const decrypt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //   req.body = decrypt
    //   next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.toString());
  }
}
export default authMiddleware;
