"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/shared/MagneticButton";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface FormState {
  name: string;
  brand: string;
  email: string;
  timeline: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  brand: "",
  email: "",
  timeline: "",
  message: "",
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const SUCCESS_REVERT_MS = 8000;

const labelCls =
  "block font-inter text-[10px] tracking-widest uppercase text-[#5C5853] mb-2.5";
const inputCls =
  "w-full bg-transparent border-b border-[rgba(15,14,12,0.15)] py-3 font-inter text-sm text-[#0F0E0C] placeholder:text-[#A39E96] focus:outline-none focus:border-[#C8895A] transition-colors duration-300";

type SubmitStatus = "idle" | "success" | "error";

export default function ContactForm() {
  const { t, lang } = useTranslation();
  const form_t = t.contact.form;

  const [form, setForm] = useState<FormState>(INITIAL);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const revertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revertTimeout.current) clearTimeout(revertTimeout.current);
    };
  }, []);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function validate(): string | null {
    if (form.name.trim().length < 2 || form.name.trim().length > 100) {
      return form_t.error_validation;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      return form_t.error_validation;
    }
    if (form.message.trim().length < 10 || form.message.trim().length > 5000) {
      return form_t.error_validation;
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setSubmitStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          locale: lang,
          brand: form.brand || undefined,
          projectType: form.timeline || undefined,
          _honeypot: honeypot,
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setForm(INITIAL);
        revertTimeout.current = setTimeout(() => {
          setSubmitStatus("idle");
        }, SUCCESS_REVERT_MS);
      } else {
        const payload = await res.json().catch(() => null);
        const code = payload?.code as string | undefined;
        setSubmitStatus("error");
        setErrorMessage(
          code === "RATE_LIMIT"
            ? form_t.error_rate_limit
            : code === "VALIDATION"
            ? form_t.error_validation
            : form_t.error_generic
        );
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(form_t.error_generic);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitStatus === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center min-h-[420px]"
        >
          <p className="font-newsreader italic text-xl md:text-2xl text-[#0F0E0C] text-center leading-relaxed">
            {form_t.success}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          <div>
            <label className={labelCls}>{form_t.name}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={set("name")}
              placeholder="Full name"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>{form_t.brand}</label>
            <input
              type="text"
              value={form.brand}
              onChange={set("brand")}
              placeholder="Brand name"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>{form_t.email}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set("email")}
              placeholder="your@email.com"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>{form_t.timeline}</label>
            <select
              value={form.timeline}
              onChange={set("timeline")}
              className={`${inputCls} appearance-none`}
              style={{ backgroundImage: "none" }}
            >
              <option value="" disabled>
                Select timeline
              </option>
              {form_t.timelines.map((tl) => (
                <option key={tl} value={tl} className="bg-[#F5F1EA] text-[#0F0E0C]">
                  {tl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>{form_t.message}</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={set("message")}
              placeholder="Brief description, goals, references..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <input
            type="text"
            name="_honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          {submitStatus === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-inter text-sm text-[#B3492F]"
              role="alert"
            >
              {errorMessage}
            </motion.p>
          )}

          <MagneticButton>
            <button
              type="submit"
              disabled={isSubmitting}
              data-cursor="cta"
              className="w-full font-inter text-[11px] tracking-widest uppercase text-[#F5F1EA] bg-[#C8895A] hover:bg-[#B07849] disabled:opacity-60 disabled:cursor-not-allowed px-10 py-4 transition-colors duration-300"
            >
              {isSubmitting ? form_t.sending : form_t.submit}
            </button>
          </MagneticButton>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
