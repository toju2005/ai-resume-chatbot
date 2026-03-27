import React, { useState } from "react";
import jsPDF from "jspdf";

export default function ResumeChatbot() {
const [messages, setMessages] = useState([
{ role: "bot", text: "Hi! I will help you build your resume 🤖" },
{ role: "bot", text: "What is your full name?" }
]);
const [step, setStep] = useState(0);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
name: "",
role: "",
education: "",
skills: "",
projects: ""
});

const questions = [
"What is your full name?",
"What role are you targeting?",
"Tell me your education",
"List your skills (comma separated)",
"Tell me your projects"
];

const keys = Object.keys(formData);

const handleSend = () => {
if (!input) return;


const userMsg = { role: "user", text: input };
const updatedData = { ...formData, [keys[step]]: input };

setFormData(updatedData);
setInput("");

let newMessages = [...messages, userMsg];
setMessages(newMessages);
setLoading(true);

setTimeout(() => {
  let botReplies = [];

  // AI-like suggestion
  if (keys[step] === "role") {
    botReplies.push({
      role: "bot",
      text: "💡 Based on your role, you can add skills like: Java, Python, React, SQL"
    });
  }

  // Ask next question
  if (step < questions.length - 1) {
    botReplies.push({
      role: "bot",
      text: questions[step + 1]
    });
    setStep(step + 1);
  } else {
    botReplies.push({
      role: "bot",
      text: "✅ Your resume is ready below!"
    });
  }

  setMessages([...newMessages, ...botReplies]);
  setLoading(false);
}, 1000);


};

const generateResume = () => {
return {
...formData,
skills: formData.skills.split(","),
projects: formData.projects.split(",")
};
};

const downloadPDF = () => {
const data = generateResume();
const doc = new jsPDF();


let y = 20;

doc.setFontSize(18);
doc.text(data.name, 10, y);
y += 10;

doc.setFontSize(12);
doc.text(data.role, 10, y);
y += 10;

doc.line(10, y, 200, y);
y += 10;

doc.setFontSize(14);
doc.text("Education", 10, y);
y += 8;
doc.setFontSize(11);
doc.text(data.education, 10, y);
y += 10;

doc.setFontSize(14);
doc.text("Skills", 10, y);
y += 8;
data.skills.forEach(s => {
  doc.text("• " + s.trim(), 10, y);
  y += 6;
});

y += 5;

doc.setFontSize(14);
doc.text("Projects", 10, y);
y += 8;
data.projects.forEach(p => {
  doc.text("• " + p.trim(), 10, y);
  y += 6;
});

doc.save("Resume.pdf");


};

const resume = generateResume();

return (
<div style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "linear-gradient(135deg, #1e3c72, #2a5298)"
}}>


  <div style={{
    width: "650px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "20px",
    color: "white"
  }}>

    <h2 style={{ textAlign: "center" }}>🤖 AI Resume Chatbot</h2>

    {/* CHAT */}
    <div style={{
      height: "320px",
      overflowY: "auto",
      marginBottom: "10px"
    }}>
      {messages.map((m, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: m.role === "user" ? "flex-end" : "flex-start"
        }}>
          <div style={{
            background: m.role === "user" ? "#00c6ff" : "rgba(255,255,255,0.2)",
            padding: "8px 12px",
            borderRadius: "10px",
            margin: "5px",
            maxWidth: "70%"
          }}>
            {m.text}
          </div>
        </div>
      ))}

      {loading && <p>🤖 Typing...</p>}
    </div>

    {/* INPUT */}
    {step < questions.length && (
      <div style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={questions[step]}
          style={{ flex: 1, padding: "10px", borderRadius: "10px" }}
        />
        <button onClick={handleSend} style={{ marginLeft: "10px" }}>
          Send
        </button>
      </div>
    )}

    {/* RESULT */}
    {step === questions.length - 1 && formData.projects && (
      <>
        <div style={{
          background: "white",
          color: "black",
          marginTop: "10px",
          padding: "15px",
          borderRadius: "10px"
        }}>
          <h2>{resume.name}</h2>
          <p><b>{resume.role}</b></p>
          <hr />

          <h3>Education</h3>
          <p>{resume.education}</p>

          <h3>Skills</h3>
          <ul>
            {resume.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3>Projects</h3>
          <ul>
            {resume.projects.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        <button onClick={downloadPDF} style={{ marginTop: "10px" }}>
          ⬇ Download Resume PDF
        </button>
      </>
    )}

  </div>
</div>


);
}
