/* eslint-disable react-refresh/only-export-components */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import LazyOnView from './LazyOnView';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../utils/motion';
import { track } from '../utils/analytics';
import { BOOKING_URL } from '../constants';
import Toast from './Toast';

const CONTACT_EMAIL = 'patrick.namegni@gmail.com';
// const CONTACT_PHONE = '+33 7 49 74 86 56';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        // Auto-fermeture après 5s
        window.clearTimeout(showToast._timeout);
        showToast._timeout = window.setTimeout(() => {
            setToast((prev) => ({ ...prev, message: '' }));
        }, 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Effacer l'erreur du champ dès que l'utilisateur corrige
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = 'Veuillez indiquer votre nom.';
        }

        if (!form.email.trim()) {
            newErrors.email = 'Veuillez indiquer votre adresse email.';
        } else if (!EMAIL_REGEX.test(form.email.trim())) {
            newErrors.email = 'Adresse email invalide.';
        }

        if (!form.subject.trim()) {
            newErrors.subject = "Veuillez préciser l'objet de votre message.";
        }

        if (!form.message.trim()) {
            newErrors.message = 'Veuillez rédiger un message.';
        } else if (form.message.trim().length < 10) {
            newErrors.message = 'Votre message est un peu court (10 caractères minimum).';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            showToast('Merci de corriger les champs indiqués avant d\u2019envoyer votre message.', 'error');
            return;
        }

        setLoading(true);

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                name: form.name,
                from_name: form.name,
                email: form.email,
                reply_to: form.email,
                to_name: 'Patrick NAMEGNI',
                to_email: CONTACT_EMAIL,
                subject: form.subject,
                message: `Objet : ${form.subject}\n\n${form.message}`,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
        .then(() => {
            setLoading(false);
            track('formulaire-envoye');
            showToast('Merci pour votre prise de contact. Je reviendrai vers vous dès que possible.', 'success');

            setForm({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
            setErrors({});
        }, (error) => {
            setLoading(false);

            console.log(error);

            showToast("Problème technique : votre message n'a pas pu être délivré. Essayez par email direct ci-dessous.", 'error');
        })
    }

  return (
    <>
    {/* Hors du bloc animé : une transformation CSS casserait la position fixe du toast */}
    <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, message: '' }))}
    />
    <motion.div
        variants={fadeIn('up', 'tween', 0.2, 0.8)}
        className="xl:mt-12 green-pink-gradient p-[1px] rounded-[24px] shadow-card"
    >

        <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] bg-black-100 rounded-[23px] overflow-hidden">
            {/* Présentation et contacts directs */}
            <div className="p-6 sm:p-10 lg:pb-0">
                <p className={styles.sectionSubText}>Contactez-moi de n{`'`}importe où</p>
                <h3 className={styles.sectionHeadText}>Contact.</h3>

                <p className="mt-4 text-secondary text-[16px] leading-7 max-w-md">
                    Un poste en CDI, une question sur un projet ou simplement un échange : je réponds rapidement.
                </p>

                <p className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 text-white text-[14px]">
                    <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" aria-hidden="true" />
                    Disponible immédiatement · CDI
                </p>

                <div className="mt-8 flex flex-col gap-3">
                    {BOOKING_URL && (
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-umami-event="rdv-clic"
                            data-umami-event-emplacement="contact"
                            className="mb-2 w-fit px-5 py-3 rounded-xl border border-cyan/50 hover:bg-cyan/10 text-white font-semibold text-[15px] transition-colors"
                        >
                            Réserver un appel de 15 min
                        </a>
                    )}
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        data-umami-event="email-clic"
                        className="w-fit text-white font-medium hover:text-accent transition-colors break-all"
                    >
                        <span className="text-secondary font-normal">Email · </span>{CONTACT_EMAIL}
                    </a>
                    <a
                        href="https://www.linkedin.com/in/frank-patrick-namegni/"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-umami-event="linkedin-clic"
                        data-umami-event-emplacement="contact"
                        className="w-fit text-white font-medium hover:text-accent transition-colors"
                    >
                        <span className="text-secondary font-normal">LinkedIn · </span>Patrick Namegni
                    </a>
                </div>
            </div>

            {/* Formulaire : à droite sur ordinateur, juste après la présentation sur mobile */}
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col gap-6 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/10 bg-black-200/40"
            >
                <p className="text-white font-semibold text-[20px]">Écrivez-moi</p>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-3">Votre Nom</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nom ou entreprise"
                            aria-invalid={Boolean(errors.name)}
                            className={`bg-tertiary py-3.5 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium border focus:border-accent/70 transition-colors ${errors.name ? 'border-red-400' : 'border-transparent'}`}
                        />
                        {errors.name && (
                            <span className="text-red-400 text-sm mt-2">{errors.name}</span>
                        )}
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-3">Votre Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Adresse mail"
                            aria-invalid={Boolean(errors.email)}
                            className={`bg-tertiary py-3.5 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium border focus:border-accent/70 transition-colors ${errors.email ? 'border-red-400' : 'border-transparent'}`}
                        />
                        {errors.email && (
                            <span className="text-red-400 text-sm mt-2">{errors.email}</span>
                        )}
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-3">Objet</span>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Ex : Opportunité CDI - Développeur Full-Stack"
                            aria-invalid={Boolean(errors.subject)}
                            className={`bg-tertiary py-3.5 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium border focus:border-accent/70 transition-colors ${errors.subject ? 'border-red-400' : 'border-transparent'}`}
                        />
                        {errors.subject && (
                            <span className="text-red-400 text-sm mt-2">{errors.subject}</span>
                        )}
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-3">Votre Message</span>
                        <textarea
                            rows={5}
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Entrez votre message"
                            aria-invalid={Boolean(errors.message)}
                            className={`bg-tertiary py-3.5 px-5 placeholder:text-secondary text-white rounded-lg outline-none font-medium border focus:border-accent/70 transition-colors ${errors.message ? 'border-red-400' : 'border-transparent'}`}
                        />
                        {errors.message && (
                            <span className="text-red-400 text-sm mt-2">{errors.message}</span>
                        )}
                    </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-accent hover:bg-accent-hover transition-colors py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Envoi...' : 'Envoyer'}
                </button>
            </form>

            {/* Globe du parcours, toujours carré pour ne jamais être rogné */}
            <div className="lg:col-start-1 lg:row-start-2 flex items-end justify-center px-4 pb-4 sm:px-10 sm:pb-6">
                <LazyOnView className="w-full max-w-[460px] aspect-square">
                    <EarthCanvas />
                </LazyOnView>
            </div>
        </div>
    </motion.div>
    </>
  )
}

export default SectionWrapper(Contact, "contact");
