module.exports = (sequelize, DataTypes, Model) => {
    class ProductoDevolucion extends Model { }

    ProductoDevolucion.init(
        {},
        {
            sequelize,
            modelName: 'Producto_Devolucion',
            tableName: 'Producto_Devolucion',
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        }
    );
};