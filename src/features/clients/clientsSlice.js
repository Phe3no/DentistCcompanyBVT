import { createSlice } from "@reduxjs/toolkit";
import { clients } from "../../app/companyData.js";

const addFormActive = false;
const searchFormActive = false;
let searchByNameValue = "";
let searchByBirthyearValue = "";
const initialState = {
  clients,
  addFormActive,
  searchFormActive,
  searchByNameValue,
  searchByBirthyearValue,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: {
      reducer(state, action) {
        state.clients.push(action.payload);
        state.addFormActive = !state.addFormActive;
      },
      prepare(firstName, lastName, birthYear, phone, email, sick) {
        return {
          payload: {
            firstName,
            lastName,
            birthYear,
            phone,
            email,
            sick,
          },
        };
      },
    },
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
});

export const {
  addClient,
  isSick,
  deleteClient,
  searchClientByName,
  searchClientByBirthyear,
  activateSearchClientForm,
  activateAddClientForm,
} = clientSlice.actions;

export const selectAllClients = (state) => state.clients.clients;

export const selectSearchByNameValue = (state) =>
  state.clients.searchByNameValue;

export const selectSearchByBirthdayValue = (state) =>
  state.clients.searchByBirthyearValue;

export const isSearchClientFormActive = (state) =>
  state.clients.searchFormActive;

export const isAddClientFormActive = (state) => state.clients.addFormActive;

export default clientSlice.reducer;
