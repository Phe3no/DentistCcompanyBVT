import { useDispatch } from "react-redux";
import AddClient from "../../../features/clients/AddClient";
import SearchClient from "../../../features/clients/SearchClient";
import ClientsList from "../../../features/clients/ClientsList";
import AddAppointment from "../../../features/appointments/AddAppointment";
import {
  activateSearchClientForm,
  activateAddClientForm,
} from "../../../features/clients/clientsSlice";
import "./clients.css";

const Clients = ({ isActive }) => {
  const dispatch = useDispatch();

  const onAddClientClicked = () => dispatch(activateAddClientForm());
  const onSearchClientClicked = () => dispatch(activateSearchClientForm());

  return (
    <div className={isActive ? "active" : "inActive"}>
      <nav className="search">
        <h2>Clients</h2>
        <button type="button" onClick={onAddClientClicked}>
          Add client
        </button>
        <button type="button" onClick={onSearchClientClicked}>
          Search client
        </button>
      </nav>
      <AddClient />
      <SearchClient />
      <AddAppointment />
      <ClientsList />
    </div>
  );
};

export default Clients;
