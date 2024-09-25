import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'

interface orderAttributes {
  id: string
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: Date
  isDelivered: boolean
  deliveredAt: Date
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

type OrderCreationAttributes = Optional<
  orderAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

class Order extends Model<orderAttributes, OrderCreationAttributes> {
  declare id: string
  declare paymentMethod: string
  declare itemsPrice: number
  declare shippingPrice: number
  declare taxPrice: number
  declare totalPrice: number
  declare isPaid: boolean
  declare paidAt: Date
  declare isDelivered: boolean
  declare deliveredAt: Date
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemsPrice: DataTypes.FLOAT,
    shippingPrice: DataTypes.FLOAT,
    taxPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paidAt: DataTypes.DATE,
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deliveredAt: DataTypes.DATE,
  },
  {
    sequelize: db,
    modelName: 'Order',
  }
)

export default Order
