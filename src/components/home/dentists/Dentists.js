import { useDispatch } from "react-redux";
import AddDentist from "../../../features/dentists/AddDentist";
import DentistsList from "../../../features/dentists/DentistsList";
import { activateAddDentistForm } from "../../../features/dentists/dentistsSlice";
import "./dentists.css";

const Dentists = ({ isActive }) => {
  const dispatch = useDispatch();

  const onAddDentistClicked = () => dispatch(activateAddDentistForm());

  return (
    <div className={isActive ? "active" : "inActive"}>
      <nav>
        <h2>Dentists</h2>
        <button type="button" onClick={onAddDentistClicked}>
          Add dentist
        </button>
      </nav>
      <AddDentist />
      <DentistsList />
    </div>
  );
};

export default Dentists;
