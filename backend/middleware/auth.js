const jwt = require("jsonwebtoken")

function authenticator(req, res, next){
    const authorization = req.headers.authorization
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : authorization

    if (!token) {
        return res.status(401).send({
            message: "Authentication required",
            status: 2
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decode.userID }
        next()
    } catch (error) {
        return res.status(401).send({
            message: "Invalid token, please login again",
            status: 2
        })
    }
}

module.exports = {
    authenticator
}