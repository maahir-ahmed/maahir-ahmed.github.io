import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_fa1kdsx';
const EMAILJS_TEMPLATE_ID = 'template_t6ie0qm';
const EMAILJS_PUBLIC_KEY = 'lTjsJHQqOgxtgvbbU';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact({ showNotification }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const name = data.get('from_name');
    const email = data.get('from_email');
    const message = data.get('message');

    if (!name || !email || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    setSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      showNotification("Thank you for your message! I'll get back to you soon.", 'success');
      formRef.current.reset();
    } catch {
      showNotification(
        'Oops! Something went wrong. Please try again or email me directly at maahirahmed2910@gmail.com',
        'error',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let&apos;s Connect!</h3>
            <p>
              I&apos;m always open to discussing new opportunities, collaborating on interesting
              projects, or just having a chat about technology and computer science.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:maahirahmed2910@gmail.com">maahirahmed2910@gmail.com</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">💼</div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/maahir-ahmed/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/maahir-ahmed/
                  </a>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">💻</div>
                <div className="contact-details">
                  <h4>GitHub</h4>
                  <a
                    href="https://github.com/maahir-ahmed"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/maahir-ahmed
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
