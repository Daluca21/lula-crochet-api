module.exports = (sequelize, DataTypes, Model) => {
  class Modelo extends Model {
    static associate(models) {
      this.belongsToMany(models.Foto, { through: "Modelo_Foto" });
      this.belongsToMany(models.Material, { through: "Modelo_Material" });
      this.belongsTo(models.Categoria, { foreignKey: 'id_categoria' });
      this.hasMany(models.Producto, {foreignKey: 'id_modelo'});
    }
  }

  Modelo.init(
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
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Modelo',
      tableName: 'Modelo',
      createdAt: false,
      updatedAt: false
    },
  );
};