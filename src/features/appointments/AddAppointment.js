import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClient,
  allDayValues,
  allTimeValues,
  addNewAppointment,
  addAppointmentWithoutAssistant,
  deactivateAddAppointmentForm,
  isAddAppointmentFormActive,
  addAppointmentWithAssistant,
  filterDentist,
} from "./appointmentsSlice";
import { getAllDentists } from "../dentists/dentistsSlice";
import { getAllAssistants } from "../assistants/assistantsSlice";

const AddAppointment = () => {
  const dispatch = useDispatch();

  const dayValues = useSelector(allDayValues);
  const timeValues = useSelector(allTimeValues);
  const dentists = useSelector(getAllDentists);
  const assistants = useSelector(getAllAssistants);
  const isFormActive = useSelector(isAddAppointmentFormActive);
  const client = useSelector(getClient);

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [dentist, setDentist] = useState("");
  const [assistant, setAssistant] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  useEffect(() => {
    setDay("");
    setTime("");
    setDentist("");
    setAssistant("");
  }, [!isFormActive, setDentist, client, setDay]);

  const data = {
    day: day,
    time: time,
    client: { ...client },
    dentist: dentist,
    assistant: assistant,
  };

  const onDayChanged = (e) => {
    setDay(e.target.value);
    dispatch(addAppointmentWithoutAssistant(e.target.value));
    data.day = day;
    //setTime("");
  };

  const onTimeChanged = (e) => {
    setTime(e.target.value);
    data.time = time;
  };

  const onDentistChanged = (e) => {
    setDentist(e.target.value);
    dispatch(filterDentist(e.target.value));
  };

  const onAssistantChanged = (e) => {
    const filteredAssistant = assistants.filter(
      (assistant) => assistant.email === e.target.value
    );
    if (filteredAssistant.length === 1) {
      setAssistant(e.target.value);
      data.assistant = filteredAssistant[0];
    }
  };

  const renderAllDayValues = dayValues.map((day, index) => (
    <option key={index} value={day}>
      {day}
    </option>
  ));

  const renderAllTimeValues = timeValues.map((time, index) => (
    <option key={index} value={time}>
      {time}
    </option>
  ));

  const renderAllDentists = dentists.map((item, index) => (
    <option key={index} value={item.email}>
      {`${item.firstName} ${item.lastName}`}
    </option>
  ));

  const renderAllAssistants = assistants.map((item, index) => (
    <option key={index} value={item.email}>
      {`${item.firstName} ${item.lastName}`}
    </option>
  ));

  const dentistChosen = Boolean(dentist);
  const dayChosen = Boolean(day);
  const canSave =
    [day, time, dentist].every(Boolean) && addRequestStatus === "idle";

  const onSaveAppointmentClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewAppointment(data));
      } catch (err) {
        console.error("failed to save the appointment", err);
      } finally {
        setAddRequestStatus("idle");
      }
      dispatch(deactivateAddAppointmentForm({}));
    }
  };

  return (
    <section className={isFormActive ? "forms" : "inActive"}>
      <h2>Add Appointment</h2>
      <form autoComplete="off" action="">
        <select
          id="add-dentist"
          name="add-dentist"
          onChange={(e) => onDentistChanged(e)}
          value={dentist}
        >
          <option hidden>Add dentist</option>
          {renderAllDentists}
        </select>
        <select
          id="add-assistant"
          name="add-assistant"
          value={assistant}
          onChange={(e) => onAssistantChanged(e)}
        >
          <option hidden>Add assistant</option>
          <option>none</option>
          {renderAllAssistants}
        </select>
        <select
          id="add-day"
          name="add-day"
          value={day}
          onChange={(e) => onDayChanged(e)}
          disabled={!dentistChosen}
        >
          <option hidden>Add day</option>
          {renderAllDayValues}
        </select>
        <select
          id="add-time"
          name="add-time"
          value={time}
          onChange={(e) => onTimeChanged(e)}
          disabled={!dayChosen}
        >
          <option hidden>Add time</option>
          {renderAllTimeValues}
        </select>

        <div>
          <button
            type="button"
            onClick={onSaveAppointmentClicked}
            disabled={!canSave}
          >
            Save Appointment
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddAppointment;
