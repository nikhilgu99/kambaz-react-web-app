import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter((a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      const oldAssignment = state.assignments.find((a: any) => a._id === assignment._id);
      if (oldAssignment) {
        Object.assign(oldAssignment, assignment);
      } else {
        state.assignments = [...state.assignments, assignment] as any;
      }
    },
  },
});
export const { deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;