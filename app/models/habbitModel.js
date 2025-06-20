import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

// sequelize or any ORM enforces validation at model level, not at application level 
// (before request hit the db). We  need to use a dedicated validator like joi,
//  or express-validator for this purpose

const Habbit = sequelize.define('Habbit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name must not be empty' },
      len: {
        args: [2, 200],
        msg: 'Name must be between 2 and 200 characters'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('Done', 'Pending', 'In Progress'),
    allowNull: false,
    defaultValue: 'Pending',
    validate: {
      isIn: {
        args: [['Done', 'Pending', 'In Progress']],
        msg: 'Status must be one of: Done, Pending, In Progress'
      }
    }
  },
  frequency: {
    type: DataTypes.ENUM('Daily', 'Weekly', 'BiWeekly', 'Monthly'),
    allowNull: true,
    validate: {
      isIn: {
        args: [['Daily', 'Weekly', 'BiWeekly', 'Monthly']],
        msg: 'Frequency must be one of: Daily, Weekly, BiWeekly, Monthly'
      }
    }
  }
}, {
  tableName: 'habbits',
  timestamps: true
});

// Method to get habbit details
Habbit.prototype.getDetails = function () {
  return `${this.title} by ${this.author} - ${this.price}`;
};

export default Habbit;