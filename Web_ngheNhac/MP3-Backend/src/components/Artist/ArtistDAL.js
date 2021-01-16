import * as dbUtil from "../../util/databaseUtil"

export const getArtistDetail = async (id) => {
    const sql = 'SELECT * FROM singers WHERE id = ?'
    const artist = await dbUtil.queryOne(sql, [id])
    return artist
}

export const getSuggestArtist = async () => {

    const sql = `SELECT * FROM singers
    ORDER BY RAND()
    LIMIT 6 
    `
    const result = await dbUtil.query(sql)
    return result
}