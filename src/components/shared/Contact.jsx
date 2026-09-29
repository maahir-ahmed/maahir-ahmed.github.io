import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_fa1kdsx';
const EMAILJS_TEMPLATE_ID = 'template_t6ie0qm';
const EMAILJS_PUBLIC_KEY = 'lTjsJHQqOgxtgvbbU';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact({ text, showNotification }) {
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
      // Sent under both naming styles: EmailJS's default "Contact Us" template
      // uses {{name}}/{{email}}/{{title}}, older templates use {{from_name}}/{{from_email}}.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          from_name: name,
          from_email: email,
          reply_to: email,
          message,
          title: `Website message from ${name}`,
          time: new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      showNotification("Thank you for your message! I'll get back to you soon.", 'success');
      formRef.current.reset();
    } catch {
      showNotification(
        `Oops! Something went wrong. Please try again or email me directly at ${text.email}`,
        'error',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">{text.title}</h2>
        <div className="contact-content">
          <div className="contact-info">
            {text.blurb.map(para => <p key={para}>{para}</p>)}
            <a className="contact-email" href={`mailto:${text.email}`}>
              {text.email}
            </a>
            <dl className="spec-list">
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href={text.linkedinUrl} target="_blank" rel="noreferrer">
                    {text.linkedinLabel}
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
