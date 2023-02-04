const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( file, allowedExtensions = [ 'jpg', 'jpeg', 'png', 'gif' ], folderName = '' ) => {

    return new Promise((resolve, reject) => { 
    
        const extension = file.name.slice( file.name.lastIndexOf('.') + 1 );
    
        if( ! allowedExtensions.includes( extension ) ) return reject(`Invalid file extension`);
        
        const tempName = `${uuidv4()}.${extension}`;
        const uploadPath = path.join( __dirname, '../public/uploads/', folderName, tempName );
    
        file.mv(uploadPath, function(err) {
            if (err) {
                return reject( err );
            }
    
            return resolve(tempName);
        });

    });
};

module.exports = uploadFile;