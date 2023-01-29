import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DENTISTS_URL = "http://localhost:5000/dentists";

const formActive = false;
const initialState = { dentists: {}, formActive, status: "idle", error: null };

export const fetchDentists = createAsyncThunk(
  "dentists/fetchDentists",
  async () => {
    try {
      const response = await axios.get(DENTISTS_URL);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addDentist = createAsyncThunk(
  "dentists/addDentist",
  async (initialDentist) => {
    try {
      const response = await axios.post(DENTISTS_URL, initialDentist);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateDentistSick = createAsyncThunk(
  "dentists/updateDentistsSick",
  async (initialDentist) => {
    const { id } = initialDentist;
    try {
      const response = await axios.put(`${DENTISTS_URL}/${id}`, initialDentist);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteDentist = createAsyncThunk(
  "dentists/deleteDentist",
  async (initialDentist) => {
    const { id } = initialDentist;
    try {
      const response = await axios.delete(`${DENTISTS_URL}/${id}`);
      if (response?.status === 200) return initialDentist;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const dentistsSlice = createSlice({
  name: "dentists",
  initialState,
  reducers: {
    activateAddDentistForm(state) {
      state.formActive = !state.formActive;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDentists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDentists.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedDentists = action.payload;
        state.dentists = loadedDentists;
      })
      .addCase(fetchDentists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDentist.fulfilled, (state, action) => {
        state.dentists.push(action.payload);
        state.formActive = !state.formActive;
      })
      .addCase(updateDentistSick.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not compleet");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.dentists.map((dentist) =>
          dentist.id === id ? (dentist.sick = !dentist.sick) : dentist.sick
        );
      })
      .addCase(deleteDentist.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not compleet");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.dentists = state.dentists.filter((dentist) => dentist.id !== id);
      });
  },
});

export const { activateAddDentistForm } = dentistsSlice.actions;

export const getAllDentists = (state) => state.dentists.dentists;
export const getDentistsStatus = (state) => state.dentists.status;
export const getDentistsError = (state) => state.dentists.error;

export const isAddDentistFormActive = (state) => state.dentists.formActive;

export default dentistsSlice.reducer;
