module.exports = (sequelize, DataTypes, Model) => {
    class Categoria extends Model {
      static associate(models) {
        this.hasMany(models.Modelo, {foreignKey: "id_categoria"});
      }
    }

    Categoria.init(
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
        }
      },
      {
        sequelize, 
        modelName: 'Categoria', 
        tableName: 'Categoria',
        createdAt: false,
        updatedAt: false
      }
    );
  };