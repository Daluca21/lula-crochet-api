module.exports = (sequelize, DataTypes, Model) => {
    class Modelo extends Model {}
    
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
        },
      },
      {
        sequelize, 
        modelName: 'Modelo',
        TableName: 'Modelo', 
        createdAt: false,
        updatedAt: false
      },
    );
  };