import React from "react";

export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hello, Super Admin 👋</h1>
      <p style={styles.subtitle}>Welcome to your dashboard</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "#f7f7f7",
    height: "100vh",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
  },
};
