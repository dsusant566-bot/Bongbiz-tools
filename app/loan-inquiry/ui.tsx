"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

type LoanType =
  | "Personal Loan"
  | "Business Loan"
  | "Home Loan"
  | "Vehicle Loan"
  | "Education Loan"
  | "Gold Loan"
  | "Other";

function sanitizePhone(v: string) {
  return v.replace(/[^\d+]/g, "");
}

function waLink(phoneE164: string, message: string) {
  const digits = phoneE164.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function LoanInquiryClient() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("+91");
  const [loanType, setLoanType] = React.useState<LoanType>("Personal Loan");
  const [amount, setAmount] = React.useState("500000");

  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // লোডিং স্টেট যোগ করা হলো

  const amt = Number(amount);
  const phoneClean = sanitizePhone(phone);

  const valid =
    name.trim().length >= 2 &&
    phoneClean.replace(/[^\d]/g, "").length >= 10 &&
    Number.isFinite(amt) &&
    amt > 0;

  const message = `Loan Inquiry (tools.bongobiz.com)
Name: ${name.trim()}
Phone: ${phoneClean}
Loan Type: ${loanType}
Amount: ${Number.isFinite(amt) ? formatNumber(amt, 0) : amount}`.trim();

  // আপনার গুগল স্ক্রিপ্ট ইউআরএল
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyxVC42ylfl6HPXsPuxNmx9WnLgn-EdMplbRmcxQe8SMoIvwYdzjqKBveVOujE6xcEG/exec';

  const handleApply = async () => {
    if (!valid) return;
    
    setLoading(true);
    
    const formData = {
      name: name.trim(),
      phone: phoneClean,
      service: `Loan: ${loanType}`,
      message: `Requested Amount: ₹${Number.isFinite(amt) ? formatNumber(amt, 0) : amount}`
    };

    try {
      // গুগল শিটে ডেটা পাঠানো
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      // ডেটা সেভ হওয়ার পর হোয়াটসঅ্যাপে নিয়ে যাবে
      window.open(waLink("917585999923", message), "_blank");
    } catch (error) {
      console.error("Error submitting to sheet:", error);
      // এরর আসলেও হোয়াটসঅ্যাপে পাঠিয়ে দেওয়া হবে যাতে লিড মিস না হয়
      window.open(waLink("917585999923", message), "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Full name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Full Name"
            />
          </Field>

          <Field label="Phone number" hint="WhatsApp preferred">
            <Input value={phone} onChange={(e) => setPhone(sanitizePhone(e.target.value))} placeholder="+91XXXXXXXXXX" />
          </Field>

          <Field label="Loan type">
            <Select value={loanType} onChange={(e) => setLoanType(e.target.value as LoanType)}>
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Vehicle Loan</option>
              <option>Education Loan</option>
              <option>Gold Loan</option>
              <option>Other</option>
            </Select>
          </Field>

          <Field label="Loan amount" hint="Enter amount in INR">
            <Input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500000" />
          </Field>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setName("");
                setPhone("+91");
                setLoanType("Personal Loan");
                setAmount("500000");
                setSubmitted(false);
              }}
            >
              Reset
            </Button>
            
            <button
              type="button"
              disabled={!valid || loading}
              onClick={handleApply}
              className={[
                "bb-ring inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                valid && !loading
                  ? "bg-gradient-to-b from-emerald-300/90 to-emerald-400/70 text-black ring-1 ring-emerald-300/30 hover:from-emerald-200/90 hover:to-emerald-300/80"
                  : "bg-white/5 text-zinc-400 ring-1 ring-white/10 pointer-events-none opacity-50",
              ].join(" ")}
            >
              {loading ? "Processing..." : "Apply on WhatsApp"}
              <span aria-hidden>→</span>
            </button>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-400 ring-1 ring-emerald-500/20">
              Data saved to Sheet & Telegram notified! Opening WhatsApp...
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
              This form will save your info and open WhatsApp.
            </div>
          )}
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Status" value={valid ? "Ready" : "Incomplete"} subvalue="Form validation" />
          <Stat label="Loan type" value={loanType} subvalue="Selected" />
          <Stat label="Amount" value={Number.isFinite(amt) ? `₹${formatNumber(amt, 0)}` : "—"} subvalue="Requested" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">What happens next</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Your details are instantly saved in our system.</li>
            <li>We confirm details on WhatsApp/phone.</li>
            <li>We share eligibility and required documents.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}