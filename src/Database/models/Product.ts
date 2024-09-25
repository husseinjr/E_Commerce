import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'

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
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    numReviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Product',
    tableName: 'products',
    createdAt: true,
    paranoid: true,
  }
)

export default Product
