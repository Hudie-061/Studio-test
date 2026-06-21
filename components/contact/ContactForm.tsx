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

// Maps a subscription tier key (carried via the #contact?plan=<key> hash
// set by the Subscription tiers) to the project-type value sent to Resend.
const PLAN_LABELS: Record<string, string> = {
  essential: "Subscription · Essential",
  considered: "Subscription · Considered",
  bespoke: "Subscription · Bespoke",
};

const labelCls =
  "block font-inter text-[10px] tracking-widest uppercase text-[#5C5853] mb-2.5";
const inputCls =
  "w-full bg-transparent border-b border-[rgba(15,14,12,0.15)] py-3 font-inter text-sm text-[#0F0E0C] placeholder:text-[#A39E96] focus:outline-none focus:border-[#C8895A] transition-colors duration-300";
const fieldErrorCls = "font-newsreader italic text-xs text-rose-500 mt-1.5";

type SubmitStatus = "idle" | "success" | "error";
type FieldName = "name" | "email" | "message";

export default function ContactForm() {
  const { t, lang } = useTranslation();
  const form_t = t.contact.form;

  const [form, setForm] = useState<FormState>(INITIAL);
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyMessageModal, setShowEmptyMessageModal] = useState(false);
  const revertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      if (revertTimeout.current) clearTimeout(revertTimeout.current);
    };
  }, []);

  // Picks up the subscription tier carried via #contact?plan=<key>, set by
  // the Subscribe links in the Subscription section, both on first load and
  // when the hash changes without a full navigation (same-page click).
  useEffect(() => {
    function applyPlanFromHash() {
      const match = window.location.hash.match(/plan=([\w-]+)/);
      const label = match ? PLAN_LABELS[match[1]] : undefined;
      if (label) {
        setPlanLabel(label);
        setForm((prev) => ({ ...prev, timeline: label }));
      }
    }
    applyPlanFromHash();
    window.addEventListener("hashchange", applyPlanFromHash);
    return () => window.removeEventListener("hashchange", applyPlanFromHash);
  }, []);

  useEffect(() => {
    if (!showEmptyMessageModal) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModalAndFocusMessage();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEmptyMessageModal]);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === "name" || field === "email" || field === "message") {
        setFieldErrors((prev) => {
          if (!prev[field]) return prev;
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  function validateField(field: FieldName, value: string): string | null {
    if (field === "name") {
      const len = value.trim().length;
      if (len < 2 || len > 100) return form_t.field_name_required;
    }
    if (field === "email") {
      if (!EMAIL_REGEX.test(value.trim())) return form_t.field_email_required;
    }
    if (field === "message") {
      if (value.trim().length > 5000) return form_t.field_message_too_long;
    }
    return null;
  }

  const handleBlur = (field: FieldName) => () => {
    const error = validateField(field, form[field]);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  function closeModalAndFocusMessage() {
    setShowEmptyMessageModal(false);
    messageRef.current?.focus();
  }

  async function submitForm() {
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
        setPlanLabel(null);
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    (["name", "email", "message"] as FieldName[]).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) errors[field] = error;
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (form.message.trim().length === 0) {
      setShowEmptyMessageModal(true);
      return;
    }

    await submitForm();
  };

  const handleSendAnyway = () => {
    setShowEmptyMessageModal(false);
    void submitForm();
  };

  return (
    <>
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
                onBlur={handleBlur("name")}
                placeholder="Full name"
                aria-invalid={!!fieldErrors.name}
                className={inputCls}
              />
              {fieldErrors.name && (
                <p className={fieldErrorCls}>{fieldErrors.name}</p>
              )}
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
                onBlur={handleBlur("email")}
                placeholder="your@email.com"
                aria-invalid={!!fieldErrors.email}
                className={inputCls}
              />
              {fieldErrors.email && (
                <p className={fieldErrorCls}>{fieldErrors.email}</p>
              )}
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
                {planLabel && (
                  <option value={planLabel} className="bg-[#F5F1EA] text-[#0F0E0C]">
                    {planLabel}
                  </option>
                )}
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
                ref={messageRef}
                rows={5}
                value={form.message}
                onChange={set("message")}
                onBlur={handleBlur("message")}
                placeholder="Brief description, goals, references..."
                aria-invalid={!!fieldErrors.message}
                className={`${inputCls} resize-none`}
              />
              {fieldErrors.message && (
                <p className={fieldErrorCls}>{fieldErrors.message}</p>
              )}
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

      <AnimatePresence>
        {showEmptyMessageModal && (
          <motion.div
            key="empty-message-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
            style={{ backgroundColor: "rgba(15, 14, 12, 0.7)" }}
            onClick={closeModalAndFocusMessage}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="empty-message-modal-title"
              className="bg-[#F5F1EA] p-12 max-w-[480px] w-full shadow-2xl"
            >
              <h3
                id="empty-message-modal-title"
                className="font-newsreader italic text-2xl text-[#0F0E0C] mb-4 leading-snug"
              >
                {form_t.empty_message_title}
              </h3>
              <p className="font-inter text-base text-[#5C5853] leading-relaxed mb-10">
                {form_t.empty_message_body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={closeModalAndFocusMessage}
                  className="flex-1 font-inter text-[11px] tracking-widest uppercase text-[#F5F1EA] bg-[#C8895A] hover:bg-[#B07849] px-6 py-3.5 transition-colors duration-300"
                >
                  {form_t.empty_message_add}
                </button>
                <button
                  type="button"
                  onClick={handleSendAnyway}
                  className="flex-1 font-inter text-[11px] tracking-widest uppercase text-[#0F0E0C] border border-[#0F0E0C]/25 hover:border-[#0F0E0C]/45 px-6 py-3.5 transition-colors duration-300"
                >
                  {form_t.empty_message_send}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
