import * as dbUtil from "../../util/databaseUtil"



export const getSlideSong = async () => {
  const sql = `SELECT songs.id, coverImg, image, songs.name as songName,singers.name as singer 
    FROM songs, singers, singer_song
    WHERE coverImg IS NOT NULL
    AND singers.id = singer_song.singerId
    AND singer_song.songId = songs.id
    `
  const result = await dbUtil.query(sql)
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer')
  return songs
}

export const getListNewSong = async () => {
  const sql = `SELECT songs.id,image,songs.name as songName, singers.name as singer
    FROM songs, singer_song,singers
    WHERE singers.id = singer_song.singerId
    AND singer_song.songId = songs.id
    ORDER BY RAND()
    LIMIT 25   
    `
  const result = await dbUtil.query(sql)
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row)
  })), 'id', 'singer')
  return songs
}

export const getSongDetail = async (id, userId = null) => {
  const sql = `SELECT S.id, singers.id as singerId,liked as likeNumber,
      S.image,S.name as nameSong,
      singers.name as singer 
      FROM songs S,singers,singer_song
      WHERE S.id = ?
      AND singers.id = singer_song.singerId
      AND singer_song.songId = S.id
    `;
  const getCateSql = `
      SELECT C.id,C.name
      FROM categories C, songs_categorie SC
      WHERE C.id = SC.categorieId
      AND SC.songId = ?
    `;
  const checkLiked = `
      SELECT userId FROM like_song
      WHERE userId = ?
      AND songId = ?
    `
  const [result, categories] = await Promise.all([dbUtil.query(sql, [id]), dbUtil.query(getCateSql, [id])])
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer', 'singerId')
  const songDetail = songs[0]
  songDetail.categories = []
  categories.forEach((data) => {
    songDetail.categories.push({
      id: data.id,
      name: data.name,
    });
  });
  songDetail.liked = false
  if (userId) {
    const checkLikedResult = await dbUtil.query(checkLiked, [userId, id])
    if (checkLikedResult.length > 0) {
      songDetail.liked = true
    }
  }
  return songs[0];
};


export const getCommentById = async (songId, userId, { limit, offset }) => {
  const sql = `
    SELECT C.id, U.name,U.id as UserId,U.avatar,C.content,C.createAt
    FROM users U, comments C
    WHERE U.id = C.userId
    AND C.songId = ?
    ORDER BY createAt DESC
    LIMIT ? 
    OFFSET ?
    
  `;
  const sqlCount = `
    SELECT COUNT(*) as count
    FROM users U, comments C
    WHERE U.id = C.userId
    AND C.songId = ?
  `;
  const result = await dbUtil.query(sqlCount, [songId])
  const { count } = result[0]
  const comments = await dbUtil.query(sql, [songId, limit, offset])
  if (count === 0) return { comments: [], count }
  return { comments, count }
};

export const getSongLikedByUser = async (userId) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer 
  FROM songs,singers,singer_song,like_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND songs.id = like_song.songId
  AND like_song.userId = ?
  ORDER BY createdAt DESC`
  const result = await dbUtil.query(sql, [userId])
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer')
  return songs.map((song) => {
    return { ...song, liked: true }
  })
}

export const getSongByArtist = async (id, userId) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,
  singers.name as singer, singers.id as singerId FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND songs.id = ANY (
    SELECT songId FROM singer_song
    WHERE singerId = ?
  )
  ORDER BY createdAt DESC`
  const result = await dbUtil.query(sql, [id])
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer', 'singerId')
  if (userId) {
    const listId = songs.map(song => song.id)
    console.log(listId)
    const checkSql = `
      SELECT songId FROM like_song
      WHERE userId = ?
      AND songId IN (?)
    `;
    const listCheck = await dbUtil.query(checkSql, [userId, listId])
    console.log('list check', listCheck)
    const listIdLiked = listCheck.map((doc) => doc.songId)
    console.log('list id like', listIdLiked);
    const lastSongs = songs.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true }
      return { ...doc, liked: false }
    });
    return lastSongs
  }
  return songs
}

export const getSongByAlbum = async (id, userId) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND albumId = ?
  ORDER BY createdAt DESC`
  const result = await dbUtil.query(sql, [id])
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer')
  if (userId) {
    const listId = songs.map(song => song.id)
    console.log(listId)
    const checkSql = `
      SELECT songId FROM like_song
      WHERE userId = ?
      AND songId IN (?)
    `
    const listCheck = await dbUtil.query(checkSql, [userId, listId])
    const listIdLiked = listCheck.map((doc) => doc.songId)
    const lastSongs = songs.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true }
      return { ...doc, liked: false }
    });
    return lastSongs
  }
  return songs
}

export const getMP3 = async (id) => {
  const sql = "SELECT url FROM songs WHERE id = ?"
  const result = await dbUtil.queryOne(sql, [id])
  // console.log("url: ", result.url, "end")
  return result.url
}
