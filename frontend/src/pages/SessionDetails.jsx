import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosConfig";

function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    const res = await axios.get("/api/yoga-sessions");
    const found = res.data.find((item) => item._id === id);
    setSession(found);

    if (found) {
      setSelectedDate(found.date ? found.date.substring(0, 10) : "");
      setSelectedTime(found.startTime ? convertTo24Hour(found.startTime) : "");
    }
  };

  const convertTo24Hour = (time) => {
    if (!time) return "";

    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours) + 12);
    }

    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const bookSession = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login before booking");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time before booking");
      return;
    }

    try {
      await axios.post("/api/bookings", {
        userId: user.id,
        sessionId: session._id,
        selectedDate,
        selectedTime,
      });

      alert("Session booked successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const getImageEmoji = (image) => {
    if (image === "session1.jpg") return "🧘‍♀️";
    if (image === "session2.jpg") return "🌿";
    if (image === "session3.jpg") return "🔥";
    return "🧘";
  };

  if (!session) {
    return <p style={{ padding: "20px" }}>Loading session...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <Link to="/sessions" style={styles.back}>← Back</Link>

        <div style={styles.imageBox}>{getImageEmoji(session.image)}</div>

        <h1 style={styles.title}>{session.title}</h1>
        <p style={styles.instructor}>Instructor: {session.instructor}</p>

        <div style={styles.infoCard}>
          <p><strong>Suggested Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
          <p><strong>Suggested Time:</strong> {session.startTime} - {session.endTime}</p>
          <p><strong>Location:</strong> {session.location}</p>
          <p><strong>Duration:</strong> {session.duration} minutes</p>
          <p><strong>Capacity:</strong> {session.capacity}</p>
        </div>

        <div style={styles.pickerCard}>
          <h3 style={styles.subTitle}>Choose Date & Time</h3>

          <label style={styles.label}>Select Date</label>
          <input
            type="date"
            style={styles.input}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <label style={styles.label}>Select Time</label>
          <input
            type="time"
            style={styles.input}
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <h3 style={styles.subTitle}>About Session</h3>
        <p style={styles.description}>{session.description}</p>

        <button onClick={bookSession} style={styles.button}>
          Book Now
        </button>
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
  back: {
    color: "#5b36c5",
    textDecoration: "none",
    fontWeight: "bold",
  },
  imageBox: {
    marginTop: "20px",
    height: "210px",
    borderRadius: "28px",
    background: "linear-gradient(135deg, #f1e7ff, #ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "90px",
  },
  title: {
    color: "#351c75",
    fontSize: "28px",
    marginBottom: "5px",
  },
  instructor: {
    color: "#6b7280",
    marginBottom: "18px",
  },
  infoCard: {
    background: "white",
    borderRadius: "22px",
    padding: "15px",
    boxShadow: "0 8px 20px rgba(91,54,197,0.12)",
    color: "#374151",
  },
  pickerCard: {
    background: "white",
    borderRadius: "22px",
    padding: "15px",
    marginTop: "18px",
    boxShadow: "0 8px 20px rgba(91,54,197,0.12)",
  },
  subTitle: {
    color: "#351c75",
    marginTop: "18px",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    color: "#6b7280",
    fontSize: "14px",
    marginTop: "10px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "16px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  description: {
    color: "#6b7280",
    lineHeight: "1.6",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    borderRadius: "25px",
    border: "none",
    background: "#7ed957",
    color: "#1f2937",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SessionDetails;