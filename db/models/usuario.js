module.exports = (sequelize, DataTypes, Model) => {
  class Usuario extends Model {}

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