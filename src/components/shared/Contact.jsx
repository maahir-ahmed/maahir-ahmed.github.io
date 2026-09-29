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
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get in touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              I&apos;m always open to discussing new opportunities, collaborating on interesting
              projects, or just having a chat about technology and computer science.
            </p>
            <a className="contact-email" href="mailto:maahirahmed2910@gmail.com">
              maahirahmed2910@gmail.com
            </a>
            <dl className="spec-list">
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href="https://www.linkedin.com/in/maahir-ahmed/" target="_blank" rel="noreferrer">
                    linkedin.com/in/maahir-ahmed
                  </a>
                </dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href="https://github.com/maahir-ahmed" target="_blank" rel="noreferrer">
                    github.com/maahir-ahmed
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <label className="form-group">
              <span>Name</span>
              <input type="text" name="from_name" autoComplete="name" required />
            </label>
            <label className="form-group">
              <span>Email</span>
              <input type="email" name="from_email" autoComplete="email" required />
            </label>
            <label className="form-group">
              <span>Message</span>
              <textarea name="message" rows={5} required />
            </label>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
