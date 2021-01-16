import { Router } from "express"
import * as controller from "./SongController"
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from "../../middleware"

const path = "/song"
const router = Router()


//get song detail
//get new 
router.get("/new", throwAsNext(controller.getNewSong))
//get slide
router.get("/slide", throwAsNext(controller.getSlideSong))
//get song detail
router.get("/detail/:id", authMiddleware, throwAsNext(controller.getSongDetail))
//get comment qua song id
router.get('/comment/:id', authMiddleware, paginationMiddleware({
    maxSize: 30,
    defaultSize: 20,
}), throwAsNext(controller.getCommentById))
// get song liked by user
router.get('/like', authMiddleware, requireLogin, paginationMiddleware({
    maxSize: 30,
    defaultSize: 20,
}), throwAsNext(controller.getSongLikedByUser))
//get song by artist
router.get('/artist/:id', authMiddleware, throwAsNext(controller.getSongByArtist))
// get song by album
router.get('/album/:id', authMiddleware, throwAsNext(controller.getSongByAlbum))
//play music
router.get("/:id", throwAsNext(controller.getMP3))


export default { path, router }