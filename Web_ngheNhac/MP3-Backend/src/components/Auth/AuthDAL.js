import * as dbUltil from "../../util/databaseUtil"
const uuidv4 = require('uuid').v4

export const checkUserExist = async (username) => {
    const sql = "SELECT username FROM users WHERE username = ?"
    const result = await dbUltil.query(sql,[username])
    if (result.length > 0){
        return true
    } else {
        return false
    }
}

export const signUp = async ({username, passwordHash, name}) => {
    const check = await checkUserExist(username)
    if (check) {
        return "User da ton tai"
    } 
    const sql = "INSERT INTO users(id,username,password,name) VALUES (?,?,?,?)"
    const id = uuidv4()
    await dbUltil.query(sql,[id,username,passwordHash,name])
}

export const getUserByUsername = async (username) => {
    const sql = "SELECT id,username,password FROM users WHERE username = ? LIMIT 1"
    return dbUltil.queryOne(sql, [username])
}