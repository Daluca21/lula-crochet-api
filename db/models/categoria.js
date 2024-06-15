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
          allowNull: false,
          unique : true
        }
      },
      {
        sequelize, 
        modelName: 'Categoria', 
        tableName: 'Categoria',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      }
    );
  };