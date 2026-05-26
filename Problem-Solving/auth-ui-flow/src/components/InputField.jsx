import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="password-wrapper">
        <input
          name={name}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {isPassword && (
          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;