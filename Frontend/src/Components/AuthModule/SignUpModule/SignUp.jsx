import Styles from "./SignUp.module.css";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.card}>
        <h1>Create your account</h1>
        <p className={Styles.sub}>Sign up using one of the providers below</p>

        <button className={`${Styles.btn} ${Styles.google}`}>
          <FaGoogle /> Continue with Google
        </button>

        <button className={`${Styles.btn} ${Styles.github}`}>
          <FaGithub /> Continue with GitHub
        </button>

        <button className={`${Styles.btn} ${Styles.microsoft}`}>
          <FaMicrosoft /> Continue with Microsoft
        </button>

        <div className={Styles.divider}>or</div>

        <div className={Styles.placeholder}>
          Email signup form will be added here
        </div>

        <p className={Styles.bottom}>
          Already have an account? <span>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
