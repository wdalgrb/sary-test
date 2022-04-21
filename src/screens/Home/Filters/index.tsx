import React, { Component, useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./Filters.style.css";
import { useSelector } from "react-redux";
import { EmployeeType } from "../../../config/types";

interface Props {
  style: object;
  onFilterItems: (items: EmployeeType) => void;
  qsItems: EmployeeType;
}
const Filters = (props: Props) => {
  const app: any = useSelector<any>((state) => state.app);
  const countriesList: Array<object> = app.countriesList;
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const selectItems = () => {
    props.onFilterItems({
      email,
      country,
      phone,
      name,
      company,
      date,
    });
  };

  useEffect(() => {
    setCompany(props.qsItems.company || "");
    setEmail(props.qsItems.email || "");
    setCountry(props.qsItems.country || "");
    setDate(props.qsItems.date || "");
    setPhone(props.qsItems.user_phone || "");
    setName(props.qsItems.user_name || "");

    return () => {};
  }, []);

  return (
    <div className="filter-area" style={props.style}>
      <h1 className="filters-title">Filters</h1>
      <div className="input-group">
        <TextField
          id="standard-multiline-flexible"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          style={{ width: "96%" }}
        />
      </div>
      <div className="input-group">
        <TextField
          id="standard-multiline-flexible"
          label="Phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          variant="standard"
          style={{ width: "96%" }}
        />
      </div>
      <div className="input-group">
        <TextField
          id="standard-multiline-flexible"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          style={{ width: "96%" }}
        />
      </div>
      <div className="input-group">
        <TextField
          id="standard-multiline-flexible"
          label="Company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          variant="standard"
          style={{ width: "96%" }}
        />
      </div>
      <div className="input-group">
        <TextField
          id="standard-multiline-flexible"
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          variant="standard"
          select
          style={{ width: "96%" }}
        >
          <MenuItem value={"null"}>Select Country</MenuItem>
          {countriesList.map((option: any) => (
            <MenuItem key={option.Alpha3Code} value={option.Alpha3Code}>
              {option.Name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="input-group">
        <TextField
          id="standard-multiline-flexible"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          variant="standard"
          style={{ width: "96%" }}
        />
      </div>
      <Button
        variant="contained"
        style={{ width: "96%" }}
        startIcon={<FilterListIcon />}
        onClick={selectItems}
      >
        Filter
      </Button>
    </div>
  );
};

export default Filters;
