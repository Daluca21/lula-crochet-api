module.exports = (sequelize, DataTypes, Model) => {
    class Modelo extends Model {}
    
    Modelo.init(
      {
        id: {
          type: DataTypes.INTEGER, 
          autoIncrement: true,
          primaryKey: true
        },
        tamanio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidadDisponible: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        precio: {
          type: DataTypes.DOUBLE,
          allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
      },
      {
        sequelize, 
        modelName: 'Producto',
        TableName: 'Producto', 
        createdAt: false,
        updatedAt: false
      },
    );
  };