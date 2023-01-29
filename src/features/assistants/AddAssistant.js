import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssistant, isAddAssistantFormActive } from "./assistantsSlice";

const AddAssistant = () => {
  const dispatch = useDispatch();
  const isFormActive = useSelector(isAddAssistantFormActive);
  const notActive = !isFormActive;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave =
    [firstName, lastName, phone].every(Boolean) && addRequestStatus === "idle";

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);

  const onSaveAssistantClicked = () => {
    if (canSave) {
      let email =
        firstName.trim() + "." + lastName.trim() + "@dentistcompanybvt.com";
      email = email.toLowerCase().replaceAll(" ", ".");
      try {
        setAddRequestStatus("pending");
        dispatch(
          addAssistant({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            sick: false,
          })
        ).unwrap();
      } catch (err) {
        console.error("Failed to save the assistant", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setPhone("");
  }, [notActive]);

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
