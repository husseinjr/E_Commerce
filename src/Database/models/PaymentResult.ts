import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'

interface PaymentResultAttributes {
  paymentId: string
  status: string
  update_time: Date
  email_address: string
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
  },
  {
    sequelize: db,
    modelName: 'PaymentResult',
  }
)

export default PaymentResult
