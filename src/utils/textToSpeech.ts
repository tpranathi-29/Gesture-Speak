export function speakWord(text: string) {
  if (
    typeof SpeechSynthesisUtterance === "undefined" ||
    typeof window.speechSynthesis === "undefined"
  ) {
    alert("Your browser does not support Text-to-Speech.");
    return;
  }

  // Cancel any previous, unfinished speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}