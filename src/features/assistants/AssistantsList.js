import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import {
  isSick,
  deleteAssistant,
  selectAllAssistants,
} from "./assistantsSlice";

const AssistantsList = () => {
  const dispatch = useDispatch();
  const assistants = useSelector(selectAllAssistants);

  const onSickCheckboxChanged = (email) => {
    dispatch(isSick(email));
    console.log("check");
  };

  const onDeleteClicked = (email) => dispatch(deleteAssistant(email));

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
            onChange={() => onSickCheckboxChanged(assistant.email)}
            checked={assistant.sick}
          />
          <button
            type="button"
            onClick={() => onDeleteClicked(assistant.email)}
          >
            <MdOutlineDelete />
          </button>
        </span>
      </div>
    </article>
  ));

  return <section className="views assistant">{renderedAssistants}</section>;
};

export default AssistantsList;
