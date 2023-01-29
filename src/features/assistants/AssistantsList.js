import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import {
  updateAssistantSick,
  deleteAssistant,
  selectAllAssistants,
} from "./assistantsSlice";

const AssistantsList = () => {
  const dispatch = useDispatch();
  const assistants = useSelector(selectAllAssistants);
  const [requestStaus, setRequestStatus] = useState("idle");

  const onSickCheckboxChanged = (assistant) => {
    const sickSwitch = { ...assistant };
    sickSwitch.sick = !sickSwitch.sick;
    console.log(sickSwitch);
    try {
      setRequestStatus("pending");
      dispatch(updateAssistantSick(sickSwitch)).unwrap();
    } catch (err) {
      console.log("Failed to update dentist sick", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const onDeleteClicked = (id) => {
    try {
      setRequestStatus("pending");
      dispatch(deleteAssistant({ id })).unwrap();
    } catch (err) {
      console.log("Failed to delete the assistant", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const renderedAssistants = assistants.map((assistant, index) => (
    <article key={index}>
      <h3>{`${assistant.firstName} ${assistant.lastName}`}</h3>
      <div className="details">
        <span>
          <MdOutlinePhone />
          <p>{assistant.phone}</p>
        </span>
        <span>
          <MdOutlineEmail />
          <p>{assistant.email}</p>
        </span>
        <span>
          <MdOutlineSick />
          <input
            type="checkbox"
            onChange={() => onSickCheckboxChanged(assistant)}
            checked={assistant.sick}
          />
          <button type="button" onClick={() => onDeleteClicked(assistant.id)}>
            <MdOutlineDelete />
          </button>
        </span>
      </div>
    </article>
  ));

  return <section className="views assistant">{renderedAssistants}</section>;
};

export default AssistantsList;
