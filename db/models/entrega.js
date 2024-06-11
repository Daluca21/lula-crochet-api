module.exports = module.exports = (sequelize, DataTypes, Model) => {
  class Entrega extends Model {
    static associate(models) {
      this.belongsTo(models.Factura, { foreignKey: 'id_factura'});
    }
  }
  Entrega.init(
    {
      id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      estado: {
          type: DataTypes.INTEGER, 
          allowNull: false
      },
      municipio: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      departamento: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      fechaEntrega: {
          type: DataTypes.DATE, 
          allowNull: false
      }
    },
    {
      sequelize, 
      modelName: 'Entrega', 
      tableName: 'Entrega',
      createdAt: false,
      updatedAt: false 
    },
  );
};