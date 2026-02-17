import React ,{useState} from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Styles from "./ForgetPassword.module.css";


const ForgetPassword = () => {
    const {
        register,
        handleSubmit,formState: { errors },
    } = useForm();
    const [submitted,setSubmitted]=useState(false);

     const onSubmit = (data) => {
       // console.log(data.email);
        setSubmitted(true);
    };

    return (
        
            <div className={Styles.container}>
                
                 <div className={Styles.titlewrapper}>
                    <h1 className={Styles.title}>Forget Password</h1>
                 </div>
                 
                 {/*CardCode*/}
                 <div className={Styles.card}>   
                 {/* entries needed */}  
                 {submitted ? (
                  < div className={Styles.successmessages}>
                    If an account exist , a reset link has been sent to your email.
                  </div> ) : (       
                  <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>

                     <div className={Styles.field}>
                         {errors.email && (
                           <div className={Styles.error}>
                              {errors.email.message}
                            </div>
                          )}
                       <input
                      type="email"
                      placeholder="Email"
                      className={`${Styles.email} ${errors.email ? Styles.errorInput : ""}`}
                      {...register("email", {
                      required: "Email is required",
                      pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      message: "Invalid email address",
                               },
                            })}
                        />
                        <span className={Styles.necessary}>*</span>
                     </div>
                                      
                     <button type="submit" className={Styles.buttonContainer}>
                      Request Reset Link</button>
                    </form>
                  )}
                   </div>
             
                  {/* FooterCode */}
                         <p className={Styles.footer}>
                             Remember your password{" "}?{" "}
                             <NavLink to="/signin"><span className={Styles.signin}> Back to Sign in</span></NavLink>
                         </p>

                
                
            </div>
        
    );
};

export default ForgetPassword;
