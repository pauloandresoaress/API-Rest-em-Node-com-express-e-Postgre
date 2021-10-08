const fs = require('fs');
const paths = require('path');
module.exports = (path, name, imageCreated) => {
    const typeValids = ['png','jpg','jpeg'];
    const typeArchive = paths.extname(path);
    const typeIsValid = typeValids.indexOf(typeArchive.substring(1)) === -1
    if(typeIsValid){
        const erro = "Tipo de arquivo inválido."
        imageCreated(erro);
    }else{
        const newPath = `./assets/images/${name}${typeArchive}`;
        fs.createReadStream(path)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', () => imageCreated(false, newPath));
    }
}