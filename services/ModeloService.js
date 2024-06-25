const db = require("../db/index")
const { uploadFile, deleteFile } = require('../utils/adminFirebase');
const FotoService = require("./FotoService");
const fotoService = new FotoService();
const models = db.sequelize.models;

class ModeloService {
    constructor() { }

    async find() {
        const res = await models.Modelo.findAll({
            include: [
                {
                    model: models.Foto,
                    through: models.Modelo_Foto
                },
                {
                    model: models.Material,
                    through: models.Modelo_Material
                },
                {
                    model: models.Categoria,
                },
                {
                    model: models.Producto
                },
            ]
        });
        return res;
    }

    async findByCategoria(id_categoria) {
        const res = await models.Modelo.findAll({
            where: {
                id_categoria: id_categoria
            },
            include: [
                {
                    model: models.Foto,
                    through: models.Modelo_Foto
                },
                {
                    model: models.Material,
                    through: models.Modelo_Material
                },
                {
                    model: models.Categoria,
                },
                {
                    model: models.Producto
                },
            ]
        });
        return res;
    }

    async findOne(id) {
        const res = await models.Modelo.findByPk(id, {
            include: [
                {
                    model: models.Foto,
                    through: models.Modelo_Foto
                },
                {
                    model: models.Material,
                    through: models.Modelo_Material
                },
                {
                    model: models.Categoria,
                },
                {
                    model: models.Producto
                },
            ]
        });
        return res;
    }

    async create(data, imagenes) {
        const modelo = await models.Modelo.create(data);

        const crearMateriales = data.materiales.map(async (nombre) => {
            const material = await models.Material.findOne({
                where: {
                    "nombre": nombre
                }
            });

            await modelo.addMaterial(material);
        });
        await Promise.all(crearMateriales);

        if (imagenes && imagenes.length > 0) {
            const crearImagenes = imagenes.map(async (imagen) => {
                const { ref, downloadURL } = await uploadFile(imagen);
                const foto = await fotoService.create({
                    url: downloadURL,
                    tamanio: data.tamanio
                });
                await modelo.addFoto(foto);
                console.log(`Image added: ${downloadURL}`);
            });
            await Promise.all(crearImagenes);
        }

        return modelo;
    }

    async update(id, data, imagenes) {
        const modelo = await this.findOne(id);

        console.log(await modelo.getMaterials());
        await modelo.setMaterials([]);
        
        const crearMateriales = data.materiales.map(async (nombre) => {
            const material = await models.Material.findOne({
                where: {
                    "nombre": nombre
                }
            });

            await modelo.addMaterial(material);
        });
        await Promise.all(crearMateriales);


        if (imagenes && imagenes.length > 0) {
            const crearImagenes = imagenes.map(async (imagen) => {
                const { ref, downloadURL } = await uploadFile(imagen);
                const foto = await fotoService.create({
                    url: downloadURL,
                    tamanio: data.tamanio
                });
                await modelo.addFoto(foto);
                console.log(`Image added: ${downloadURL}`);
            });
            await Promise.all(crearImagenes);
        }

        const res = await model.update(data);
        
        return res;
    }

    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { deleted: true };
    }

    async getFotos(id) {
        const res = await models.Modelo.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.Foto,
                    through: models.Modelo_Foto
                }
            ]
        });
        console.log(res);
        return res.Fotos;
    }
}

module.exports = ModeloService;