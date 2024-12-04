import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const SocialGoogle = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const LoginSuccess = ()=>{
    navigate('/dashboard');
  }
  const LoginFail = (error) => {
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={LoginSuccess}
        onFailure={LoginFail}
        width={336}
      />
    </GoogleOAuthProvider>
  );
};

export default SocialGoogle