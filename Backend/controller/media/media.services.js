const util = require("util");
const pool = require("../../middleware/db.js");
const { uploadImage, deleteImageByURL } = require("../../middleware/utils.js");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports ={
    uploadFile:async(data) =>{
        try {
            const { media, type,title,description,author,adminId } = data;
            if (!media || !type) {
              return { success:0,message: "File and type are required." }
            }
        
            const fileUrl = await uploadImage(media, media.originalname);
        
            const insertResult = await queryAsync("INSERT INTO media (url, type,title,description,author,createdBy) VALUES (?, ?,?,?,?,?)", [
              fileUrl,
              type,
              title,
              description,
              author,
              adminId
            ]);
        
            return {
              success:1,
              message: "Media uploaded successfully.",
              results: insertResult.insertId,
              fileUrl,
            }
          } catch (error) {
            return { success:0, message: error.message }
          }
    },
    getAllMedia:async() =>{
        try {
            const mediaList = await queryAsync("SELECT * FROM media ORDER BY createdAt DESC");
            return {success:1, results: mediaList }
          } catch (error) {
            return { success:0, message: error.message }
          }
    },
     
    deleteMedia:async(data) =>{
        try {
            const { mediaId } = data;
        
            const media = await queryAsync("SELECT * FROM media WHERE mediaId = ?", [mediaId]);
            console.log(data)
            console.log(mediaId)
            if (media.length === 0) {
              return { success:0, message: "Media not found." }
            }
        
            await deleteImageByURL(media[0].url);
        
            await queryAsync("DELETE FROM media WHERE mediaId = ?", [mediaId]);
        
            return { success:1,resuts: "Media deleted successfully." }
          } catch (error) {
            return { success:0, message: error.message }
          }
    }
}

