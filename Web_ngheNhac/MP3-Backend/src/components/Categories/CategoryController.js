import * as dbController from "./CategoryDAL"

export const popularCategory = async (req,res) => {
    const categories = await dbController.popularCategory()
    res.send(categories)
}