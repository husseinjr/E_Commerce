import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'
import Order from './Order'

interface PaymentResultAttributes {
  paymentId: string
  status: string
  update_time: Date
  email_address: string
  orderId?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

type PaymentResultCreationAttributes = Optional<
  PaymentResultAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

class PaymentResult extends Model<
  PaymentResultAttributes,
  PaymentResultCreationAttributes
> {
  declare paymentId: string
  declare status: string
  declare update_time: number
  declare email_address: number
  id: any
}

PaymentResult.init(
  {
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    modelName: 'PaymentResult',
  }
)

export default PaymentResult
