"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";

export function CreateWebsiteClient() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("+91");
  const [webType, setWebType] = React.useState("Business Website");
  const [details, setDetails] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const valid = name.trim().length >= 2 && phone.replace(/[^\d]/g, "").length >= 10;
  
  // আপনার সেই Apps Script লিঙ্ক
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyxVC42ylfl6HPXsPuxNmx9WnLgn-EdMplbRmcxQe8SMoIvwYdzjqKBveVOujE6xcEG/exec';

  const handleApply = async () => {
    if (!valid) return;
    setLoading(true);

    const formData = {
      name: name.trim(),
      phone: phone,
      service: `Web Inquiry: ${webType}`,
      message: `Details: ${details}`
    };

    const waMessage = `New Website Inquiry (BongoBiz Tools)
Name: ${name.trim()}
Phone: ${phone}
Type: ${webType}
Details: ${details}`.trim();

    try {
      await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(formData) });
      window.open(`https://wa.me/917585999923?text=${encodeURIComponent(waMessage)}`, "_blank");
    } catch (error) {
      window.open(`https://wa.me/917585999923?text=${encodeURIComponent(waMessage)}`, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4 text-white">
          <Field label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম লিখুন" />
          </Field>
          <Field label="Phone number">
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91XXXXXXXXXX" />
          </Field>
          <Field label="What kind of website?">
            <Select value={webType} onChange={(e) => setWebType(e.target.value)}>
              <option>Business Website</option>
              <option>E-commerce (Online Shop)</option>
              <option>Portfolio / Personal</option>
              <option>Landing Page</option>
            </Select>
          </Field>
          <Field label="Short Details">
            <Input value={details} onChange={(e) => setDetails(e.target.value)} placeholder="ওয়েবসাইট সম্পর্কে কিছু লিখুন (অপশনাল)" />
          </Field>
          <button
            onClick={handleApply}
            disabled={!valid || loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-3 font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Send Inquiry on WhatsApp →"}
          </button>
        </div>
      </section>
      
      <section className="lg:col-span-3">
        <div className="bb-panel rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">কেন আমাদের দিয়ে ওয়েবসাইট বানাবেন?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>খুবই কম খরচে প্রফেশনাল ডিজাইন।</li>
            <li>মোবাইল এবং কম্পিউটার—উভয় ডিভাইসেই সুন্দর দেখাবে।</li>
            <li>ডোমেইন এবং হোস্টিং সাপোর্ট।</li>
            <li>২৪/৭ টেকনিক্যাল সাপোর্ট।</li>
          </ul>
        </div>
      </section>
    </div>
  );
}