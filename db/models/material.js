module.exports = (sequelize, DataTypes, Model) => {
  class Material extends Model {}

  Material.init(
    {
      id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grosor: {
        type: DataTypes.INTEGER,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize, 
      modelName: 'Material',
      tableName: 'Material', 
      createdAt: false,
      updatedAt: false
    }
  );
};