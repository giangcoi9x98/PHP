import * as dbUtil from "../../util/databaseUtil"

export const getAlbumDetail = async (id) => {
   const sql = ` SELECT albums.id, albums.name as albumName, albums.img,
   singers.name as singer, singers.id as singerId
   FROM albums, singer_album, singers
   WHERE albums.id = singer_album.albumId
   AND singers.id = singer_album.singerId
   AND albums.id = ?
   `
   const result = await dbUtil.query(sql, [id]);
   const album = dbUtil.group(result.map(row => ({
      ...dbUtil.nested(row),
   })), 'id', 'singer', 'singerId');
   return album[0];
}


export const getNewAlbum = async () => {
   const sql =`SELECT albums.name as albumName, albums.id,img,singers.name as singer
   FROM albums, singer_album ,singers
   WHERE albums.id = singer_album.albumId
   AND singer_album.singerId = singers.id
   ORDER BY RAND()
   LIMIT 10
   `
   const result = await dbUtil.query(sql)
   const albums = dbUtil.group(result.map(row => ({
      ...dbUtil.nested(row)
   })),"id","singer")
   return albums
}