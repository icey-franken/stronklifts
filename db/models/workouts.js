"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workouts = sequelize.define(
    "Workouts",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
      workoutDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
    },
    {}
  );
  Workouts.associate = function (models) {
    Workouts.belongsTo(models.Users, {
			foreignKey: 'userId'
		});
		Workouts.hasMany(models.Exercises, {
			foreignKey: 'workoutId'
		});
		Workouts.hasOne(models.WorkoutNotes, {
			foreignKey: 'workoutId'
		})
  };
  return Workouts;
};
