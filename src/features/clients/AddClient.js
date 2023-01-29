import { unwrapResult } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient, isAddClientFormActive } from "./clientsSlice";

const AddClient = () => {
  const dispatch = useDispatch();
  const isFormActive = useSelector(isAddClientFormActive);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const canSave =
    [firstName, lastName, birthYear, phone, email].every(Boolean) &&
    requestStatus === "idle";

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onBirthYearChanged = (e) => setBirthYear(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);

  const onSaveClientClicked = (e) => {
    try {
      e.preventDefault();
      if (canSave) {
        setRequestStatus("pending");
        dispatch(
          addClient({
            firstName: firstName,
            lastName: lastName,
            birthYear: birthYear,
            phone: phone,
            email: email,
            sick: false,
          })
        ).unwrap();
      }
    } catch (err) {
      console.error("Failed to add the client", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setBirthYear("");
    setPhone("");
    setEmail("");
  }, [!isFormActive]);

  return (
    <section className={isFormActive ? "forms" : "inActive"}>
      <h2>Add Assistant</h2>
      <form autoComplete="off" onSubmit={onSaveClientClicked} action="">
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
        <label htmlFor="birthYear">Birthyear:</label>
        <input
          type="text"
          name="birthYear"
          value={birthYear}
          onChange={(e) => onBirthYearChanged(e)}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => onPhoneChanged(e)}
        />
        <label htmlFor="email">email:</label>
        <input
          id="emailAddress"
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => onEmailChanged(e)}
        />
        <div>
          <button disabled={!canSave}> Save Client</button>
        </div>
      </form>
    </section>
  );
};

export default AddClient;
