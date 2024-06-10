module.exports = module.exports = (sequelize, DataTypes, Model) => {
  class Oferta extends Model {}
  Oferta.init(
    {
      id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      fechaInicio: {
          type: DataTypes.DATE, 
          allowNull: false
      },
      fechaFin: {
          type: DataTypes.DATE, 
          allowNull: false
      },
      descuento: {
          type: DataTypes.FLOAT, 
          allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      sequelize, 
      modelName: 'Oferta', 
      tableName: 'Oferta', 
      createdAt: false,
      updatedAt: false
    },
  );
};