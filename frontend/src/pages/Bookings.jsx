import { useEffect, useState } from "react";
import axios from "../axiosConfig";

import hathaImg from "../assets/hatha.png";
import session1Img from "../assets/session1.png";
import session2Img from "../assets/session2.png";
import session3Img from "../assets/session3.png";

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

  const getSessionImage = (session) => {
    if (!session) return hathaImg;

    if (session.title === "Morning Hatha Yoga") return hathaImg;
    if (session.image === "session1.jpg") return session1Img;
    if (session.image === "session2.jpg") return session2Img;
    if (session.image === "session3.jpg") return session3Img;

    return hathaImg;
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <h1 style={styles.title}>My Bookings</h1>

        <div style={styles.tabs}>
          <span style={styles.activeTab}>Upcoming</span>
          <span style={styles.tab}>Past</span>
        </div>

        {bookings.length === 0 && (
          <p style={styles.emptyText}>No bookings found.</p>
        )}

        {bookings.map((booking) => (
          <div key={booking._id} style={styles.card}>
            <div style={styles.imageBox}>
              <img
                src={getSessionImage(booking.session)}
                alt={booking.session?.title || "Yoga session"}
                style={styles.imageTag}
              />
            </div>

            <div style={styles.info}>
              <h3 style={styles.sessionTitle}>{booking.session?.title}</h3>

              <p style={styles.text}>
                Instructor: {booking.session?.instructor}
              </p>

              <p style={styles.text}>
                Date: {booking.selectedDate || "Not selected"}
              </p>

              <p style={styles.text}>
                Time: {booking.selectedTime || "Not selected"}
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

  emptyText: {
    color: "#6b7280",
    background: "white",
    padding: "15px",
    borderRadius: "18px",
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
    minWidth: "82px",
    height: "82px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#f1e7ff",
  },

  imageTag: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
    textTransform: "capitalize",
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