
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";

const SocialKakao =()=>{
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;

    const navigate = useNavigate();
    const LoginSuccess = async (data)=>{
        // Todo : 엑세스 토큰 백엔드로 전달
        const idToken = data.response.access_token
        console.log(idToken)

        navigate('/dashboard');
    }
    const LoginFail = (error) => {
        console.log(error);
    };
    return(
        <>
          <KakaoLogin
              token={KAKAO_CLIENT_ID}
              onSuccess={LoginSuccess}
              onFail={LoginFail}
          />
        </>
    )
}

export default SocialKakao