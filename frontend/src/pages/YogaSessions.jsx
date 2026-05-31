import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";

import hathaImg from "../assets/hatha.png";
import session1Img from "../assets/session1.png";
import session2Img from "../assets/session2.png";
import session3Img from "../assets/session3.png";

function YogaSessions() {
  const [sessions, setSessions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await axios.get("/api/yoga-sessions");
      setSessions(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load yoga sessions");
    }
  };

  const handleOptionChange = (sessionId, field, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [sessionId]: {
        ...selectedOptions[sessionId],
        [field]: value,
      },
    });
  };

  const bookSession = async (sessionId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const selectedDate = selectedOptions[sessionId]?.selectedDate;
    const selectedTime = selectedOptions[sessionId]?.selectedTime;

    if (!user) {
      alert("Please login before booking");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    try {
      await axios.post("/api/bookings", {
        userId: user.id,
        sessionId,
        selectedDate,
        selectedTime,
      });

      alert("Session booked successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const getSessionImage = (session) => {
    if (session.title === "Morning Hatha Yoga") return hathaImg;
    if (session.image === "session1.jpg") return session1Img;
    if (session.image === "session2.jpg") return session2Img;
    if (session.image === "session3.jpg") return session3Img;
    return hathaImg;
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <div style={styles.header}>
          <div>
            <p style={styles.smallText}>Welcome back</p>
            <h1 style={styles.title}>Find Your Yoga Session</h1>
          </div>
        </div>

        <div style={styles.heroCard}>
          <div>
            <h2 style={styles.heroTitle}>
              Start your wellness journey
            </h2>

            <p style={styles.heroText}>
              Book calming, beginner-friendly and power yoga classes.
            </p>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>
          Available Sessions
        </h2>

        <div style={styles.sessionList}>
          {sessions.map((session) => (
            <div key={session._id} style={styles.sessionCard}>
              <div style={styles.sessionImage}>
                <img
                  src={getSessionImage(session)}
                  alt={session.title}
                  style={styles.sessionImageTag}
                />
              </div>

              <div style={styles.sessionInfo}>
                <h3 style={styles.sessionTitle}>
                  {session.title}
                </h3>

                <p style={styles.sessionInstructor}>
                  Instructor: {session.instructor}
                </p>

                <p style={styles.sessionMeta}>
                  Suggested:{" "}
                  {new Date(session.date).toLocaleDateString()} •{" "}
                  {session.startTime}
                </p>

                <div style={styles.pickerRow}>
                  <input
                    type="date"
                    style={styles.dateInput}
                    value={
                      selectedOptions[session._id]
                        ?.selectedDate || ""
                    }
                    onChange={(e) =>
                      handleOptionChange(
                        session._id,
                        "selectedDate",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="time"
                    style={styles.timeInput}
                    value={
                      selectedOptions[session._id]
                        ?.selectedTime || ""
                    }
                    onChange={(e) =>
                      handleOptionChange(
                        session._id,
                        "selectedTime",
                        e.target.value
                      )
                    }
                  />
                </div>

                <p style={styles.sessionMeta}>
                  Capacity: {session.capacity}
                </p>

                <div style={styles.buttonRow}>
                  <button
                    onClick={() =>
                      bookSession(session._id)
                    }
                    style={styles.bookButton}
                  >
                    Book
                  </button>

                  <Link
                    to={`/session/${session._id}`}
                    style={styles.viewButton}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.bottomNav}>
          <Link to="/sessions" style={styles.navItem}>
            Sessions
          </Link>

          <Link to="/bookings" style={styles.navItem}>
            Bookings
          </Link>

          <Link to="/profile" style={styles.navItem}>
            Profile
          </Link>

          <Link to="/admin" style={styles.navItem}>
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(160deg, #d88ad7, #9b5de5, #5b36c5)",
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
    boxShadow:
      "0 20px 45px rgba(0,0,0,0.25)",
    position: "relative",
    paddingBottom: "85px",
  },

  header: {
    marginBottom: "20px",
  },

  smallText: {
    color: "#7c6f95",
    margin: 0,
  },

  title: {
    color: "#351c75",
    fontSize: "26px",
    margin: "5px 0 0",
  },

  heroCard: {
    background:
      "linear-gradient(135deg,#9b5de5,#d88ad7)",
    borderRadius: "24px",
    padding: "20px",
    color: "white",
    marginBottom: "25px",
  },

  heroTitle: {
    fontSize: "20px",
    marginBottom: "8px",
  },

  heroText: {
    fontSize: "14px",
    lineHeight: "1.5",
  },

  sectionTitle: {
    color: "#351c75",
    fontSize: "22px",
    marginBottom: "15px",
  },

  sessionList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  sessionCard: {
    background: "white",
    borderRadius: "22px",
    padding: "14px",
    display: "flex",
    gap: "14px",
    boxShadow:
      "0 8px 20px rgba(91,54,197,0.12)",
    overflow: "hidden",
  },

  sessionImage: {
    width: "82px",
    minWidth: "82px",
    height: "82px",
    borderRadius: "20px",
    overflow: "hidden",
  },

  sessionImageTag: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  sessionInfo: {
    flex: 1,
    minWidth: 0,
  },

  sessionTitle: {
    margin: "0 0 5px",
    color: "#351c75",
    fontSize: "17px",
  },

  sessionInstructor: {
    margin: "0 0 5px",
    color: "#6b7280",
    fontSize: "14px",
  },

  sessionMeta: {
    margin: "0 0 7px",
    color: "#7c6f95",
    fontSize: "13px",
  },

  pickerRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    margin: "8px 0",
    width: "100%",
  },

  dateInput: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "7px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "11px",
  },

  timeInput: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "7px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "11px",
  },

  buttonRow: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
    flexWrap: "wrap",
  },

  bookButton: {
    padding: "8px 14px",
    background: "#7ed957",
    color: "#1f2937",
    borderRadius: "18px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  viewButton: {
    display: "inline-block",
    padding: "8px 14px",
    background: "#f1e7ff",
    color: "#5b36c5",
    borderRadius: "18px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  bottomNav: {
    position: "absolute",
    left: "20px",
    right: "20px",
    bottom: "18px",
    background: "white",
    borderRadius: "24px",
    padding: "14px 10px",
    display: "flex",
    justifyContent: "space-around",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.15)",
  },

  navItem: {
    color: "#5b36c5",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "13px",
  },
};

export default YogaSessions;