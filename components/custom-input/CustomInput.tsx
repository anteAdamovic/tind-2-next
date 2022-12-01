import React, { FunctionComponent, useState } from "react";
import classes from "./SearchBar.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface CustomInputProps {
  placeholder: string;
  isVisible?: boolean;
  value?: string;
  onChange?: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  placeholder,
  isVisible,
  value,
  onChange,
}) => {
  const handleSearch = (e: any) => {
    console.log("event", e);
    e.preventDefault();
    window.location =
      "/search?ln=en&p=&f=&c=Articles %26 Preprints&c=Multimedia %26 Arts&c=TIND IR&c=TIND DA&c=Books %26 Reports&c=TIND ILS&c=TIND RDM&sf=&so=d&rg=10&fti=0" as any;
  };

  return (
    <div className={classes.form}>
      <InputText
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
        name="search"
        className={classes.input}
      />
      {isVisible ? (
        <Button
          className={classes.button}
          label="Search"
          onClick={handleSearch}
        />
      ) : null}
    </div>
  );
};

export default CustomInput;
