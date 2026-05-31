import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import welcomeYoga from "../assets/welcome-yoga.png";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/sessions");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <h1 style={styles.heroTitle}>Welcome Back</h1>
          <p style={styles.heroText}>
            Sign in to continue your yoga journey and manage your sessions.
          </p>
          <img src={welcomeYoga} alt="Yoga login" style={styles.heroImage} />
        </div>

        <div style={styles.formPanel}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>Access your Ajantha Yoga account</p>

          <form onSubmit={loginUser} style={styles.form}>
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

            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>

          <p style={styles.bottomText}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={styles.link}>
              Register
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
    maxWidth: "1050px",
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
    padding: "55px",
  },

  title: {
    fontSize: "34px",
    color: "#351c75",
    margin: "0 0 8px",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    color: "#351c75",
    fontWeight: "bold",
  },

  input: {
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid #ddd",
    fontSize: "15px",
    marginBottom: "8px",
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
    marginTop: "25px",
    color: "#6b7280",
  },

  link: {
    color: "#5b36c5",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Login;