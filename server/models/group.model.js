export default (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Group.associate = (models) => {
    Group.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
    });

    Group.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      as: "teacher",
    });

    Group.hasMany(models.Student, {
      foreignKey: "groupId",
      as: "students",
    });
  };

  return Group;
};
