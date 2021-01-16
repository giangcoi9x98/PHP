//dua function vao try catch
export const throwAsNext = f => async (req, res, next) => {
    try {
        await f(req, res, next)
    } catch (error) {
        next(error)
    }
}