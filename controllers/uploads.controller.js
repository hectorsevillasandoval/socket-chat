const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const path = require('path');
const fs = require('fs');

const uploadFileFn = async (req, res) => {

    try{
    
        console.log('req.files >>>', req.files); // eslint-disable-line
    
        const resultLog = await uploadFile( req.files.file, undefined, 'users' );
    
        return res.json({
            msg: resultLog
        });

    } catch( error ){
        return res.status(400).json({msg:error});
    }
    
};

const updateImage = async (req, res) => {
    
    const { collection, id } = req.params;

    let model;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ) return res.status(404).json({msg:'User does not exist'});
            break;
        case 'products':
            model = await Product.findById(id);

            if( !model ) return res.status(404).json({msg:'Product does not exist'});
            break;
        default:
            return res.status(500).json({ msg: 'I forgot to validate this collection'});
    }

    try{

        if( model.img ){
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);

            if( fs.existsSync(pathImage) ){
                fs.unlinkSync(pathImage);
            }
        }
        
        const fileName = await uploadFile( req.files.file, undefined, collection );
        model.img = fileName;
    
        await model.save();
        return res.json( model );
    } catch(error){
        return res.status(500).json({ msg: error});
    }


};

const updateImageCloudinary = async (req, res) => {
    
    const { collection, id } = req.params;

    let model;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ) return res.status(404).json({msg:'User does not exist'});
            break;
        case 'products':
            model = await Product.findById(id);

            if( !model ) return res.status(404).json({msg:'Product does not exist'});
            break;
        default:
            return res.status(500).json({ msg: 'I forgot to validate this collection'});
    }

    try{

        if( model.img ){
            const filenameArray = model.img.split('/');
            const lastElement = filenameArray[filenameArray.length - 1];

            const [ imageId ] = lastElement.split('.');

            cloudinary.uploader.destroy( imageId );
        }
        
        //const fileName = await uploadFile( req.files.file, undefined, collection );

        const { tempFilePath } = req.files.file;

        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        model.img = secure_url;
    
        await model.save();
        return res.json( model );
    } catch(error){
        return res.status(500).json({ msg: error});
    }


};

const showImage = async ( req, res ) => {
    const { collection, id } = req.params;

    let model;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ) return res.status(404).json({msg:'User does not exist'});
            break;
        case 'products':
            model = await Product.findById(id);

            if( !model ) return res.status(404).json({msg:'Product does not exist'});
            break;

        default:
            return res.status(500).json({ msg: `I forgot to validate this collection ${collection}`});
    }

    try{
        
        if( model.img ){
            const pathImage = path.join(__dirname, '../public/uploads', collection, model.img);
            
            if( fs.existsSync(pathImage) ){
                return res.sendFile(pathImage);
            }
        }

        return res.json({msg: 'Image is missing'});
        
    } catch(error){
        return res.status(500).json({ msg: error});
    }
    
    
};

module.exports = {
    uploadFileFn,
    updateImage,
    showImage,
    updateImageCloudinary,
};