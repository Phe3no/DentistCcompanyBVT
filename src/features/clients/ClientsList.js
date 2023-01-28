import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import {
  isSick,
  deleteClient,
  selectAllClients,
  selectSearchByNameValue,
  selectSearchByBirthdayValue,
} from "./clientsSlice";
import { activateAddAppointmentForm } from "../appointments/appointmentsSlice";

const ClientsList = () => {
  const dispatch = useDispatch();

  const nameValue = useSelector(selectSearchByNameValue);
  const birthdayValue = useSelector(selectSearchByBirthdayValue);
  const clients = useSelector(selectAllClients);
  const clientsFilteredByName = clients.filter((client) =>
    client.lastName.toLowerCase().startsWith(nameValue.toLowerCase())
  );
  const clientsFilteredByBirthyear = clientsFilteredByName.filter((client) =>
    client.birthYear.toString().includes(birthdayValue)
  );

  const onSickCheckboxChanged = (email) => {
    dispatch(isSick(email));
  };

  const onDeleteClicked = (email) => dispatch(deleteClient(email));

  const onMakeAppointmentClicked = (client) => {
    dispatch(activateAddAppointmentForm(client));
  };

  const renderedClients = clientsFilteredByBirthyear.map((client, index) => (
    <article key={index}>
      <h3>{`${client.firstName} ${client.lastName}`}</h3>
      <div className="details">
        <span>
          <p>Birth year: {client.birthYear}</p>
        </span>
        <span>
          <MdOutlinePhone />
          <p>{client.phone}</p>
        </span>
        <span>
          <MdOutlineEmail />
          <p>{client.email}</p>
        </span>
        <span>
          <MdOutlineSick />
          <input
            type="checkbox"
            onChange={() => onSickCheckboxChanged(client.email)}
            checked={client.sick}
          />
          <button type="button" onClick={() => onDeleteClicked(client.email)}>
            <MdOutlineDelete />
          </button>
          <button
            type="button"
            onClick={(e) => onMakeAppointmentClicked(client)}
          >
            Make appointment
          </button>
        </span>
      </div>
    </article>
  ));

  return <section className="views client">{renderedClients}</section>;
};

export default ClientsList;
