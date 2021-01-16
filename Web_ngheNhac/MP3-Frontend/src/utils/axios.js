import axios from "axios"
import localStorage from "localStorage"

const baseURL = process.env.REACT_APP_API_URL

export const axiosApi = axios.create({
    baseURL
})

export const axiosAuth = async function(){
    return new Promise(async (resolve,reject) => {
        const token = localStorage.getItem('token')
        const instace = axios.create({
            baseURL,
            headers: {authorization: `Bearer ${token}`}
        })
        resolve(instace)
    })
}