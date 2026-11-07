export default (sequelize, DataTypes) => {
  const Certificate = sequelize.define("Certificate", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    grade: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Certificate.associate = (models) => {
    Certificate.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });

    Certificate.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
    });
  };

  return Certificate;
};
