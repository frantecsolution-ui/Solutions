const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

const year = document.querySelectorAll(".year");
year.forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

const EMAILJS_SERVICE_ID = "service_di6n2qv";
const EMAILJS_PUBLIC_KEY = "n8TmasFGAuxkGM7A7";
const CONTACT_TEMPLATE_ID = "template_bvcmpcb";
const QUOTE_TEMPLATE_ID = "template_ju9alz6";

if (window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#contactStatus");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      contactStatus.textContent = "Please complete all fields before submitting.";
      contactStatus.style.color = "#d93025";
      return;
    }

    contactStatus.textContent = "Submitting...";
    contactStatus.style.color = "#0c4a6e";

    try {
      if (!window.emailjs) {
        throw new Error("EmailJS is not available.");
      }

      await emailjs.send(EMAILJS_SERVICE_ID, CONTACT_TEMPLATE_ID, {
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
        reply_to: payload.email,
        subject: "New contact message from Franktec website",
      });

      contactStatus.textContent = "Message sent successfully.";
      contactStatus.style.color = "#0f9d58";
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent = error.message || "Something went wrong.";
      contactStatus.style.color = "#d93025";
    }
  });
}

const quoteForm = document.querySelector("#quoteForm");
const quoteStatus = document.querySelector("#quoteStatus");

if (quoteForm && quoteStatus) {
  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const serviceType = (formData.get("serviceType") || "").toString().trim();
    const details = (formData.get("details") || "").toString().trim();

    if (!name || !serviceType) {
      quoteStatus.textContent = "Please complete the required fields before submitting.";
      quoteStatus.style.color = "#d93025";
      return;
    }

    quoteStatus.textContent = "Submitting...";
    quoteStatus.style.color = "#0c4a6e";

    try {
      if (!window.emailjs) {
        throw new Error("EmailJS is not available.");
      }

      const fileInput = quoteForm.querySelector('input[type="file"]');
      const uploadedFile = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

      const templateParams = {
        name,
        email: email || "Not provided",
        serviceType,
        details: details || "No additional project details provided.",
        fileUpload: uploadedFile ? uploadedFile.name : "No file attached",
        attachments: uploadedFile ? [uploadedFile] : [],
      };

      await emailjs.send(EMAILJS_SERVICE_ID, QUOTE_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });

      quoteStatus.textContent = "Quote request sent successfully.";
      quoteStatus.style.color = "#0f9d58";
      quoteForm.reset();
    } catch (error) {
      quoteStatus.textContent = error.message || "Something went wrong.";
      quoteStatus.style.color = "#d93025";
    }
  });
}
