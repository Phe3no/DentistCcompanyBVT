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

export const addAssistant = createAsyncThunk(
  "assistants/addAssistant",
  async (initialAssistant) => {
    console.log(initialAssistant);
    try {
      const response = await axios.post(ASSISTANTS_URL, initialAssistant);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateAssistantSick = createAsyncThunk(
  "assistants/updateAssistantSick",
  async (initialAssistant) => {
    const { id } = initialAssistant;
    try {
      const response = await axios.put(
        `${ASSISTANTS_URL}/${id}`,
        initialAssistant
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteAssistant = createAsyncThunk(
  "assistants/deleteAssistant",
  async (initialAssistant) => {
    const { id } = initialAssistant;
    try {
      const response = await axios.delete(`${ASSISTANTS_URL}/${id}`);
      if (response?.status === 200) return initialAssistant;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const assistantsSlice = createSlice({
  name: "assistants",
  initialState,
  reducers: {
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
      })
      .addCase(addAssistant.fulfilled, (state, action) => {
        state.assistants.push(action.payload);
        state.formActive = !state.formActive;
      })
      .addCase(updateAssistantSick.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update assistant could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.assistants.map((assistant) =>
          assistant.id === id
            ? (assistant.sick = !assistant.sick)
            : assistant.sick
        );
      })
      .addCase(deleteAssistant.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete assistant could not compleet");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.assistants = state.assistants.filter(
          (assistant) => assistant.id !== id
        );
      });
  },
});

export const { activateAddAssistantForm } = assistantsSlice.actions;

export const selectAllAssistants = (state) => state.assistants.assistants;
export const getAssistantsStatus = (state) => state.assistants.status;
export const getAssistantsError = (state) => state.assistants.error;

export const isAddAssistantFormActive = (state) => state.assistants.formActive;

export default assistantsSlice.reducer;
