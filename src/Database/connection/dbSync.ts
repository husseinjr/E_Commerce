import db from './dbCon'
import UserModel from '../models/User'
import ProductModel from '../models/Product'
import OrderModel from '../models/Order'
import OrderItemModel from '../models/Order_Item'
import ShippingAddressModel from '../models/ShippingAddress'
import PaymentResultModel from '../models/PaymentResult'

const User = UserModel
const Product = ProductModel
const Order = OrderModel
const OrderItem = OrderItemModel
const ShippingAddress = ShippingAddressModel
const PaymentResult = PaymentResultModel

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => console.log('Unable to connect to the database: ', err))

// Associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' })
Order.belongsTo(PaymentResult, {
  foreignKey: 'paymentResultId',
  as: 'paymentResult',
})
Order.hasOne(ShippingAddress, { foreignKey: 'orderId', as: 'shippingAddress' })
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' })
OrderItem.belongsTo(Order, { foreignKey: 'orderId' })
OrderItem.belongsTo(Product, { foreignKey: 'productId' })
ShippingAddress.belongsTo(Order, { foreignKey: 'orderId' })
PaymentResult.hasOne(Order, { foreignKey: 'paymentResultId' })
ShippingAddress.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })

db.sync({force: true})
  .then(() => {
    console.log('connected successfully')
  })
  .catch((error) => {
    console.log('Somthig went worng ' + error)
  })

export default db
