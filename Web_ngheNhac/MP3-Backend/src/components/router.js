import AuthRouter from "./Auth/AuthRouter"
import SongRouter from './Songs/SongRouter'
import AlbumRouter from "./Albums/AlbumRouter"
import ArtistRouter from "./Artist/ArtistRouter"
import UserRouter from "./Users/UserRouter"
import CategoriesRouter from './Categories/CategoryRouter'
import SearchRouter from "./Search/SearchRouter"

export default [
    AuthRouter,
    SongRouter,
    AlbumRouter,
    ArtistRouter,
    UserRouter,
    CategoriesRouter,
    SearchRouter
]