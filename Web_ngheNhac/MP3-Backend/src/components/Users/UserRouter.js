import {Router} from "express"
import * as Controller from "./UserController"
import {throwAsNext, requireLogin, authMiddleware} from "../../middleware"

const path = "/users"
const router = Router()

//get me
router.get("/me", authMiddleware,requireLogin,throwAsNext(Controller.getMe))
//like song
router.post("/like", authMiddleware ,requireLogin, throwAsNext(Controller.likeSong))
//comment song
router.post("/comment/:id",authMiddleware,requireLogin,throwAsNext(Controller.commentSong))
//unlike song
router.post("/unlike", authMiddleware,requireLogin,throwAsNext(Controller.unlikeSong))

export default {path, router}