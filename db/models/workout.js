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
				type: DataTypes.DATEONLY,
				allowNull: true,
				defaultValue: null,
			},
			workoutComplete: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			workoutSplit: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			}
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
