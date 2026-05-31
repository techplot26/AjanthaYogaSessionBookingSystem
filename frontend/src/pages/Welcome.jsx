import { Link } from "react-router-dom";
import welcomeYoga from "../assets/welcome-yoga.png";
function Welcome() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={welcomeYoga} alt="Yoga welcome" style={styles.welcomeImage} />

        <h1 style={styles.title}>Welcome to Ajantha Yoga</h1>

        <p style={styles.subtitle}>
          Find balance, peace, and strength through guided yoga sessions.
        </p>

        <Link to="/login" style={styles.button}>
          Get Started
        </Link>

        <p style={styles.bottomText}>
          New here? <Link to="/register" style={styles.link}>Create Account</Link>
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
  welcomeImage: {
  width: "220px",
  height: "220px",
  objectFit: "cover",
  borderRadius: "50%",
  margin: "45px auto 35px",
  display: "block",
},
  card: {
    width: "360px",
    minHeight: "620px",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "30px",
    padding: "30px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },
  imageCircle: {
    width: "190px",
    height: "190px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.3)",
    margin: "45px auto 35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "90px",
  },
  title: {
    fontSize: "30px",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "35px",
  },
  button: {
    display: "block",
    background: "#7ed957",
    color: "#1f2937",
    padding: "14px",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  bottomText: {
    marginTop: "25px",
  },
  link: {
    color: "white",
    fontWeight: "bold",
  },
};

export default Welcome;