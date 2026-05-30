import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
      });

      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={registerUser} style={styles.form}>
          <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />

          <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <input style={styles.input} name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #d88ad7, #9b5de5, #5b36c5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "360px",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "30px",
    padding: "35px 28px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    color: "#5b36c5",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "14px",
    borderRadius: "18px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "22px",
    border: "none",
    background: "#7ed957",
    color: "#1f2937",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  bottomText: {
    marginTop: "25px",
    color: "#6b7280",
  },
  link: {
    color: "#5b36c5",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Register;