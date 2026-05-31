import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setProfile({
        name: storedUser.name || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")),
        ...profile,
      })
    );

    alert("Profile updated successfully");
  };

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h1 style={styles.title}>My Profile</h1>
            <p style={styles.subtitle}>Manage your account details</p>
          </div>
        </div>

        <form onSubmit={updateProfile} style={styles.formCard}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <label style={styles.label}>Address</label>
          <textarea
            style={styles.textarea}
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <button type="submit" style={styles.updateButton}>
            Update Profile
          </button>
        </form>
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

  backButton: {
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "18px",
    padding: "10px 18px",
    color: "#351c75",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "25px",
  },

  container: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "28px",
    padding: "35px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    marginBottom: "30px",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#7ed957",
    color: "#351c75",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
    fontWeight: "bold",
  },

  title: {
    color: "#351c75",
    fontSize: "34px",
    margin: 0,
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "8px",
  },

  formCard: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    color: "#351c75",
    fontWeight: "bold",
    marginTop: "10px",
  },

  input: {
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  textarea: {
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid #ddd",
    fontSize: "15px",
    minHeight: "90px",
  },

  updateButton: {
    marginTop: "20px",
    background: "#7ed957",
    color: "#1f2937",
    border: "none",
    borderRadius: "22px",
    padding: "14px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Profile;