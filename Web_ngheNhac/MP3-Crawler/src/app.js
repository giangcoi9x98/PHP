// import puppeteer from "puppeteer"
// import uuidv4 from "uuidv4"
// import async from "async"
// import * as shell from "shelljs"

const puppeteer = require("puppeteer")
const uuidv4 = require("uuid").v4
const async = require("async")
const url = "https://zingmp3.vn/album/Doa-Quynh-Lan-Single-YuniBoo-H2K/6I0DEWF6.html"
const shell = require("shelljs")
const dbUtil = require("./util/databaseUtil")

let browser
let page
const startChromium = function () {
    return new Promise(async (resolve) => {
        browser = await puppeteer.launch({
            userDataDir: `./DataAccChromium/duchieu307`,
            defaultViewport: null,
            headless: false
        })
        page = await browser.newPage()
        const result = await startCrawler()
        await saveInDB(result)
        console.log(result)
        process.exit(0);
    })

}

startChromium()

const startCrawler = async function () {
    await page.goto(url)
    await page.waitFor(".info-player-details-box", { timeout: 5000 })
    await sleep(2000)
    const data = await page.evaluate((_) => {

        //get info song
        let mp3Card = document.querySelectorAll(".card-info")[0]
        let songName = mp3Card.querySelector(".title a").innerHTML
        let singer = mp3Card.querySelectorAll(".artist a")[0].title
        let image = document.querySelectorAll(".bor-bottom")[0]
        image = image.querySelector("div a div img").src
        let rawDuration = document.querySelectorAll(".z-duration")[0].innerHTML
        rawDuration = rawDuration.split(":")
        let minute = rawDuration[0]
        let second = rawDuration[1]
        let length = parseInt(minute) * 60 + parseInt(second)

        //get info album
        let albumImg = document.querySelectorAll(".z-sticky")[0]
        albumImg = albumImg.querySelector("div div img").src
        let albumName = document.querySelectorAll(".z-sticky")[0]
        albumName = albumName.querySelector(".info-body h3").innerHTML

        //download song
        let mp3File = document.querySelectorAll(".list-buttons")[0]
        mp3File = mp3File.querySelector(".normal-view")
        mp3File = mp3File.querySelectorAll("li")[3]
        mp3File.querySelector("a").click()
        mp3File = document.querySelectorAll(".dropdown-menu-list")[0]
        mp3File = mp3File.querySelector("div .block-menu .block-menu-items")
        mp3File = mp3File.querySelectorAll("a")[0]
        mp3File.click()

        function clickDownload() {
            mp3File = document.querySelectorAll(".z-packages")[0]
            mp3File.querySelectorAll("a")[0].click()
        }

        setTimeout(clickDownload, 1000)


        console.log(albumImg)
        return { songName, singer, image, length, albumImg, albumName }
    })
    await sleep(6000)
    const listTemp = await shell.exec("dir ..\\mp3")
    const mp3Url = listTemp.stdout.split('\n')[7];
    let mp3LinkName = await mp3Url.split(" ").pop()
    mp3LinkName = await mp3LinkName.split(" ")[0]
    await shell.exec(`move ..\\mp3\\${mp3LinkName}  ..\\..\\MP3-Backend\\Data`)
    console.log(`..\\mp3\${mp3LinkName}`)
    return { ...data, mp3LinkName }
    // return { ...data }
}
// move c:\example.txt h:
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const saveInDB = async function ({
    songName,
    singer,
    image,
    length,
    albumImg,
    albumName,
    mp3LinkName
}) {
    const transaction = await dbUtil.beginTransaction()
    const category = "US-UK"
    try {
        const checkAlbum = await checkAlbumExist(albumName)
        const checkSinger = await checkSingerExist(singer)
        const checkCategory = await checkCategorieExist(category)
        //create id
        let albumID
        let singerID
        let songID = uuidv4()
        console.log(`hieu ${songID} thien`)
        let categoryID
        //kiem tra co album chua ko thi tao cai moi 
        if (checkAlbum) {
            albumID = checkAlbum
        } else {
            albumID = uuidv4()
            if (albumName) {
                const addAlbumSql = "INSERT INTO albums(id,name,img) VALUES(?,?,?)"
                await dbUtil.execute(addAlbumSql, [albumID, albumName, albumImg], transaction)
            }
        }
        //kiem tra ca si
        if (checkSinger) {
            singerID = checkSinger
        } else {
            singerID = uuidv4()
            const addSingerSql = "INSERT INTO singers(id,name) VALUE(?,?)"
            await dbUtil.execute(addSingerSql, [singerID, singer], transaction)
        }
        //them singer album
        if (albumName) {
            const addSingerAlbumSql = "INSERT IGNORE INTO singer_album(albumId,singerId) VALUES(?,?)"
            await dbUtil.execute(addSingerAlbumSql, [albumID, singerID], transaction)
        }
        // check categories
        if (checkCategory) {
            categoryID = checkCategory
        } else {
            categoryID = uuidv4()
            const addCategorySql = "INSERT INTO categories(id,name) VALUES(?,?)"
            await dbUtil.execute(addCategorySql, [categoryID, category], transaction)


        }

        //them song
        const addSongSql = "INSERT INTO songs(id,name,image,length,albumId,url) VALUES(?,?,?,?,?,?)"
        await dbUtil.execute(addSongSql, [songID, songName, image, length, albumID, mp3LinkName], transaction)
        //them vao singer-song
        const addSingerSongSql = "INSERT IGNORE INTO singer_song(singerId,songId) VALUES(?,?)"
        await dbUtil.execute(addSingerSongSql, [singerID, songID], transaction)
        //them song-category
        const addSongCategorySql = "INSERT INTO songs_categorie(songId,categorieId) VALUES(?,?)"
        await dbUtil.execute(addSongCategorySql, [songID, categoryID], transaction)
        await dbUtil.commitTransaction(transaction)
        console.log("thuc hien dc r")
    } catch (error) {
        console.log(error)
        await dbUtil.rollbackTransaction(transaction)
    }
}

const checkAlbumExist = async function (name) {
    const sql = "SELECT id FROM albums WHERE name = ?"
    const result = await dbUtil.queryOne(sql, [name])
    if (result) {
        return result.id
    } else {
        return null
    }
}

const checkSingerExist = async function (name) {
    const sql = "SELECT id FROM singers WHERE name = ?"
    const result = await dbUtil.queryOne(sql, [name])
    if (result) {
        return result.id
    } else {
        return null
    }
}

const checkCategorieExist = async function (name) {
    const sql = "SELECT id FROM categories WHERE name = ?"
    const result = await dbUtil.queryOne(sql, [name])
    if (result) {
        return result.id
    } else {
        return null
    }
}


//connect database va them du lieu
//cai dat lai mariadb ghi nho tai khoan root de ket noi
//root:123456
//categories tao bang tay thoi Hieu oi


