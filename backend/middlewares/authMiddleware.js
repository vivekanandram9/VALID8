import jsonwebtoken from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if(!token) return req.status(401).json({message: "Unauthorized"});

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ message: "Forbidden"});
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;