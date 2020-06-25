export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  });

  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'authorId',
    });
    Message.belongsToMany(models.Group, {
      through: 'GroupMessage',
      foreignKey: 'messageId',
    });
  };

  return Message;
};
