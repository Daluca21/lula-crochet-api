module.exports = (sequelize, DataTypes, Model) => {
    class ProductoFactura extends Model { }

    ProductoFactura.init(
        {
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'Producto_Factura',
            tableName: 'Producto_Factura',
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        }
    );
};