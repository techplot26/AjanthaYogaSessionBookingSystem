import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>Ajantha Yoga</Link>

      <div>
        <Link to="/sessions" style={styles.link}>Sessions</Link>
        <Link to="/bookings" style={styles.link}>Bookings</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/admin" style={styles.link}>Admin</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#351c75",
    color: "white",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "18px",
  },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default Navbar;