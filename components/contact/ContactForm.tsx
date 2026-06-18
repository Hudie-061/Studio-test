"use client";

import { useState } from "react";
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

const labelCls =
  "block font-inter text-[10px] tracking-widest uppercase text-[#5C5853] mb-2.5";
const inputCls =
  "w-full bg-transparent border-b border-[rgba(15,14,12,0.15)] py-3 font-inter text-sm text-[#0F0E0C] placeholder:text-[#A39E96] focus:outline-none focus:border-[#C8895A] transition-colors duration-300";

export default function ContactForm() {
  const { t } = useTranslation();
  const form_t = t.contact.form;

  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Form submission logic — DO NOT modify
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Studio inquiry:", form);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
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

          <MagneticButton>
            <button
              type="submit"
              data-cursor="cta"
              className="w-full font-inter text-[11px] tracking-widest uppercase text-[#F5F1EA] bg-[#C8895A] hover:bg-[#B07849] px-10 py-4 transition-colors duration-300"
            >
              {form_t.submit}
            </button>
          </MagneticButton>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
