function createRandomString(length = 4) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}



function goToEditor() {
    const inputField = document.getElementById("sessionCode");
      let code = inputField.value.trim();

      if (!code) return alert("Please enter a session code!");

      // Redirect to the session page
      window.location.href = `editor.html?code=${code}`;
    }
const rcode = createRandomString();
document.getElementById("sessionCode").value = rcode;

const input = document.getElementById("sessionCode");

input.addEventListener("focus", function () {
  input.select();
});