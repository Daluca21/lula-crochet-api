module.exports = (sequelize, DataTypes, Model) => {
  class Foto extends Model {}

  Foto.init(
    {
      id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize, 
      modelName: 'Foto',
      tableName: 'Foto', 
      createdAt: false,
      updatedAt: false
    }
  );
};