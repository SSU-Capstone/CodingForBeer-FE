import { useRecoilState } from "recoil";
import { loginState } from "../recoilState";
import { useNavigate } from "react-router-dom";

const SocialGoogle = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const navigate = useNavigate(); // useNavigate hook
  const handleLogin = () => {
    if(isLogin) {
      // Redirect to Dashboard if logged in
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      console.log(isLogin,"wtf is this");
      window.open('https://codingforbeer.life/backend/auth/google/', '_blank');
    }
  }

  return (
    <button
      className="flex items-center justify-center w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      onClick={handleLogin}
    >
      <img
        src="/google_icon.jpg"
        alt="Google Logo"
        className="w-5 h-5 mr-3"
      />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

export default SocialGoogle