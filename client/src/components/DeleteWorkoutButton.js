import React from "react";
import {useDispatch} from 'react-redux';
import { deleteWorkoutThunk } from "../store/workouts";

export default function DeleteWorkoutButton({id}) {
	const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteWorkoutThunk(id));
  };
  return (
    <div className="workout__delete-button" onClick={handleDelete}>
      <i className="fa fa-trash" id={id} />
    </div>
  );
}
