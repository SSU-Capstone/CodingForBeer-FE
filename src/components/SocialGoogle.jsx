import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const SocialGoogle = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const navigate = useNavigate();
    const LoginSuccess = async (data)=>{
        // Todo : 엑세스 토큰 백엔드로 전달
        console.log(data)
        
        
        navigate('/dashboard');
    }
    const LoginFail = (error) => {
        console.log(error);
    };

    return (
        <>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

                        <GoogleLogin
                          onSuccess={LoginSuccess}
                          onFailure={LoginFail}
                          width={336}
                        />

                </GoogleOAuthProvider>
            </GoogleOAuthProvider>
        </>
    );
};

export default SocialGoogle