"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import LazyOnView from "./LazyOnView";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { track } from "../utils/analytics";
import useVisitorCompany from "../hooks/useVisitorCompany";
import { BOOKING_URL } from "../constants";
import { useI18n } from "../i18n/I18nProvider";
import Toast from "./Toast";

export const CONTACT_EMAIL = "patrick.namegni@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/frank-patrick-namegni/";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const copy = {
  fr: {
    eyebrow: "Parlons-en",
    title: "Contact.",
    intro: "Un poste en CDI, une question sur un projet ? Écrivez-moi, ou réservez un appel.",
    booking: "Réserver un appel de 15 min",
    name: "Votre nom",
    namePh: "Prénom Nom",
    email: "Votre e-mail",
    emailPh: "vous@entreprise.com",
    company: "Entreprise (facultatif)",
    companyPh: "Nom de l'entreprise",
    message: "Votre message",
    messagePh: "Bonjour Patrick, nous recrutons…",
    send: "Envoyer le message",
    sending: "Envoi…",
    note: "Votre message m'arrive directement par e-mail.",
    errors: {
      name: "Veuillez indiquer votre nom.",
      email: "Veuillez indiquer votre adresse e-mail.",
      emailInvalid: "Adresse e-mail invalide.",
      message: "Veuillez rédiger un message.",
      messageShort: "Votre message est un peu court (10 caractères minimum).",
    },
    toastFix: "Merci de corriger les champs indiqués avant d'envoyer votre message.",
    toastOk: "Merci pour votre message. Je reviens vers vous dès que possible.",
    toastKo: "Problème technique : votre message n'a pas pu être envoyé. Écrivez-moi directement par e-mail.",
    subject: (name, company) => `Portfolio · ${name}${company ? ` (${company})` : ""}`,
    companyLine: "Entreprise",
  },
  en: {
    eyebrow: "Let's talk",
    title: "Contact.",
    intro: "A full-time role, a question about a project? Write to me, or book a call.",
    booking: "Book a 15-min call",
    name: "Your name",
    namePh: "First and last name",
    email: "Your email",
    emailPh: "you@company.com",
    company: "Company (optional)",
    companyPh: "Company name",
    message: "Your message",
    messagePh: "Hi Patrick, we are hiring…",
    send: "Send message",
    sending: "Sending…",
    note: "Your message comes straight to my inbox.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter your email address.",
      emailInvalid: "Invalid email address.",
      message: "Please write a message.",
      messageShort: "Your message is a little short (10 characters minimum).",
    },
    toastFix: "Please fix the highlighted fields before sending your message.",
    toastOk: "Thanks for your message. I'll get back to you as soon as possible.",
    toastKo: "Technical issue: your message could not be sent. Please email me directly.",
    subject: (name, company) => `Portfolio (EN) · ${name}${company ? ` (${company})` : ""}`,
    companyLine: "Company",
  },
};

const MailIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" />
  </svg>
);

// Champ de formulaire : libellé au-dessus, message d'erreur relié au champ (aria-describedby)
const Field = ({ id, label, error, multiline = false, ...props }) => {
  const Tag = multiline ? "textarea" : "input";
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-[14px] font-medium text-white">
      {label}
      <Tag
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`bg-tertiary rounded-xl px-4 py-3.5 text-[15px] font-normal text-white placeholder:text-[#8c88a8] border outline-none transition-colors focus:border-accent ${
          error ? "border-red-400" : "border-white/[0.12]"
        }`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-red-400 text-[13px] font-normal">
          {error}
        </span>
      )}
    </label>
  );
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  multiline: PropTypes.bool,
};

const EMPTY = { name: "", email: "", company: "", message: "" };

const Contact = () => {
  const { locale, t } = useI18n();
  const c = copy[locale];
  const visitorCompany = useVisitorCompany();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(showToast._timeout);
    showToast._timeout = window.setTimeout(() => setToast((prev) => ({ ...prev, message: "" })), 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = c.errors.name;
    if (!form.email.trim()) next.email = c.errors.email;
    else if (!EMAIL_REGEX.test(form.email.trim())) next.email = c.errors.emailInvalid;
    if (!form.message.trim()) next.message = c.errors.message;
    else if (form.message.trim().length < 10) next.message = c.errors.messageShort;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      showToast(c.toastFix, "error");
      return;
    }

    setLoading(true);
    // Entreprise : celle saisie, sinon celle du lien personnalisé (?pour=…)
    const company = form.company.trim() || visitorCompany || "";
    const subject = c.subject(form.name.trim(), company);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          reply_to: form.email,
          to_name: "Patrick NAMEGNI",
          to_email: CONTACT_EMAIL,
          subject,
          message: `${company ? `${c.companyLine} : ${company}\n\n` : ""}${form.message}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          track("formulaire-envoye", { langue: locale });
          showToast(c.toastOk, "success");
          setForm(EMPTY);
          setErrors({});
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showToast(c.toastKo, "error");
        }
      );
  };

  return (
    <>
      {/* Hors du bloc animé : une transformation CSS casserait la position fixe du toast */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast((prev) => ({ ...prev, message: "" }))} />

      <motion.div
        variants={fadeIn("up", "tween", 0.2, 0.8)}
        className="rounded-[28px] border border-transparent p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-10 lg:gap-12 [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]"
      >
        {/* Présentation, contacts directs et globe du parcours */}
        <div className="lg:flex-1 min-w-0 flex flex-col gap-[18px]">
          <p className={styles.sectionSubText}>{c.eyebrow}</p>
          <h2 className="-mt-2 text-white font-black text-[clamp(32px,4vw,56px)] leading-[1.05]">{c.title}</h2>
          <p className="max-w-[460px] text-[17px] leading-[1.65] font-light">{c.intro}</p>
          <p className="w-fit inline-flex items-center gap-2.5 px-3.5 py-[7px] rounded-full border border-cyan/40 bg-cyan/10 text-[14px] text-white">
            <span className="w-2 h-2 rounded-full bg-cyan" aria-hidden="true" />
            {t.common.available}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-umami-event="email-clic"
              className="inline-flex items-center gap-2.5 min-h-[44px] px-4 rounded-xl border border-white/[0.14] text-white text-[15px] hover:border-cyan/60 transition-colors break-all"
            >
              <MailIcon />
              {CONTACT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="linkedin-clic"
              data-umami-event-emplacement="contact"
              className="inline-flex items-center gap-2.5 min-h-[44px] px-4 rounded-xl border border-white/[0.14] text-white text-[15px] hover:border-cyan/60 transition-colors"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            {BOOKING_URL && (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="rdv-clic"
                data-umami-event-emplacement="contact"
                className="inline-flex items-center min-h-[44px] px-4 rounded-xl border border-cyan/50 bg-cyan/10 text-white text-[15px] font-semibold hover:bg-cyan/20 transition-colors"
              >
                {c.booking}
              </a>
            )}
          </div>

          {/* Globe du parcours, toujours carré pour ne jamais être rogné */}
          <LazyOnView className="hidden lg:block mt-3 w-full max-w-[440px] aspect-square">
            <EarthCanvas />
          </LazyOnView>
        </div>

        <form onSubmit={handleSubmit} noValidate className="lg:flex-1 min-w-0 self-start w-full flex flex-col gap-5">
          <Field id="contact-name" name="name" label={c.name} placeholder={c.namePh} value={form.name} onChange={handleChange} error={errors.name} autoComplete="name" />
          <Field id="contact-email" name="email" type="email" label={c.email} placeholder={c.emailPh} value={form.email} onChange={handleChange} error={errors.email} autoComplete="email" />
          <Field
            id="contact-company"
            name="company"
            label={c.company}
            placeholder={visitorCompany || c.companyPh}
            value={form.company}
            onChange={handleChange}
            autoComplete="organization"
          />
          <Field id="contact-message" name="message" multiline rows={7} label={c.message} placeholder={c.messagePh} value={form.message} onChange={handleChange} error={errors.message} />
          <button
            type="submit"
            disabled={loading}
            className="min-h-[52px] rounded-[14px] bg-[#7c4dff] hover:bg-accent text-white font-semibold text-[16px] shadow-[0_14px_36px_-14px_rgba(145,94,255,0.8)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? c.sending : c.send}
          </button>
          <p className="text-[13px] text-secondary">{c.note}</p>
        </form>

        {/* Téléphone et tablette : le globe passe après le formulaire */}
        <LazyOnView className="lg:hidden w-full max-w-[400px] mx-auto aspect-square">
          <EarthCanvas />
        </LazyOnView>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
