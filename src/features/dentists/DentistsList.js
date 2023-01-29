import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { updateDentist, deleteDentist, getAllDentists } from "./dentistsSlice";

const DentistsList = () => {
  const dispatch = useDispatch();
  const dentists = useSelector(getAllDentists);
  const [requestStatus, setRequestStatus] = useState("idle");

  const onSickCheckboxChanged = (dentist) => {
    const sickSwitch = { ...dentist };
    sickSwitch.sick = !sickSwitch.sick;
    try {
      setRequestStatus("pending");
      dispatch(updateDentist(sickSwitch)).unwrap();
    } catch (err) {
      console.log("Failed to update dentist", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const onDeleteClicked = (id) => {
    try {
      setRequestStatus("pending");
      dispatch(deleteDentist({ id })).unwrap();
    } catch (err) {
      console.log("Failed to delete the dentists", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const renderedDentists = dentists.map((dentist, index) => (
    <article key={index}>
      <h3>{`${dentist.firstName} ${dentist.lastName}`}</h3>
      <div className="details">
        <span>
          <MdOutlinePhone />
          <p>{dentist.phone}</p>
        </span>
        <span>
          <MdOutlineEmail />
          <p>{dentist.email}</p>
        </span>
        <span>
          <MdOutlineSick />
          <input
            type="checkbox"
            onChange={(e) => onSickCheckboxChanged(dentist)}
            checked={dentist.sick}
          />
          <button type="button" onClick={() => onDeleteClicked(dentist.id)}>
            <MdOutlineDelete />
          </button>
        </span>
      </div>
    </article>
  ));

  return <section className="views dentist">{renderedDentists}</section>;
};

export default DentistsList;
