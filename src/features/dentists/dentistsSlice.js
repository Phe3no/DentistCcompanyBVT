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

export const saveDentist = createAsyncThunk(
  "dentists/saveDentist",
  async (initialDentist) => {
    try {
      const response = await axios.post(DENTISTS_URL, initialDentist);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateDentist = createAsyncThunk(
  "dentists/updateDentists",
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
    addDentist: {
      reducer(state, action) {
        state.dentists.push(action.payload);
        state.formActive = !state.formActive;
      },
      prepare(firstName, lastName, phone, email) {
        return {
          payload: {
            firstName,
            lastName,
            phone,
            email,
          },
        };
      },
    },
    isSick(state, action) {
      state.dentists.map((dentist) =>
        dentist.email === action.payload
          ? (dentist.sick = !dentist.sick)
          : dentist.sick
      );
    },
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
      .addCase(saveDentist.fulfilled, (state, action) => {
        state.dentists.push(action.payload);
        state.formActive = !state.formActive;
      })
      .addCase(updateDentist.fulfilled, (state, action) => {
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

export const { addDentist, isSick, activateAddDentistForm } =
  dentistsSlice.actions;

export const getAllDentists = (state) => state.dentists.dentists;
export const getDentistsStatus = (state) => state.dentists.status;
export const getDentistsError = (state) => state.dentists.error;

export const isAddDentistFormActive = (state) => state.dentists.formActive;

export default dentistsSlice.reducer;
