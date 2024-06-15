module.exports = (sequelize, DataTypes, Model) => {
  class Material extends Model {
    static associate(models) {
      this.belongsToMany(models.Modelo, { through: "Modelo_Material" });
    }
  }

  Material.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
      },
      grosor: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Material',
      tableName: 'Material',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    }
  );
};