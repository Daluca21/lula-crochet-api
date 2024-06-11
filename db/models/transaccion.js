module.exports = module.exports = (sequelize, DataTypes, Model) => {
  class Transaccion extends Model {
    static associate(models) {
      this.belongsTo(models.Factura, { foreignKey: 'reference' });
    }
  }
  Transaccion.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      customer_email: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      amount_in_cents: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      finalized_at: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_method_type: {
        type: DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Transaccion',
      tableName: 'Transaccion',
      createdAt: false,
      updatedAt: false
    },
  );
};