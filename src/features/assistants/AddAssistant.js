import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssistant, isAddAssistantFormActive } from "./assistantsSlice";

const AddAssistant = () => {
  const dispatch = useDispatch();
  const isFormActive = useSelector(isAddAssistantFormActive);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const canSave = Boolean(firstName) && Boolean(lastName) && Boolean(phone);

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);

  const onSaveAssistantClicked = () => {
    if (canSave) {
      let email =
        firstName.trim() + "." + lastName.trim() + "@dentistcompanybvt.com";
      email = email.toLowerCase().replaceAll(" ", ".");
      dispatch(addAssistant(firstName, lastName, phone, email, false));
    }
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setPhone("");
  }, [!isFormActive]);

  return (
    <section className={isFormActive ? "forms" : "inActive"}>
      <h2>Add Assistant</h2>
      <form autoComplete="off" action="">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => onFirstNameChanged(e)}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => onLastNameChanged(e)}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="firstName"
          value={phone}
          onChange={(e) => onPhoneChanged(e)}
        />
        <div>
          <button
            type="button"
            onClick={onSaveAssistantClicked}
            disabled={!canSave}
          >
            Save Assistant
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddAssistant;
