import {Router} from "express"
import * as controller from "./AuthController"
import {throwAsNext} from '../../middleware/errorHandler'

const path = '/auth'
const router = Router()

//sign up
router.post("/signUp", throwAsNext(controller.signUp))
//login
router.post("/login", throwAsNext(controller.login))

// router.post("/signUp",(req,res) => {
//     res.send(req.body)
// })

export default {path,router}