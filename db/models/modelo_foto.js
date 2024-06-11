module.exports = (sequelize, DataTypes, Model) => {
    class ModeloFoto extends Model { }

    ModeloFoto.init(
        {},
        {
            sequelize,
            modelName: 'Modelo_Foto',
            tableName: 'Modelo_Foto',
            createdAt: false,
            updatedAt: false
        }
    );
};