
const email = "oluwatosindavid134@gmail.com";
const messages = document.getElementById("messages");
document.querySelectorAll(".quick button").forEach(btn => {
  btn.addEventListener("click", () => {
    const choice = btn.textContent.trim();
    const user = document.createElement("div");
    user.className = "msg user";
    user.textContent = choice;
    messages.appendChild(user);
    const ai = document.createElement("div");
    ai.className = "msg ai";
    ai.textContent =
      choice.includes("appointment") ? "Absolutely. What day and time would work best for you?" :
      choice.includes("pricing") ? "I can collect your details and prepare a project enquiry for the team." :
      "Sure — share your name, email and what you need help with.";
    messages.appendChild(ai);
    messages.scrollTop = messages.scrollHeight;
  });
});

document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = e.target.querySelectorAll("input, textarea");
  const name = fields[0].value.trim();
  const mail = fields[1].value.trim();
  const project = fields[2].value.trim();
  const subject = encodeURIComponent("Nexa portfolio project enquiry");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${mail}\n\nProject details:\n${project}`);
  document.getElementById("status").textContent = "Opening your email app…";
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
