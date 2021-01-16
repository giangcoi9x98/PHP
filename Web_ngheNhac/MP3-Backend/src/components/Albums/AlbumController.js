import * as dbController from "./AlbumDAL"

export const getAlbumDetail = async (req,res) => {
    const {id} = req.params
    const album = await dbController.getAlbumDetail(id)
    res.send(album)
}

export const getNewAlbum = async (req,res) => {
    const album = await dbController.getNewAlbum()
    res.send(album)
}