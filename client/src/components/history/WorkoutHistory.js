import React from "react";
import ExerciseHistory from "./ExerciseHistory";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { workoutThunks } from "../../store/workouts";
import { shortDateFormat } from "../utils/Formatter";

export default function WorkoutHistory({ workout }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { exerciseIds, id, workoutDate, workoutSplit } = workout;
  if (!workout || !exerciseIds) return null;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(workoutThunks.deleteWorkout(id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/workout/edit/${id}`);
  };

  const dateStr = shortDateFormat(workoutDate);

  return (
    <div className="workout-history__workout-container">
      <div className="workout-history__workout-info">
        <div className="workout-history__date">{dateStr}</div>
        <div className="workout-history__split">{workoutSplit} Day</div>
      </div>
      <div className="workout-history__exercises-container">
        {exerciseIds.map((exerciseId, index) => (
          <ExerciseHistory key={index} exerciseId={exerciseId} />
        ))}
      </div>
      <span className="workout-history__button-container">
        <div className="workout-history__button" onClick={handleEdit}>Edit</div>
        <div className="workout-history__button" onClick={handleDelete}>Delete</div>
      </span>
    </div>
  );
}
