import { useEffect, useState } from "react";
import axios from "../axiosConfig";

function AdminDashboard() {
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    title: "",
    instructor: "",
    image: "session1.jpg",
    date: "",
    startTime: "",
    endTime: "",
    location: "Ajantha Yoga Studio",
    duration: "",
    capacity: "",
    description: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const sessionRes = await axios.get("/api/yoga-sessions");
    const bookingRes = await axios.get("/api/bookings");

    setSessions(sessionRes.data);
    setBookings(bookingRes.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createSession = async (e) => {
    e.preventDefault();

    await axios.post("/api/yoga-sessions", form);

    alert("Session created successfully");

    setForm({
      title: "",
      instructor: "",
      image: "session1.jpg",
      date: "",
      startTime: "",
      endTime: "",
      location: "Ajantha Yoga Studio",
      duration: "",
      capacity: "",
      description: "",
    });

    loadData();
  };

  const deleteSession = async (id) => {
    if (!window.confirm("Delete this session?")) return;

    await axios.delete(`/api/yoga-sessions/${id}`);
    alert("Session deleted");
    loadData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard</h1>

        <div style={styles.cards}>
          <div style={styles.statCard}>
            <h2>{sessions.length}</h2>
            <p>Total Sessions</p>
          </div>

          <div style={styles.statCard}>
            <h2>{bookings.length}</h2>
            <p>Total Bookings</p>
          </div>

          <div style={styles.statCard}>
            <h2>Admin</h2>
            <p>Current Role</p>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.subTitle}>Manage Sessions</h2>

            <form onSubmit={createSession} style={styles.form}>
              <input
                style={styles.input}
                name="title"
                placeholder="Session Title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <input
                style={styles.input}
                name="instructor"
                placeholder="Instructor"
                value={form.instructor}
                onChange={handleChange}
                required
              />

              <select
                style={styles.input}
                name="image"
                value={form.image}
                onChange={handleChange}
              >
                <option value="session1.jpg">Morning Yoga Flow Image</option>
                <option value="session2.jpg">Yoga Basics Image</option>
                <option value="session3.jpg">Power Yoga Image</option>
                <option value="">Default Image</option>
              </select>

              <div style={styles.row}>
                <input
                  style={styles.input}
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

                <input
                  style={styles.input}
                  name="startTime"
                  type="time"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.row}>
                <input
                  style={styles.input}
                  name="endTime"
                  type="time"
                  value={form.endTime}
                  onChange={handleChange}
                />

                <input
                  style={styles.input}
                  name="capacity"
                  type="number"
                  placeholder="Capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                style={styles.input}
                name="duration"
                type="number"
                placeholder="Duration in minutes"
                value={form.duration}
                onChange={handleChange}
                required
              />

              <input
                style={styles.input}
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />

              <textarea
                style={styles.textarea}
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />

              <button type="submit" style={styles.createButton}>
                Create Session
              </button>
            </form>
          </div>

          <div style={styles.panel}>
            <h2 style={styles.subTitle}>Existing Sessions</h2>

            {sessions.map((session) => (
              <div key={session._id} style={styles.sessionRow}>
                <div>
                  <h3 style={styles.sessionTitle}>{session.title}</h3>
                  <p style={styles.text}>Instructor: {session.instructor}</p>
                  <p style={styles.text}>
                    {new Date(session.date).toLocaleDateString()} •{" "}
                    {session.startTime || "Time TBC"}
                  </p>
                </div>

                <button
                  onClick={() => deleteSession(session._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.subTitle}>Recent Bookings</h2>

          {bookings.slice(0, 5).map((booking) => (
            <div key={booking._id} style={styles.bookingRow}>
              <div>
                <h3 style={styles.sessionTitle}>{booking.session?.title}</h3>
                <p style={styles.text}>
                  User: {booking.user?.name || "Unknown"}
                </p>
                <p style={styles.text}>
                  Date: {booking.selectedDate || "Not selected"} | Time:{" "}
                  {booking.selectedTime || "Not selected"}
                </p>
              </div>

              <span style={styles.status}>{booking.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #d88ad7, #9b5de5, #5b36c5)",
    padding: "30px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  title: {
    color: "white",
    fontSize: "34px",
    marginBottom: "25px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  statCard: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "24px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    color: "#351c75",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    marginBottom: "25px",
  },

  panel: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
  },

  subTitle: {
    color: "#351c75",
    marginTop: 0,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "14px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
    width: "100%",
  },

  textarea: {
    padding: "12px",
    borderRadius: "14px",
    border: "1px solid #ddd",
    minHeight: "80px",
    fontSize: "14px",
  },

  createButton: {
    background: "#7ed957",
    color: "#1f2937",
    border: "none",
    borderRadius: "18px",
    padding: "13px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  sessionRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    background: "#f8f5ff",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "12px",
    alignItems: "center",
  },

  bookingRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    background: "#f8f5ff",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "12px",
    alignItems: "center",
  },

  sessionTitle: {
    margin: "0 0 6px",
    color: "#351c75",
  },

  text: {
    margin: "0 0 4px",
    color: "#6b7280",
    fontSize: "14px",
  },

  deleteButton: {
    background: "#ffdddd",
    color: "#b91c1c",
    border: "none",
    borderRadius: "16px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  status: {
    background: "#e8f8df",
    color: "#2f7d32",
    borderRadius: "16px",
    padding: "7px 12px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};

export default AdminDashboard;