export default (sequelize, DataTypes) => {
  const Grade = sequelize.define("Grade", {
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
    examName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Grade.associate = (models) => {
    Grade.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });

    Grade.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
    });
  };

  return Grade;
};
