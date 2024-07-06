import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import PasswordStrength from "./components/PasswordStrength";
import usePasswordGenerator from "./hooks/use-password-generator";

function App() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  useEffect(() => {
    console.log("CheckboxData: ", checkboxData);
  }, [checkboxData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      console.log("Copied to clipboard...");
      setTimeout(() => {
        setCopied(false);
        console.log("Copied State reset...");
      }, 2000);
    });
  };

  const handleCheckboxChage = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
    console.log("CheckboxData: ", checkboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password text and copy btn */}
      {password ? (
        <div className="header">
          <div className="password"><span>Password: </span>{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
            customClass="copyBtn button"
          ></Button>
        </div>
      ) : (
        <></>
      )}
      {/* Char length */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length} </label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        ></input>
      </div>

      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              state={checkbox.state}
              title={checkbox.title}
              onChange={() => handleCheckboxChage(index)}
            />
          );
        })}
      </div>

      {/* Password Strength */}
      <div>
        <PasswordStrength password={password} />
      </div>

      {/* Error Message */}
      <div className="error-message">{errorMessage}</div>

      {/* Generate Button */}
      <Button
        text="Generate Password"
        customClass="generateBtn button"
        onClick={() => generatePassword(checkboxData, length)}
      />
    </div>
  );
}

export default App;
