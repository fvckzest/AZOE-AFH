import { useState } from 'react'
import {
  aboutHomePoints,
  contact,
  faqs,
  homeDetails,
  missionHighlights,
  navLinks,
  services,
  smallerHomeBenefits,
  specialties,
} from './siteData'

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  )
}

function App() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="AZOE Adult Family Home home">
            <img
              className="brand-mark"
              src="/azoe-logo.png"
              alt=""
              aria-hidden="true"
            />
            <span>
              <strong>AZOE</strong>
              <small>Adult Family Home</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="button button-primary header-cta" href={contact.primaryPhoneHref}>
            Call now
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section" id="top">
          <div className="container">
            <div className="hero-card">
              <div className="hero-lead">
                <img
                  className="hero-logo"
                  src="/azoe-logo.png"
                  alt="AZOE Adult Family Home logo"
                />

                <div className="hero-copy">
                  <p className="eyebrow">Warm, Personal Senior Support</p>
                  <h1>Personalized Adult Family Home Care in a Warm Residential Setting</h1>
                  <p className="hero-text">
                    AZOE Adult Family Home provides personal care assistance, medication
                    support, daily structure, and a calm place that feels like home in
                    Lacey, Washington.
                  </p>
                </div>
              </div>

              <div className="hero-actions">
                <a className="button button-primary" href={contact.primaryPhoneHref}>
                  Call now
                </a>
                <a className="button button-secondary" href={`mailto:${contact.email}`}>
                  Send email
                </a>
              </div>

              <div className="hero-note">
                Led by {contact.provider}, with support that may include personal
                care, transportation assistance, community integration, and respite
                care for family caregivers.
              </div>
            </div>
          </div>
        </section>

        <section className="section intro-section">
          <div className="container intro-card">
            <SectionHeading
              eyebrow="A human approach"
              title="Choosing care for a loved one can feel overwhelming."
              copy="The goal at AZOE is to make that decision feel clearer, safer, and more human. Families deserve honest conversations, compassionate guidance, and a place where their loved one can feel known, cared for, and supported in a peaceful residential setting."
            />
          </div>
        </section>

        <section className="section" id="care">
          <div className="container">
            <SectionHeading
              eyebrow="Care services"
              title="Support includes the daily help families rely on most."
            />

            <div className="card-grid services-grid">
              {services.map((service) => (
                <article key={service.title} className="info-card service-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-section" id="home">
          <div className="container">
            <div>
              <SectionHeading
                eyebrow="A smaller home environment"
                title="Why families often value an adult family home setting"
                copy="For many families, a smaller residential care home feels more personal and less overwhelming than a larger community, while still offering dependable daily support."
              />
              <ul className="feature-list">
                {smallerHomeBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section about-section">
          <div className="container">
            <SectionHeading
              eyebrow="About the home"
              title="A calmer, more personal care setting for families seeking clarity and support"
              copy="AZOE is designed to feel residential, steady, and human. These highlights help families understand the character of the home and the kind of support it offers."
            />

            <div className="about-grid">
              <article className="mission-card">
                <p className="eyebrow">Our mission</p>
                <h3>
                  A home that offers assurance of quality care, zeal in service,
                  a peaceful oasis, and empathy at the heart of all interactions.
                </h3>
                <ul className="mission-list" aria-label="Mission highlights">
                  {missionHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <div className="about-points">
                {aboutHomePoints.map((point) => (
                  <article key={point.title} className="info-card about-point-card">
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section details-section">
          <div className="container">
            <SectionHeading
              eyebrow="Home details"
              title="Important details families often ask about right away"
              copy="These listing details are included here to make it easier to compare AZOE with other care options while keeping the page warm and personal."
            />

            <div className="details-layout">
              <article className="details-panel">
                <p className="eyebrow">Specialty</p>
                <h3>Focused support for residents with more specialized care needs</h3>
                <ul className="feature-list">
                  {specialties.map((specialty) => (
                    <li key={specialty}>{specialty}</li>
                  ))}
                </ul>
              </article>

              <div className="card-grid details-grid">
                {homeDetails.map((detail) => (
                  <article key={detail.title} className="info-card">
                    <h3>{detail.title}</h3>
                    <p>{detail.description}</p>
                  </article>
                ))}

                <article className="info-card">
                  <h3>License information</h3>
                  <p>Washington adult family home license number: {contact.licenseNumber}.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section fit-section">
          <div className="container">
            <div>
              <SectionHeading
                eyebrow="Who we’re a good fit for"
                title="AZOE may be a good fit for families looking for care for a loved one who needs help with daily living, supervision, companionship, or a quieter home-based care environment."
                copy="Families often reach out when they want a smaller care setting with more personal attention, calmer routines, and support that feels steadier and more human."
              />
            </div>
          </div>
        </section>

        <section className="section reassurance-section">
          <div className="container reassurance-banner">
            <div>
              <p className="eyebrow">Family reassurance</p>
              <h2>Start with a simple conversation</h2>
              <p>
                You do not need to have everything figured out before reaching out.
                We can talk through your loved one’s needs, answer questions, and
                help you understand whether AZOE Adult Family Home is the right fit.
              </p>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={contact.primaryPhoneHref}>
                Call now
              </a>
              <a className="button button-secondary" href={`mailto:${contact.email}`}>
                Send email
              </a>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container">
            <SectionHeading
              eyebrow="FAQ"
              title="Helpful answers for families exploring care"
            />

            <div className="faq-list">
              {faqs.map((item, index) => (
                <div key={item.question} className="faq-item">
                  <button
                    className="faq-trigger"
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() => {
                      setOpenFaq(openFaq === index ? null : index)
                    }}
                  >
                    <span>{item.question}</span>
                  </button>
                  {openFaq === index ? <p>{item.answer}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container">
            <div className="contact-copy">
              <SectionHeading
                eyebrow="Contact"
                title="Reach out when you’re ready"
                copy={`A phone call or email is the simplest first step. You can reach ${contact.provider} directly using the details below.`}
              />

              <article className="info-card contact-card-single">
                <div className="contact-detail-group">
                  <h3>Phone</h3>
                  <p>
                    <a href={contact.primaryPhoneHref}>{contact.primaryPhone}</a>
                  </p>
                  <h3>Email</h3>
                  <p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                </div>

                <div className="contact-detail-group">
                  <h3>Location</h3>
                  <p>{contact.addressLine1}</p>
                  <p>{contact.addressLine2}</p>
                  <p>License #{contact.licenseNumber}</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>AZOE Adult Family Home</strong>
            <p>A home that offers assurance of quality care, zeal in service, a peaceful oasis, and empathy at the heart of all interactions.</p>
          </div>
          <div>
            <p>{contact.primaryPhone}</p>
            <p>{contact.addressLine2}</p>
          </div>
          <p>© {new Date().getFullYear()} AZOE Adult Family Home</p>
        </div>
      </footer>
    </div>
  )
}

export default App
