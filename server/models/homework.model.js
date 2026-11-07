export default (sequelize, DataTypes) => {
  const Homework = sequelize.define("Homework", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Homework.associate = (models) => {
    Homework.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
    });
  };

  return Homework;
};
