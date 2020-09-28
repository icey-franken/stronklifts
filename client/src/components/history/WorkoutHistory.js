import React from "react";
import ExerciseHistory from "./ExerciseHistory";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from 'react-router-dom';
// import WorkoutContainerPage from '../../pages/WorkoutPage';
// import "./WorkoutHistory.css"; //need to create
// import DeleteWorkoutButton from "../utils/DeleteWorkoutButton";
// import "./history.css";
import { workoutThunks } from "../../store/workouts";

export default function WorkoutHistory({ workoutId }) {
  const dispatch = useDispatch();
	const history = useHistory();
  const workout = useSelector((state) => state.workouts[workoutId]);
  const { exerciseIds } = workout;
  if (!workout) return null;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(workoutThunks.deleteWorkout(workoutId));
  };

  const handleEdit = (e) => {
    e.preventDefault();
		history.push(`/workout/edit/${workoutId}`);
		// return (
    //   <Redirect to={`/workout/edit/${workoutId}`}/>
    // );
  };

  // import date formatter - for now we copy
  //date formatting
  const dateFormat = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  let dateArr;
  if (workout.workoutDate === null) {
    dateArr = dateFormat.formatToParts(Date.now());
  } else {
    dateArr = dateFormat.formatToParts(new Date(workout.workoutDate));
  }
  let dateStr = "";
  dateArr.forEach((el) => (dateStr += el.value));
  //date string day number is behind by 1 - what the fuck?

  return (
    <div className="workout-history__workout-container">
      <div className="workout-history__workout-info">
        <div className="workout-history__date">{dateStr}</div>
        <div className="workout-history__split">{workout.workoutSplit} Day</div>
      </div>
      <div className="workout-history__exercises-container">
        {exerciseIds.map((exerciseId, index) => (
          <ExerciseHistory key={index} exerciseId={exerciseId} />
        ))}
      </div>
      {/* include another button for editing workout */}
      <span className="workout-history__button-container">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </span>
    </div>
  );
}
