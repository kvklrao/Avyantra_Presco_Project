import { db } from '../auth/firebase';
const request = require('request');

exports.fileUploder = async(req) => {

    const uploadType = req.body.file_type;
    const uploadPath = req.body.path;

    const signedUrlResponse = await db
        .file(`${uploadType}/${uploadPath}.jpg`)
        .getSignedUrl({
            action: 'write',
            expires: new Date(Date.now() + 2 * 60000),
        });
    
    const assetUrl = signedUrlResponse[0];

    request.put({ 
            url: assetUrl,
            method: 'PUT',
            body: req.file.buffer
        },
        function(error, response, body) {
            if (error) {
                console.error('upload failed:', error);
                return false;
            }
        return true;
    }); 

}

exports.fetchDownloadURL = async (uploadType, uploadPath) =>{
    const signedUrlResponse = await db
                                .file(`${uploadType}/${uploadPath}.jpg`)
                                .getSignedUrl({
                                    action: 'read',
                                    expires: new Date(Date.now() + 3600 * 60000),
                                });
    const url = signedUrlResponse[0];
    return url;
}
