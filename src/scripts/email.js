import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const timeInput = document.createElement("input");
    timeInput.setAttribute("type", "hidden");
    timeInput.setAttribute("name", "time");
    timeInput.setAttribute("value", new Date().toLocaleString());
    this.appendChild(timeInput);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        this
      )
      .then(() => alert("¡Mensaje enviado con éxito! 🎉"))
      .catch((error) => console.error("Error al enviar:", error));
  });
