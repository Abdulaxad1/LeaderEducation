export default (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });

    Attendance.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
    });
  };

  return Attendance;
};
