import express from "express"
import routers from "./components/router"
import path from "path"
import bodyParser from "body-parser"
import { authMiddleware, ok, corsMiddleware } from "./middleware"

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("OK")
})

app.use(express.static(path.resolve(__dirname,'../public')));
console.log("public " + path.join(__dirname, '../public'))


app.use(corsMiddleware)

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use(ok)
// app.use(authMiddleware)

for (const router of routers) {
    app.use(router.path, router.router)
}

// app.use(errorHandler)

app.listen(port, err => {
    if (err) {
        console.log(err)
    }
    console.log(`App listen at ${port}`)
})