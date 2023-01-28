import { useDispatch } from "react-redux";
import AddAssistant from "../../../features/assistants/AddAssistant";
import AssistantsList from "../../../features/assistants/AssistantsList";
import { activateAddAssistantForm } from "../../../features/assistants/assistantsSlice";
import "./assistants.css";

const Assistants = ({ isActive }) => {
  const dispatch = useDispatch();

  const onAddAssistantClicked = () => dispatch(activateAddAssistantForm());

  return (
    <div className={isActive ? "active" : "inActive"}>
      <nav>
        <h2>Assistants</h2>
        <button type="button" onClick={onAddAssistantClicked}>
          Add Assistant
        </button>
      </nav>
      <AddAssistant />
      <AssistantsList />
    </div>
  );
};

export default Assistants;
