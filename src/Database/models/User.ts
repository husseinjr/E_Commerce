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

export default User
