module.exports = (sequelize, DataTypes, Model) => {
  class Producto extends Model {
    static associate(models) {
      this.belongsTo(models.Modelo, { foreignKey: 'id_modelo' });
      this.belongsToMany(models.Factura, {through:'Producto_Factura'});
      this.belongsToMany(models.Usuario, {through:'Carrito'});
      this.belongsToMany(models.Oferta, {through:'Producto_Oferta'});
      this.belongsToMany(models.Devolucion, { through: 'Producto_Devolucion' });
    }
  }

  Producto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_modelo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'producto_unique',
      },
      tamanio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'producto_unique',
      },
      cantidadDisponible: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'Producto',
      createdAt: false,
      updatedAt: false,
    },
  );
};