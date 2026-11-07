export default (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Group, {
      foreignKey: "teacherId",
      as: "groups",
    });

    Teacher.hasMany(models.Homework, {
      foreignKey: "teacherId",
      as: "homeworks",
    });

    Teacher.hasMany(models.Material, {
      foreignKey: "teacherId",
      as: "materials",
    });
  };

  return Teacher;
};
