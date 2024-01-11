import jwt from 'jsonwebtoken'

const authAuthorizeAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'Unauthorized' })
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(404).json({
                message: "Token is valid"
            })
        }
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })
                if (user.isAdmin) {
                    next();
                } else {
                    return res.status(404).json({
                        message: "The user is not Administrator",
                    });
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.toString());
    }
}
export default authAuthorizeAdmin;
