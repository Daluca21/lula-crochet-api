module.exports = (sequelize, DataTypes, Model) => {
    class ProductoOferta extends Model { }

    ProductoOferta.init(
        {},
        {
            sequelize,
            modelName: 'Producto_Oferta',
            tableName: 'Producto_Oferta',
            createdAt: false,
            updatedAt: false
        }
    );
};