const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Generic Token Verifier
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            req.user = decoded.user;
            next();
        });
    } else {
        return res.status(401).json({ message: "Authentication required. Token missing" });
    }
};

// Allow same user or specific roles
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const user = req.user;
        if (
            user.id.toString() === req.params.id ||
            user.role === 'admin' ||
            user.role === 'partner'
        ) {
            next();
        } else {
            res.status(403).json({ message: "You are not authorized to perform this action" });
        }
    });
};

// Only for Admins
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Admin privileges required" });
        }
    });
};

// Only for Clients
const verifyTokenAndClient = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'client') {
            next();
        } else {
            res.status(403).json({ message: "Client privileges required" });
        }
    });
};

// Only for Partners
const verifyTokenAndPartner = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'partner') {
            next();
        } else {
            res.status(403).json({ message: "Partner privileges required" });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndClient,
    verifyTokenAndPartner
};
