// create a model for comments that will be associated with blog posts

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const dayjs = require('dayjs');

class Comments extends Model {}

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW,
        get() {
            return dayjs(this.getDataValue('date_created')).format('MMM D, YYYY h:mm A');
        }
    },
    blogPost_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blogPost',
            key: 'id',
        },
    },
    creator_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
}, 
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
});

module.exports = Comments;