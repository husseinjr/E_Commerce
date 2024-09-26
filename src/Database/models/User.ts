import { Model, DataTypes, Optional } from 'sequelize'
import db from '../connection/dbCon'
import hash from '../../services/hashPassword'

interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string
  declare name: string
  declare email: string
  declare isAdmin: boolean
  declare password: string
}

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
      unique: true,
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
    modelName: 'User',
    tableName: 'users',
    createdAt: true,
  }
)

export default User
