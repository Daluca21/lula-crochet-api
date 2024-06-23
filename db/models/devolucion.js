module.exports = (sequelize, DataTypes, Model) => {
  class Devolucion extends Model {
    static associate(models) {
      this.belongsToMany(models.Producto, { through: 'Producto_Devolucion' });
      this.belongsTo(models.Factura, { foreignKey: 'id_factura' });
    }
  }
  Devolucion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fechaDevolucion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      motivo: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Devolucion',
      tableName: 'Devolucion',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    },
  );
};