module.exports = (sequelize, DataTypes, Model) => {
    class ModeloFoto extends Model { }

    ModeloFoto.init(
        {},
        {
            sequelize,
            modelName: 'Modelo_Material',
            tableName: 'Modelo_Material',
            createdAt: false,
            updatedAt: false
        }
    );
};