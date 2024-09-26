import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'
import PaymentResult from './PaymentResult'
import ShippingAddress from './ShippingAddress'
import OrderItem from './Order_Item'

// interface orderAttributes {
//   id: string
//   paymentMethod: string
//   itemsPrice: number
//   shippingPrice: number
//   taxPrice: number
//   totalPrice: number
//   isPaid: boolean
//   paidAt: Date
//   isDelivered: boolean
//   deliveredAt: Date
//   userId?: string
//   shippingAddress?: ShippingAddress
//   paymentResult?: PaymentResult
//   orderItems?: OrderItem[]
//   createdAt?: Date
//   updatedAt?: Date
//   deletedAt?: Date | null
// }
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
  userId: string // Add userId here
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
    lat: number
    lng: number
  }
  paymentResult: {
    paymentId: string
    status: string
    update_time: Date
    email_address: string
  }
  orderItems: {
    name: string
    quantity: number
    price: number
    productId: string
  }[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

class Order extends Model {
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
  declare userId: string
  declare shippingAddress?: ShippingAddress
  declare paymentResult?: PaymentResult
  declare orderItems?: OrderItem[]
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
