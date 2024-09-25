import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'
import Product from './Product'
import Order from './Order'

interface OrderItemAttributes {
  name: string
  quantity: string
  price: number
  productId: string
  orderId: string
}

class OrderItem extends Model<OrderItemAttributes> {
  declare name: string
  declare quantity: string
  declare price: number
}

OrderItem.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order, // Reference to the Order table
        key: 'id',
      },
      primaryKey: true, // Part of the composite primary key
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product, // Reference to the Product table
        key: 'id',
      },
      primaryKey: true, // Part of the composite primary key
    },
  },
  {
    sequelize: db,
    modelName: 'OrderItem',
    timestamps: false,
  }
)

export default OrderItem
