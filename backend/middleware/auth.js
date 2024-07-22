import jwt from 'jsonwebtoken';

const JWT_SECRET = "letsfoodie";

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.json({
            success:false,
            message:'Not Authorized Login Again'
        });
    }
    try {
        const token_decode =  jwt.verify(token,JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } 
    catch (error) {
        return res.json({
            success:false,
            message:error.message
        });
    }
}

export default authMiddleware;