import "./ContactPage.css";

function Contact() {
  return (
    <div className="contact-section">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>
          📧 Email: <a href="mailto:abcd@example.com">abcd@example.com</a>
        </p>
        <p>
          📞 Phone: <a href="tel:+911234567890">+91 12345 67890</a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
