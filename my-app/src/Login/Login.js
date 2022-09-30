import React, {useRef} from "react";
import "./Login.css";

function Login(props){
    const setUserName = props.setUserName;
    const myRef = useRef(null);
    
    //only registrates a user if values is actual a value
    const registerUser = () =>{
        if(myRef.current.value === null || myRef.current.value === "") return;

        setUserName(myRef.current.value); 
        props.setLogin(false);
    }

    return(
        <div className="Login_screen">
            <div className="Login_container">
                <label className="Login_label">
                    <center>Bitte gib Deinen Namen ein.<br/></center>
                </label>
                <input type="text" ref={myRef} className="Login_input_field" alt="Login Eingabefeld">

                </input>
                <button onClick={() => {registerUser()}} className="Login_button">
                    Bestätigen
                </button>
            </div>
        </div>
    )
}

export default Login;