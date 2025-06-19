import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Habbit = sequelize.define('Habbit', {
  // Model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(['Done', 'Pending', 'In Progress']),
    default: 'Pending',
    allowNull: false
  },
  frequency: {
    type: DataTypes.ENUM(['Daily', 'Weekly', 'BiWeekly' ,'Monthly'])
  }
}, {
  tableName: 'habbits',
  timestamps: true // Adds createdAt and updatedAt columns
});

// Method to get habbit details
Habbit.prototype.getDetails = function() {
  return `${this.title} by ${this.author} - ${this.price}`;
};

export default Habbit;
