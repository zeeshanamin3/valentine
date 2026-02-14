const answerBtn = document.getElementById("answerBtn");
const secret = document.getElementById("secret");

const notes = [
  "Yay! I pinky-promise endless cuddles and boba dates. 🧋💗",
  "Best answer ever. You + me + love = forever. 💞",
  "My heart just did a happy dance! Let's celebrate with boba. ✨",
];

let idx = 0;

answerBtn?.addEventListener("click", () => {
  secret.textContent = notes[idx % notes.length];
  idx += 1;
});
