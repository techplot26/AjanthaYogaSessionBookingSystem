import { Link } from "react-router-dom";
import welcomeYoga from "../assets/welcome-yoga.png";

function Welcome() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <p style={styles.badge}>Ajantha Yoga</p>

          <h1 style={styles.title}>
            Begin your wellness journey with calm and confidence
          </h1>

          <p style={styles.subtitle}>
            Discover yoga sessions, choose your preferred date and time, and
            manage your bookings in one simple platform.
          </p>

          <div style={styles.actions}>
            <Link to="/login" style={styles.primaryButton}>
              Get Started
            </Link>

            <Link to="/register" style={styles.secondaryButton}>
              Create Account
            </Link>
          </div>
        </div>

        <div style={styles.right}>
          <img src={welcomeYoga} alt="Yoga welcome" style={styles.image} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #d88ad7, #9b5de5, #5b36c5)",
    padding: "60px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    alignItems: "center",
    gap: "50px",
    background: "rgba(255,255,255,0.16)",
    borderRadius: "36px",
    padding: "55px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },

  left: {
    color: "white",
  },

  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.22)",
    padding: "10px 18px",
    borderRadius: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  title: {
    fontSize: "52px",
    lineHeight: "1.1",
    margin: "0 0 22px",
    maxWidth: "720px",
  },

  subtitle: {
    fontSize: "18px",
    lineHeight: "1.7",
    maxWidth: "650px",
    marginBottom: "34px",
  },

  actions: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },

  primaryButton: {
    background: "#7ed957",
    color: "#1f2937",
    padding: "15px 30px",
    borderRadius: "26px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  secondaryButton: {
    background: "white",
    color: "#5b36c5",
    padding: "15px 30px",
    borderRadius: "26px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  right: {
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    maxWidth: "430px",
    height: "430px",
    objectFit: "cover",
    borderRadius: "40px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
    background: "white",
  },
};

export default Welcome;