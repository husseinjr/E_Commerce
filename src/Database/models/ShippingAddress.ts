import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'

interface ShippingAddressAttributes {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
  lat: number
  lng: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
type ShippingCreationAttributes = Optional<
  ShippingAddressAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>
class ShippingAddress extends Model<
  ShippingAddressAttributes,
  ShippingCreationAttributes
> {
  declare fullName: string
  declare address: string
  declare city: string
  declare postalCode: string
  declare country: string
  declare lat: number
  declare lng: number
    id: any
}

ShippingAddress.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  {
    sequelize: db,
    modelName: 'ShippingAddress',
  }
)

export default ShippingAddress
