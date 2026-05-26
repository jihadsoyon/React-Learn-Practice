import React from 'react';
import useInputField from '../../Hooks/useInputField';

const HookForm = () => {
    const [name, nameOnChange] = useInputField('');
    const [email, emailOnChange] = useInputField('');
    const [password, passwordOnChange] = useInputField('');



    const handleSubmit = e => {
        e.preventDefault();
        console.log('submit', name, email, password)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
             <input defaultValue={name} type="text" onChange={nameOnChange} />
             <br />
             <input type="email" onChange={emailOnChange}/>
             <br />
             <input type="password" onChange={passwordOnChange} />
             <input type="submit" value="Submit"/>

            </form>
        </div>
    );
};

export default HookForm;