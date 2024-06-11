module.exports = (sequelize, DataTypes, Model) => {
    class Carrito extends Model { }

    Carrito.init(
        {
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'Carrito',
            tableName: 'Carrito',
            createdAt: false,
            updatedAt: false
        }
    );
};