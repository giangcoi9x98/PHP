import * as bcryptUtil from "../../util/bcryptUtil"
import * as jwtUltil from "../../util/jwtUtil"

export const checkPassword = async (password, passwordHash) => bcryptUtil.compare(password, passwordHash)

export const generateToken = id =>
    jwtUltil.generateToken({ id }, { expiresIn: 86400 })
