import { useState } from "react"

const useInputField = (defaultValue) => {
const [fieldvalue, setFieldValue] = useState(defaultValue);

const handleFieldOnChange = e => {
   setFieldValue(e.target.value);
}
return [fieldvalue, handleFieldOnChange];
}


export default useInputField