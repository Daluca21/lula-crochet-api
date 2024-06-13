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
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        }
    );
};