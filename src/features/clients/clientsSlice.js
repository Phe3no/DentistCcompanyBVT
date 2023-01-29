import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { clients } from "../../app/companyData.js";
import axios from "axios";

const CLIENTS_URL = "http://localhost:5000/clients";

const addFormActive = false;
const searchFormActive = false;
let searchByNameValue = "";
let searchByBirthyearValue = "";
const initialState = {
  clients: {},
  addFormActive,
  searchFormActive,
  searchByNameValue,
  searchByBirthyearValue,
  status: "idle",
  error: null,
};

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    try {
      const response = await axios.get(CLIENTS_URL);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addClient = createAsyncThunk(
  "client/addClient",
  async (initialClient) => {
    try {
      const response = await axios.post(CLIENTS_URL, initialClient);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateClientSick = createAsyncThunk(
  "clients/updateClientssSick",
  async (initialClient) => {
    const { id } = initialClient;
    try {
      const response = await axios.put(`${CLIENTS_URL}/${id}`, initialClient);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    isSick(state, action) {
      state.clients.map((client) =>
        client.email === action.payload
          ? (client.sick = !client.sick)
          : client.sick
      );
    },
    deleteClient(state, action) {
      state.clients = state.clients.filter(
        (client) => client.email !== action.payload
      );
    },
    searchClientByName: {
      reducer(state, action) {
        state.searchByNameValue = action.payload;
      },
    },
    searchClientByBirthyear: {
      reducer(state, action) {
        state.searchByBirthyearValue = action.payload;
      },
    },
    activateSearchClientForm(state) {
      state.searchFormActive = !state.searchFormActive;
      if (state.addFormActive) {
        state.addFormActive = !state.addFormActive;
      }
    },
    activateAddClientForm(state) {
      state.addFormActive = !state.addFormActive;
      if (state.searchFormActive) {
        state.searchFormActive = !state.searchFormActive;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClients.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedClients = action.payload;
        state.clients = loadedClients;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
        state.addFormActive = !state.addFormActive;
      })
      .addCase(updateClientSick.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update client sick could not compleet");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.clients.map((client) =>
          client.id === id ? (client.sick = !client.sick) : client.sick
        );
      });
  },
});

export const {
  isSick,
  deleteClient,
  searchClientByName,
  searchClientByBirthyear,
  activateSearchClientForm,
  activateAddClientForm,
} = clientSlice.actions;

export const getAllClients = (state) => state.clients.clients;
export const getClientsStatus = (state) => state.clients.status;
export const getClientsError = (state) => state.clients.error;

export const selectSearchByNameValue = (state) =>
  state.clients.searchByNameValue;

export const selectSearchByBirthdayValue = (state) =>
  state.clients.searchByBirthyearValue;

export const isSearchClientFormActive = (state) =>
  state.clients.searchFormActive;

export const isAddClientFormActive = (state) => state.clients.addFormActive;

export default clientSlice.reducer;
