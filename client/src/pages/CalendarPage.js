import React from "react";
import { useSelector } from "react-redux";

export default function CalendarPage() {
  const workouts = useSelector((state) => state.workouts);

  return <div>calendar</div>;
}
