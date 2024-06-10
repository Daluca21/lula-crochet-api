module.exports = module.exports = (sequelize, DataTypes, Model) => {
  class Factura extends Model {}
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
      createdAt: false,
      updatedAt: false  
    },
  );
};