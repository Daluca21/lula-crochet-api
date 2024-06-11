module.exports = (sequelize, DataTypes, Model) => {
    class ProductoFactura extends Model { }

    ProductoFactura.init(
        {},
        {
            sequelize,
            modelName: 'Producto_Factura',
            tableName: 'Producto_Factura',
            createdAt: false,
            updatedAt: false
        }
    );
};