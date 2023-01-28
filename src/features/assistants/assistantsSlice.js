import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ASSISTANTS_URL = "http://localhost:5000/assistants";

const formActive = false;
const initialState = { formActive, status: "idle", error: null };

export const fetchAssistants = createAsyncThunk(
  "assistants/fetchAssistants",
  async () => {
    try {
      const response = await axios.get(ASSISTANTS_URL);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const assistantsSlice = createSlice({
  name: "assistants",
  initialState,
  reducers: {
    addAssistant: {
      reducer(state, action) {
        state.assistants.push(action.payload);
        state.formActive = !state.formActive;
      },
      prepare(firstName, lastName, phone, email, sick) {
        return {
          payload: {
            firstName,
            lastName,
            phone,
            email,
            sick,
          },
        };
      },
    },
    isSick(state, action) {
      console.log(state.assistants);
      state.assistants.map((assistant) =>
        assistant.email === action.payload
          ? (assistant.sick = !assistant.sick)
          : assistant.sick
      );
    },
    deleteAssistant(state, action) {
      state.assistants = state.assistants.filter(
        (assistant) => assistant.email !== action.payload
      );
    },
    activateAddAssistantForm(state) {
      state.formActive = !state.formActive;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssistants.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAssistants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assistants = action.payload;
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addAssistant,
  isSick,
  deleteAssistant,
  activateAddAssistantForm,
} = assistantsSlice.actions;

export const selectAllAssistants = (state) => state.assistants.assistants;
export const getAssistantsStatus = (state) => state.assistants.status;
export const getAssistantsError = (state) => state.assistants.error;

export const isAddAssistantFormActive = (state) => state.assistants.formActive;

export default assistantsSlice.reducer;
