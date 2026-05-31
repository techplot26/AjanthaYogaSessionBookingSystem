import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import welcomeYoga from "../assets/welcome-yoga.png";

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
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <h1 style={styles.heroTitle}>Create Account</h1>
          <p style={styles.heroText}>
            Sign up to get started with Ajantha Yoga and begin your wellness journey.
          </p>
          <img src={welcomeYoga} alt="Yoga register" style={styles.heroImage} />
        </div>

        <div style={styles.formPanel}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Sign up to get started</p>

          <form onSubmit={registerUser} style={styles.form}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Confirm Password</label>
            <input
              style={styles.input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

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
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #d88ad7, #9b5de5, #5b36c5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "34px",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },

  leftPanel: {
    padding: "50px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  heroTitle: {
    fontSize: "44px",
    margin: "0 0 16px",
  },

  heroText: {
    fontSize: "17px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },

  heroImage: {
    width: "100%",
    maxWidth: "360px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "28px",
    boxShadow: "0 16px 36px rgba(0,0,0,0.25)",
  },

  formPanel: {
    background: "rgba(255,255,255,0.96)",
    padding: "45px 55px",
  },

  title: {
    fontSize: "34px",
    color: "#351c75",
    margin: "0 0 8px",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    color: "#351c75",
    fontWeight: "bold",
  },

  input: {
    padding: "13px",
    borderRadius: "16px",
    border: "1px solid #ddd",
    fontSize: "15px",
    marginBottom: "6px",
  },

  button: {
    marginTop: "12px",
    padding: "15px",
    borderRadius: "24px",
    border: "none",
    background: "#7ed957",
    color: "#1f2937",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },

  bottomText: {
    marginTop: "22px",
    color: "#6b7280",
  },

  link: {
    color: "#5b36c5",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Register;