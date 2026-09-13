/* eslint-disable react-refresh/only-export-components */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
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
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, message: '' }))}
        />

        <motion.div
            variants={slideIn('left', 'tween', 0.2, 1)}
            className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
            <p className={styles.sectionSubText}>Contactez-moi de n{`'`}importe où</p>
            <h3 className={styles.sectionHeadText}>Contact.</h3>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="mt-12 flex flex-col gap-8"
            >
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Votre Nom</span>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nom ou entreprise"
                        aria-invalid={Boolean(errors.name)}
                        className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none font-medium border ${errors.name ? 'border-red-400' : 'border-transparent'}`}
                    />
                    {errors.name && (
                        <span className="text-red-400 text-sm mt-2">{errors.name}</span>
                    )}
                </label>
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Votre Email</span>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Adresse mail"
                        aria-invalid={Boolean(errors.email)}
                        className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none font-medium border ${errors.email ? 'border-red-400' : 'border-transparent'}`}
                    />
                    {errors.email && (
                        <span className="text-red-400 text-sm mt-2">{errors.email}</span>
                    )}
                </label>
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Objet</span>
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Ex : Opportunité CDI - Développeur Fullstack"
                        aria-invalid={Boolean(errors.subject)}
                        className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none font-medium border ${errors.subject ? 'border-red-400' : 'border-transparent'}`}
                    />
                    {errors.subject && (
                        <span className="text-red-400 text-sm mt-2">{errors.subject}</span>
                    )}
                </label>
                <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">Votre Message</span>
                    <textarea
                        rows={7}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Entrez votre message"
                        aria-invalid={Boolean(errors.message)}
                        className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none font-medium border ${errors.message ? 'border-red-400' : 'border-transparent'}`}
                    />
                    {errors.message && (
                        <span className="text-red-400 text-sm mt-2">{errors.message}</span>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Envoi...' : 'Envoyer'}
                </button>
            </form>
        </motion.div>

        <motion.div
            variants={slideIn('right', 'tween', 0.2, 1)}
            className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
            <EarthCanvas />
        </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");
