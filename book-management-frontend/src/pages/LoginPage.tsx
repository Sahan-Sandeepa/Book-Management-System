import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { api } from "../api/endpoints";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (data: any) => {
    try {
      const res = await api.auth.login(data);
      const { token, user } = res.data;

      login(user, token);
      navigate("/books");
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} isLogin />
    </div>
  );
}
