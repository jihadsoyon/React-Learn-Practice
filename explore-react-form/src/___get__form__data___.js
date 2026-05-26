/**
 * 1. e.target. [name of the input field].value
 * 2. use form action and formdata in the action handler. formdata.get('name of the input field')
 * 3. Controlled component. one per each field. useState on change of the field. useful to dynamically handle error
 * 3. handle all control field on one state object
 * const [formData, setFormData] = useState({
 * name: '',
 * password: '',
 * phone: '',
 * })
 * 4.Uncontrolled using useRef
 * 
 */