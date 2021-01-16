import * as dbController from './SongDAL'
import path from "path"



export const getSlideSong = async (req, res) => {
    const songs = await dbController.getSlideSong()
    res.send(songs)
}

export const getNewSong = async (req, res) => {
    const songs = await dbController.getListNewSong()
    res.send(songs)
}

export const getSongDetail = async (req, res) => {
    console.log("req bao gom", req.pagination)
    const { id } = req.params;
    const userId = req.isLogged ? req.userId : null
    const song = await dbController.getSongDetail(id, userId)
    res.send(song)
}

export const getCommentById = async (req, res) => {
    const userId = req.isLogged ? req.userId : null
    const comments = await dbController.getCommentById(req.params.id, userId, req.pagination)
    res.send(comments)
}

export const getSongLikedByUser = async (req, res) => {
    const userId = req.isLogged ? req.userId : null
    const song = await dbController.getSongLikedByUser(userId)
    res.send(song)
}

export const getSongByArtist = async (req, res) => {
    const userId = req.isLogged ? req.userId : null
    const songs = await dbController.getSongByArtist(req.params.id, userId)
    res.send(songs)
}

export const getSongByAlbum = async (req, res) => {
    const userId = req.isLogged ? req.userId : null
    const songs = await dbController.getSongByAlbum(req.params.id, userId)
    res.send(songs)
}

//check lai url
const folderData = "C:\\Users\\duchi\\Desktop\\Project-2\\MP3-Backend\\Data\\";
export const getMP3 = async (req, res) => {
    const { id } = req.params
    console.log("song id: ", id)
    const url = await dbController.getMP3(id)

    // console.log(`hieu C:\\${url}thienthien`)
    // console.log(`url: ${url.substring(0, url.length - 1)} thiennn`)
    // console.log(url.length)
    res.sendFile(folderData + url.substring(0, url.length - 1))
    // try {
    //     res.sendFile("C:\\" + url.substring(0, url.length - 1))
    // } catch (error) {
    //     console.log("Loi", error)
    // }

    // res.sendFile(`${url}`, {root: path.join(__dirname,'../../../../MP3-Backend/Data/')})
    // res.sendFile(__dirname +  `..\\..\\..\\Data\\` + url)
}

