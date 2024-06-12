module.exports = (sequelize, DataTypes, Model) => {
  class Usuario extends Model {
    static associate(models) {
      this.belongsToMany(models.Producto, {through:'Carrito'});
      this.belongsTo(models.Rol, { foreignKey: 'id_rol'});
    }
  }

  Usuario.init(
    {
      correo: {
        type: DataTypes.STRING, 
        primaryKey: true
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize, 
      modelName: 'Usuario', 
      tableName: 'Usuario',
      createdAt: false,
      updatedAt: false
    }
  );
};