import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { api } from "../api/endpoints";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    try {
      const res = await api.auth.login(data);
      const { token, user } = res.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      navigate("/books");
    } catch (err: any) {
      alert(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} isLogin />
      <p style={{ marginTop: "10px" }}>
        Don’t have an account? <Link to="/register">Create one here</Link>
      </p>
    </div>
  );
}
