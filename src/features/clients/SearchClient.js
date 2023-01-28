import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchClientByName, searchClientByBirthyear } from "./clientsSlice";
import { isSearchClientFormActive } from "./clientsSlice";

const SearchClient = () => {
  const dispatch = useDispatch();
  const isFormActive = useSelector(isSearchClientFormActive);

  const [nameSearch, setNameSearch] = useState("");
  const [birthyearSearch, setBirthyearSearch] = useState("");

  const onNameSearchChanged = (e) => {
    setNameSearch(e.target.value.toLowerCase());
    dispatch(searchClientByName(e.target.value));
  };
  const onBirthyearSearchChanged = (e) => {
    setBirthyearSearch(e.target.value);
    dispatch(searchClientByBirthyear(e.target.value));
  };

  return (
    <section className={isFormActive ? "forms" : "inActive"}>
      <h2>Search client</h2>
      <form autoComplete="off" action="">
        <label htmlFor="nameSearch">Search by lastname:</label>
        <input
          type="text"
          name="nameSearch"
          value={nameSearch}
          onChange={(e) => onNameSearchChanged(e)}
        />
        <label htmlFor="birthyearSearch">Search by birthyear:</label>
        <input
          type="text"
          name="birthyearSearch"
          value={birthyearSearch}
          onChange={(e) => onBirthyearSearchChanged(e)}
        />
      </form>
    </section>
  );
};

export default SearchClient;
