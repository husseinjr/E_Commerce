import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'
import hash from '../../services/hashPassword'

interface UserAttributes {
  id: string
  name: string
  isAdmin: boolean
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
class User extends Model<UserAttributes, UserCreationAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue('password', hash(value))
      },
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    createdAt: true,
    paranoid: true,
  }
)

// product table

interface ProductAttributes {
  id: string
  name: string
  slug: string
  image: string
  brand: string
  category: string
  description: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
class Product extends Model<ProductAttributes, ProductCreationAttributes> {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      defaultValue: false,
    },

    image: {
      type: DataTypes.STRING,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    countInStock: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    rating: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    numReviews: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'products',
    createdAt: true,
    paranoid: true,
  }
)
