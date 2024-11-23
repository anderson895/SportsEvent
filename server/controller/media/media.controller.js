const { handleResponse } = require("../../helpers/handleResponse");
const { uploadFile, getAllMedia, deleteMedia } = require("./media.services");


module.exports ={
    UploadMedia:(req,res) =>{
        try {
            let data = req.body;
            const file = req.file;
            data.media = file;
            handleResponse(res, uploadFile(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    MediaList:(req,res) =>{
        try {
            handleResponse(res,getAllMedia())
        } catch (error) {
            errorException(error,res)
        }
    },
    DeleteMedia:(req,res) =>{
        try {
            const data = req.params
            handleResponse(res,deleteMedia(data))
        } catch (error) {
            errorException(error,res)
        }
    },
}