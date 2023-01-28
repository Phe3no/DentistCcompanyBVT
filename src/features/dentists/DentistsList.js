import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { isSick, deleteDentist, getAllDentists } from "./dentistsSlice";

const DentistsList = () => {
  const dispatch = useDispatch();
  const dentists = useSelector(getAllDentists);

  const onSickCheckboxChanged = (email) => {
    dispatch(isSick(email));
  };

  const onDeleteClicked = (email) => dispatch(deleteDentist(email));

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
            onChange={(e) => onSickCheckboxChanged(dentist.email)}
            checked={dentist.sick}
          />
          <button type="button" onClick={() => onDeleteClicked(dentist.email)}>
            <MdOutlineDelete />
          </button>
        </span>
      </div>
    </article>
  ));

  return <section className="views dentist">{renderedDentists}</section>;
};

export default DentistsList;
