import {Router} from "express"
import * as Controller from "./CategoryController"
import {throwAsNext} from "../../middleware"

const path = "/categories"
const router = Router()

router.get("/popular", throwAsNext(Controller.popularCategory))

export default {path,router}