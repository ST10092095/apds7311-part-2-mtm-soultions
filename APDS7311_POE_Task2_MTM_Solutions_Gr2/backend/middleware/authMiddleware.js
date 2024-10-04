import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log('Request Header',req.headers);

    const authHeader = req.headers['Authorization'];
    console.log('Authorisation Header:', authHeader);

    if(!authHeader) {
        return res.status(401).json({message: 'No authorization header, Access Deinied'})
    }

    const parts =  authHeader.split(' ');
    if(parts.length !== 2) {
        return res.status(401).json({message: 'Authorization header format must be a Bearer[Token]'})
    }
    const token = parts[1];
    console.log('Token:', token);

    if(!token) {
        return res.status(401).json({message: 'No token provided, Access Denied'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);
        req.customer = decoded;
        next();
    }
    catch(err) {
        console.error('Token verification error:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Invalid token, Access Denied'})
        }else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({message: 'Token expired, Access Denied'})
        }
        return res.status(500).json({message: 'Internal server error'}) 
    }

}

export default authMiddleware;