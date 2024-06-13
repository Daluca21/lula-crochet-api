const { ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
const { storage } = require('../config/firebase.js');
const sharp = require('sharp');

const uploadFile = async (file) => {
    try {
        let filebuffer = await sharp(file.buffer)
            .resize({ fit: 'cover' })
            .toBuffer();

        const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`)

        const fileMetadata = {
            contentType: file.mimetype
        }

        const fileUploadPromise = uploadBytesResumable(
            fileRef,
            filebuffer,
            fileMetadata
        )

        await fileUploadPromise;

        const fileDownloadURL = await getDownloadURL(fileRef);

        return { ref: fileRef, downloadURL: fileDownloadURL };
    }
    catch (error) {
        console.error('Error al subir la imagen:');
    }

}

const deleteFile = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileRef = ref(storage, url);
            await deleteObject(fileRef);
            console.log('Eliminado exitosamente');
            resolve({ respuesta: true });
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            reject({ respuesta: false, error });
        }
    });
};

module.exports = {
    uploadFile,
    deleteFile
};
