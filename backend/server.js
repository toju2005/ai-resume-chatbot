const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// AI-like resume generator
app.post("/api/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let skills = [];
  let projects = [];
  let summary = "";

  // SOFTWARE ROLE
  if (msg.includes("software")) {
    skills = ["Java", "Python", "DSA", "React", "Node.js"];
    projects = [
      "E-commerce Website",
      "AI Chatbot",
      "Portfolio Website"
    ];
    summary =
      "Motivated software developer with strong problem-solving and coding skills.";
  }

  // DATA ROLE
  else if (msg.includes("data")) {
    skills = ["Python", "Pandas", "Machine Learning", "SQL"];
    projects = [
      "Sales Prediction Model",
      "Data Dashboard",
      "Customer Analysis"
    ];
    summary =
      "Data-driven individual skilled in analytics and visualization.";
  }

  // CYBERSECURITY
  else if (msg.includes("cyber")) {
    skills = ["Network Security", "Ethical Hacking", "Linux", "Cryptography"];
    projects = [
      "Vulnerability Scanner",
      "Password Cracker Simulation"
    ];
    summary =
      "Cybersecurity enthusiast focused on protecting systems and networks.";
  }

  else {
    return res.json({
      reply: "Please enter a role like Software Engineer, Data Analyst, Cybersecurity."
    });
  }

  // RANDOMIZATION (makes it look like AI)
  const randomExtra = ["Team Player", "Quick Learner", "Problem Solver"];
  skills.push(randomExtra[Math.floor(Math.random() * randomExtra.length)]);

  const reply = `
======= GENERATED RESUME =======

Skills:
${skills.join(", ")}

Projects:
${projects.join(", ")}

Summary:
${summary}
`;

  res.json({ reply });
});

app.listen(5001, () => {
    console.log("Server running on port 5001");
  });