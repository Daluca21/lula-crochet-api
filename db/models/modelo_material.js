module.exports = (sequelize, DataTypes, Model) => {
    class ModeloMaterial extends Model { }

    ModeloMaterial.init(
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