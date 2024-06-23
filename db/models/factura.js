module.exports = module.exports = (sequelize, DataTypes, Model) => {
  class Factura extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
      this.hasOne(models.Devolucion, { foreignKey: 'id_factura', allowNull: false, onDelete: "RESTRICT" });
      this.hasOne(models.Entrega, { foreignKey: 'id_factura', allowNull: false, onDelete: "RESTRICT" });
      this.hasMany(models.Transaccion, { foreignKey: 'reference', onDelete: "RESTRICT" });
      this.belongsToMany(models.Producto, { through: 'Producto_Factura' });
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
      },
      estaPagado: {
        type: DataTypes.BOOLEAN,
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