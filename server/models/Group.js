export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    purpose: DataTypes.STRING,
    creatorId: DataTypes.INTEGER
  });

  Group.associate = (models) => {
    // associations can be defined here
    Group.belongsTo(models.User, {
      foreignKey: 'creatorId'
    });
    Group.belongsToMany(models.User, {
      through: 'UserGroup',
      foreignKey: 'groupId',
    });
    Group.belongsToMany(models.Message, {
      through: 'GroupMessage',
      foreignKey: 'groupId',
    });
  };

  return Group;
};
