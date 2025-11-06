import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { api } from "../api/endpoints";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (data: any) => {
    try {
      await api.auth.register(data);
      alert("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err: any) {
      alert(err.message || "Registration failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create an Account</h2>
      <AuthForm onSubmit={handleRegister} />
      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}
