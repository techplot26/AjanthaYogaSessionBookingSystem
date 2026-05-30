import { useEffect, useState } from "react";
import axios from "../axiosConfig";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await axios.get("/api/bookings");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    await axios.put(`/api/bookings/${id}/cancel`);
    alert("Booking cancelled");
    loadBookings();
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <h1 style={styles.title}>My Bookings</h1>

        <div style={styles.tabs}>
          <span style={styles.activeTab}>Upcoming</span>
          <span style={styles.tab}>Past</span>
        </div>

        {bookings.map((booking) => (
          <div key={booking._id} style={styles.card}>
            <div style={styles.imageBox}>🧘‍♀️</div>

            <div style={styles.info}>
              <h3 style={styles.sessionTitle}>{booking.session?.title}</h3>
              <p style={styles.text}>Instructor: {booking.session?.instructor}</p>
              <p style={styles.text}>
                {booking.session?.date
                  ? new Date(booking.session.date).toLocaleDateString()
                  : ""}
                {" "}• {booking.session?.startTime}
              </p>

              <span style={styles.status}>{booking.status}</span>

              {booking.status === "booked" && (
                <button
                  style={styles.cancelButton}
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #d88ad7, #9b5de5, #5b36c5)",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  phone: {
    width: "390px",
    minHeight: "760px",
    background: "#f8f5ff",
    borderRadius: "32px",
    padding: "22px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
  },
  title: {
    color: "#351c75",
    fontSize: "30px",
  },
  tabs: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  activeTab: {
    background: "#7ed957",
    padding: "8px 18px",
    borderRadius: "18px",
    fontWeight: "bold",
  },
  tab: {
    background: "white",
    padding: "8px 18px",
    borderRadius: "18px",
    color: "#6b7280",
  },
  card: {
    background: "white",
    borderRadius: "24px",
    padding: "14px",
    display: "flex",
    gap: "14px",
    marginBottom: "15px",
    boxShadow: "0 8px 20px rgba(91,54,197,0.12)",
  },
  imageBox: {
    width: "82px",
    height: "82px",
    borderRadius: "20px",
    background: "#f1e7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
  },
  info: {
    flex: 1,
  },
  sessionTitle: {
    color: "#351c75",
    margin: "0 0 5px",
  },
  text: {
    margin: "0 0 5px",
    color: "#6b7280",
    fontSize: "14px",
  },
  status: {
    display: "inline-block",
    background: "#e8f8df",
    color: "#2f7d32",
    borderRadius: "15px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "bold",
    marginRight: "8px",
  },
  cancelButton: {
    border: "none",
    background: "#ffdddd",
    color: "#b91c1c",
    borderRadius: "15px",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Bookings;