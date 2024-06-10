module.exports = (sequelize, DataTypes, Model) => {
  class Devolucion extends Model {}
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
      createdAt: false,
      updatedAt: false 
    },
  );
};