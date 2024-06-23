module.exports = (sequelize, DataTypes, Model) => {
  class Foto extends Model {
    static associate(models) {
      this.belongsToMany(models.Modelo, { through: "Modelo_Foto" });
    }
  }

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
      tamanio: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Foto',
      tableName: 'Foto',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    }
  );
};