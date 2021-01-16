import * as dbAccess from "./AuthDAL"
import { hash } from "../../util/bcryptUtil"
import * as common from "../Auth/common"

export const signUp = async (req, res) => {
    const { username, password, name, rePassword } = req.body
    console.log(req.body)
    if (password != rePassword) {
        res.status(401).send("Sai repass")
    }
    const passwordHash = hash(password)
    await dbAccess.signUp({ username, passwordHash, name })
    res.ok()
}

export const login = async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    const user = await dbAccess.getUserByUsername(username)
    if (user) {
        const passwordValid = await common.checkPassword(password, user.password)
        console.log(user.password)
        if (passwordValid) {
            const token = await common.generateToken(user.id)
            res.json({ token })
        } else {
            res.send("Wrong password")
        }
    } else {
        res.send("User not found")
    }

}