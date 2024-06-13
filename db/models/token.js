module.exports = (sequelize, DataTypes, Model) => {
    class Token extends Model {
        static associate(models) {
            this.belongsTo(models.Usuario, { foreignKey: 'correo' });
        }
    }

    Token.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fechaExpiracion: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Token',
            tableName: 'Token',
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        },
    );
};