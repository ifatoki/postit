export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Group, {
      foreignKey: 'creatorId',
      as: 'groupsCreated'
    });
    User.hasMany(models.Message, {
      foreignKey: 'authorId',
    });
    User.belongsToMany(models.Group, {
      through: 'UserGroup',
      foreignKey: 'userId',
    });
  };

  return User;
};
