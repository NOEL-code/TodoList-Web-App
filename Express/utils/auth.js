const jwt = require("jsonwebtoken");

function createToken(visibleUser, maxAge = 60 * 60 * 24 * 3){
    return jwt.sign(visibleUser, process.env.JWT_SECRET || "MyJWT", {
        expiresIn: maxAge,
    });
}

function verifyToken(_token){
    console.log("token")
    if(!_token){
        return null;
    }
    const verifyToken = jwt.verify(_token, process.env.JWT_SECRET || "MyJWT");
    return verifyToken;
}

module.exports = {
    createToken,
    verifyToken,
};