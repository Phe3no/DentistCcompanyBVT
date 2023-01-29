import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDentist, isAddDentistFormActive } from "./dentistsSlice";

const AddDentist = () => {
  const dispatch = useDispatch();
  const isFormActive = useSelector(isAddDentistFormActive);
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

  const onSaveDentistClicked = () => {
    if (canSave) {
      let email =
        firstName.trim() + "." + lastName.trim() + "@dentistcompanybvt.com";
      email = email.toLowerCase().replaceAll(" ", ".");
      try {
        setAddRequestStatus("pending");
        dispatch(
          saveDentist({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            sick: false,
          })
        ).unwrap();
      } catch (err) {
        console.error("Failed to save the dentist", err);
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
      <h2>Add Dentist</h2>
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
            onClick={onSaveDentistClicked}
            disabled={!canSave}
          >
            Save dentist
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddDentist;
