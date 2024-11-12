import { useRecoilState } from "recoil";
import { loginState } from "../recoilState";

const SocialGoogle = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const handleLogin = () => {
    setIsLogin(true);
    window.open('http://localhost:4000/auth/google', '_self');
  }

  return (
    <button onClick={handleLogin}>login button</button>
  );
};

export default SocialGoogle