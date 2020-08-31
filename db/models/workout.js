"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define(
    "Workout",
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
				defaultValue: sequelize.fn("NOW"),
			},
    },
    {}
  );
  Workout.associate = function (models) {
    Workout.belongsTo(models.User, {
			foreignKey: 'userId'
		});
		Workout.hasMany(models.Exercise, {
			foreignKey: 'workoutId'
		});
		Workout.hasOne(models.WorkoutNote, {
			foreignKey: 'workoutId'
		})
  };
  return Workout;
};
