import Styles from "./SignUp.module.css";
// PNG imports are removed because we are now using SVGs for perfect quality
import MainLogo from "./genericpic.png"; 
import { useForm } from "react-hook-form";

const SignUp = () => {

 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = (data) => {
    console.log(data);
  };

    
    return (
        <div className={Styles.container}>
            {/* Header Section */}
            <div className={Styles.header}>
                <h1 className={Styles.title}>Sign Up Account</h1>
                <p className={Styles.subtitle}>Enter your data to create your account.</p>
            </div>

            {/* The Main Card */}
            <div className={Styles.card}>
                
                {/* Social Login Buttons */}
                <div className={Styles.socialButtons}>
                    
                    {/* Google Button with SVG */}
                    <button className={Styles.socialBtn}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.4999" cy="12.5002" r="10.4167" stroke="#555555" strokeWidth="1.5"/>
                            <path d="M12.5001 12.4998H17.7084C17.7084 15.3763 15.3766 17.7082 12.5001 17.7082C9.6236 17.7082 7.29175 15.3763 7.29175 12.4998C7.29175 9.62335 9.6236 7.2915 12.5001 7.2915C13.9383 7.2915 15.2404 7.87447 16.1829 8.81699" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Google
                    </button>

                    {/* GitHub Button with SVG */}
                    <button className={Styles.socialBtn}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.79492 17.9353C7.20578 18.5367 8.45272 19.8203 10.1536 20.1438M10.2813 23.0257C9.21 22.8492 2.08936 20.5316 2.08936 12.7055C2.08936 5.38331 8.34134 2.19238 12.5068 2.19238C16.6723 2.19238 22.9227 5.38331 22.9227 12.7055C22.9227 20.5316 15.802 22.8492 14.7307 23.0257C14.7307 23.0257 14.513 19.4659 14.64 18.8558C14.767 18.2458 14.3343 17.2641 14.3343 17.2641C15.3458 16.8856 16.8855 16.3431 17.402 14.8876C17.8027 13.7582 18.0548 12.1182 16.934 10.5767C16.934 10.5767 17.2266 8.08623 16.6723 7.98976C16.118 7.89328 14.485 8.97564 14.485 8.97564C14.0094 8.8408 12.948 8.58275 12.5079 8.62925C12.0677 8.58275 11.0027 8.8408 10.5271 8.97564C10.5271 8.97564 8.89403 7.89328 8.33973 7.98976C7.78543 8.08623 8.07807 10.5767 8.07807 10.5767C6.95723 12.1182 7.20931 13.7582 7.61008 14.8876C8.12659 16.3431 9.66627 16.8856 10.6777 17.2641C10.6777 17.2641 10.245 18.2458 10.372 18.8558C10.499 19.4659 10.2813 23.0257 10.2813 23.0257Z" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        GitHub
                    </button>

                    {/* Microsoft Button with SVG */}
                    <button className={Styles.socialBtn}>
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <rect x="3" y="3" width="8" height="8" rx="1" stroke="#555555" strokeWidth="1.5" fill="none"/>
                           <rect x="13" y="3" width="8" height="8" rx="1" stroke="#555555" strokeWidth="1.5" fill="none"/>
                           <rect x="3" y="13" width="8" height="8" rx="1" stroke="#555555" strokeWidth="1.5" fill="none"/>
                           <rect x="13" y="13" width="8" height="8" rx="1" stroke="#555555" strokeWidth="1.5" fill="none"/>
                        </svg>
                        Microsoft
                    </button>
                </div>

                {/* The "or" Divider */}
                <div className={Styles.dividerContainer}>
                    <span className={Styles.dividerText}>or</span>
                </div>
                    <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>

                        <div className={Styles.row}>
                            <div className={Styles.field}>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={`${Styles.input} ${errors.firstName ? Styles.errorInput : ""}`}
                                    {...register("firstName", { required: "First Name is required" })}
                                />
                                <span className={Styles.requirednm}>*</span>
                            </div>

                            <div className={Styles.field}>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className={`${Styles.input} ${errors.lastName ? Styles.errorInput : ""}`}
                                    {...register("lastName", { required: "Last Name is required" })}
                                />
                                <span className={Styles.requirednm}>*</span>
                            </div>
                        </div>

                        <div className={Styles.field}>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`${Styles.email} ${errors.email ? Styles.errorInput : ""}`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            <span className={Styles.requiredem}>*</span>
                        </div>

                        <div className={Styles.field}>
                            <input
                                type="text"
                                placeholder="User name"
                                className={`${Styles.username} ${errors.userName ? Styles.errorInput : ""}`}
                                {...register("userName", { required: "Username is required" })}
                            />
                            <span className={Styles.requiredus}>*</span>
                        </div>

                        <div className={Styles.passwordRow}>
                            <div className={Styles.field}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`${Styles.input} ${errors.password ? Styles.errorInput : ""}`}
                                    {...register("password", {
                                        required: "Password required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                <span className={Styles.requiredp}>*</span>
                            </div>

                            <div className={Styles.field}>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className={`${Styles.input} ${errors.confirmPassword ? Styles.errorInput : ""}`}
                                    {...register("confirmPassword", {
                                        required: "Confirmed password is required",
                                        validate: (value) =>
                                            value === passwordValue || "Passwords do not match",
                                    })}
                                />
                                <span className={Styles.requiredcp}>*</span>
                            </div>
                        </div>

                        <button type="submit" className={Styles.btn}>
                            Sign Up
                        </button>

                    </form>

                {/* The Big WallGodds Logo
                <img src={MainLogo} alt="WallGodds" className={Styles.mainLogoImage} /> */}
              
            </div>
           
            {/* Footer */}
            <p className={Styles.footer}>
                Already have an Account? <a href="/signin">Sign in here</a>
            </p>
        </div>
    );
};

export default SignUp;