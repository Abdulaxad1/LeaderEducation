export default (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  });

  Student.associate = (models) => {
    Student.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
    });

    Student.hasMany(models.Attendance, {
      foreignKey: "studentId",
      as: "attendances",
    });

    Student.hasMany(models.Grade, {
      foreignKey: "studentId",
      as: "grades",
    });

    Student.hasMany(models.Payment, {
      foreignKey: "studentId",
      as: "payments",
    });

    Student.hasMany(models.Certificate, {
      foreignKey: "studentId",
      as: "certificates",
    });
  };

  return Student;
};
