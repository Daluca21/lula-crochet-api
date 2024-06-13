module.exports = (sequelize, DataTypes, Model) => {
    class Rol extends Model {
      static associate(models) {
        this.hasMany(models.Usuario, { foreignKey: 'id_rol'});
      }
    }
    Rol.init(
      {
        id: {
          type: DataTypes.INTEGER, 
          primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(256), 
            allowNull: false
        }
      },
      {
        sequelize, 
        modelName: 'Rol', 
        tableName: 'Rol',
        createdAt: false,
        updatedAt: false 
      },
    );
  };