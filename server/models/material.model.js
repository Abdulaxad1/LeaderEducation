export default (sequelize, DataTypes) => {
  const Material = sequelize.define("Material", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Material.associate = (models) => {
    Material.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
    });
  };

  return Material;
};
