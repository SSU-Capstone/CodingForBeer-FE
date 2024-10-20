import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../recoilState";

export const KaKaoLoginButtonStyle = {
    display: "inline-block",
    padding: "0px",
    width: "100%",
    height: "38px",
    color: "rgb(60, 30, 30)",
    backgroundColor: "rgb(255, 235, 0)",
    border: "1px solid transparent",
    borderRadius: "3px",
    fontSize: "16px",
    textAlign: "center",
};

const SocialKakao =()=>{
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;

    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const navigate = useNavigate();
    const LoginSuccess = async (data)=>{
        // Todo : 엑세스 토큰 백엔드로 전달
        const idToken = data.response.access_token
        console.log(idToken)
        setIsLogin(true);

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
              style={KaKaoLoginButtonStyle}
          />
        </>
    )
}

export default SocialKakao