window.addEventListener('DOMContentLoaded', () => {
      const textarea = document.querySelector('textarea');
      const lineNumbers = document.querySelector('.line-numbers');

      function updateLineNumbers() {
        const lines = textarea.value.split('\n').length;
        lineNumbers.innerHTML = '';
        for (let i = 1; i <= lines; i++) {
          const line = document.createElement('span');
          line.textContent = i;
          lineNumbers.appendChild(line);
        }
      }

      textarea.addEventListener('input', updateLineNumbers);
      textarea.addEventListener('scroll', () => {
        lineNumbers.scrollTop = textarea.scrollTop;
      });

      updateLineNumbers();
});
    

const socket = io(window.location.origin);
const textarea = document.getElementById("editor");
const sessionCode = new URLSearchParams(window.location.search).get("code");

document.getElementById("sessionDisplay").innerText = sessionCode || "none";

if (sessionCode) {
  socket.emit("join-session", sessionCode);

  socket.on("load-session", (text) => {
    textarea.value = text;
  });

textarea.addEventListener("input", () => {
  socket.emit("text-change", textarea.value);
});

socket.on("receive-text", (text) => {
  textarea.value = text;
});
}