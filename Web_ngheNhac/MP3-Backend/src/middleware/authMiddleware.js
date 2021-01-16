import * as jwtUlti from "../util/jwtUtil"

export const authMiddleware = async (req, res, next) => {
    req.isLogged = false;
    const { authorization } = req.headers;
    if (authorization && authorization.match(/^Bearer /g)){
        const token = authorization.split(' ')[1]
        if (token) {
            try {
                const tokenDecoded = await jwtUlti.verifyToken(token)
                req.isLogged = true;tokenDecoded
                req.userId = tokenDecoded.id
                req.token = token
            } catch (error) {
                console.log(error)
            }
        }
    }
    next()
}

export const requireLogin = async (req, res, next) => {
    if (req.isLogged){
        next()
    } else {
        next("chưa đăng nhập kìa a")
    }
}