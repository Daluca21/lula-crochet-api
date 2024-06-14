module.exports = module.exports = (sequelize, DataTypes, Model) => {
  class Factura extends Model {
    static associate(models) {
      this.belongsToMany(models.Producto, { through: 'Producto_Factura' });
      this.belongsTo(models.Usuario, { through: 'id_usuario' });
      this.hasOne(models.Devolucion, { foreignKey: 'id_factura', allowNull: false });
      this.hasOne(models.Entrega, { foreignKey: 'id_factura', allowNull: false });
      this.hasMany(models.Transaccion, { foreignKey: 'reference' });
    }
  }
  Factura.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fechaEmision: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descuento: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      subTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      tokenDevolucion: {
        type: DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Factura',
      tableName: 'Factura',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    },
  );
};