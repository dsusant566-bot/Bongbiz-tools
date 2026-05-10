"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatMoney, formatNumber } from "../_lib/format";

type LineItem = {
  id: string;
  description: string;
  qty: string;
  rate: string;
  discount: string;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

function parseNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// প্রিন্ট মোডের জন্য বিশেষ CSS
const printStyles = `
  @media print {
    @page {
      margin: 0.5cm !important;
    }

    body {
      background: white !important;
      color: black !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* মেনু আইকন, হোয়াটসঅ্যাপ বাটন এবং অন্যান্য বাড়তি অংশ পুরোপুরি লুকানো */
    nav, aside, footer, header, 
    button, 
    .print\\:hidden, 
    [class*="ToolShell"], 
    [class*="WhatsApp"], 
    [class*="Floating"], 
    [id*="whatsapp"],
    [class*="whatsapp"],
    .bb-panel-header,
    h1, p.text-zinc-400,
    section:first-of-type {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }

    /* ইনভয়েস কার্ডটাকে একদম ওপরে সেট করা */
    .bb-panel.mt-6 {
      margin: 0 !important;
      padding: 10px !important;
      border: none !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      box-shadow: none !important;
      page-break-inside: avoid !important;
    }

    /* ইনপুট ফিল্ডের বর্ডার ও অপ্রয়োজনীয় অংশ সরানো */
    input {
      border: none !important;
      background: transparent !important;
      color: black !important;
      -webkit-appearance: none;
    }
  }
`;

export function InvoiceClient() {
  // প্রিন্ট স্টাইল ইনজেক্ট করার জন্য useEffect
  React.useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = printStyles;
    document.head.appendChild(styleTag);
    return () => {
      if (document.head.contains(styleTag)) {
        document.head.removeChild(styleTag);
      }
    };
  }, []);

  const [currency, setCurrency] = React.useState("INR");
  const [invoiceNo, setInvoiceNo] = React.useState("SE-001");
  const [invoiceDate, setInvoiceDate] = React.useState(todayISO());
  const [dueDate, setDueDate] = React.useState(todayISO());

  const [businessName, setBusinessName] = React.useState("Suronno Enterprises");
  const [businessPhone, setBusinessPhone] = React.useState("");
  const [businessAddress, setBusinessAddress] = React.useState(
    "Address line 1, City, State, PIN"
  );

  const [billToName, setBillToName] = React.useState("Customer Name");
  const [billToAddress, setBillToAddress] = React.useState("Address line 1, City, State, PIN");
  const [billToPhone, setBillToPhone] = React.useState("");

  const [notes, setNotes] = React.useState("Thank you for your business.");
  const [terms, setTerms] = React.useState("Payment due on receipt.");

  const [gstPercent, setGstPercent] = React.useState("0");

  const [items, setItems] = React.useState<LineItem[]>([
    { id: uid(), description: "Service / Product", qty: "1", rate: "1000", discount: "0" },
    { id: uid(), description: "Additional item", qty: "1", rate: "500", discount: "0" },
  ]);

  // ক্যালকুলেশন লজিক: ডিসকাউন্ট পার্সেন্টেজ (%) হিসেবে কাজ করবে
  const subtotal = items.reduce((sum, it) => {
    const q = parseNum(it.qty) || 0;
    const r = parseNum(it.rate) || 0;
    const dPercent = parseNum(it.discount) || 0; 
    
    const itemBaseTotal = q * r;
    const discountAmt = (itemBaseTotal * dPercent) / 100;
    
    return sum + (itemBaseTotal - discountAmt);
  }, 0);

  const gst = (() => {
    const g = parseNum(gstPercent);
    if (!Number.isFinite(g) || g <= 0) return 0;
    return (subtotal * g) / 100;
  })();

  const total = subtotal + gst;

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: uid(), description: "New item", qty: "1", rate: "0", discount: "0" },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function printInvoice() {
    window.print();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2 print:hidden">
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Business details
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <Field label="Business name">
                <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </Field>
              <Field label="Phone number">
                <Input
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="e.g. +91XXXXXXXXXX"
                />
              </Field>
              <Field label="Address">
                <Input
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Invoice No.">
              <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            </Field>
            <Field label="Currency">
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="INR">INR (₹)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Invoice date">
              <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </Field>
            <Field label="Due date">
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Field>
          </div>

          <Field label="Bill to (name)">
            <Input value={billToName} onChange={(e) => setBillToName(e.target.value)} />
          </Field>
          <Field label="Bill to (address)">
            <Input value={billToAddress} onChange={(e) => setBillToAddress(e.target.value)} />
          </Field>
          <Field label="Bill to (phone)">
            <Input value={billToPhone} onChange={(e) => setBillToPhone(e.target.value)} />
          </Field>

          <Field label="GST %" hint="Set 0 if not applicable">
            <Input inputMode="decimal" value={gstPercent} onChange={(e) => setGstPercent(e.target.value)} />
          </Field>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={addItem}>
              + Add item
            </Button>
            <Button type="button" onClick={printInvoice}>
              Print / Save PDF
            </Button>
          </div>

          <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
            Tip: Use your browser’s print dialog → “Save as PDF” for a PDF invoice.
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 print:hidden">
          <Stat label="Subtotal" value={formatMoney(subtotal, currency)} subvalue="Before GST" />
          <Stat label="GST" value={formatMoney(gst, currency)} subvalue={`${formatNumber(parseNum(gstPercent) || 0)}%`} />
          <Stat label="Total" value={formatMoney(total, currency)} subvalue="Amount payable" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6 print:mt-0 print:bg-white print:text-black print:shadow-none print:ring-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="text-xs font-medium text-zinc-400 print:text-zinc-700">
                  {businessName || "Business name"}
                </div>
                <div className="mt-1 text-xl font-semibold tracking-tight text-white print:text-black">
                  INVOICE
                </div>
                <div className="mt-2 text-sm text-zinc-300 print:block print:mt-10 print:text-black print:text-center">
  Professional bill maker • tools.bongobiz.com
</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 print:bg-white print:ring-1 print:ring-zinc-200">
                <div className="text-xs text-zinc-400 print:text-zinc-700">Invoice</div>
                <div className="mt-1 text-sm font-semibold text-white print:text-black">
                  #{invoiceNo}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-400 print:text-zinc-700">
                  <span>Date</span>
                  <span className="text-zinc-200 print:text-black">{invoiceDate}</span>
                  <span>Due</span>
                  <span className="text-zinc-200 print:text-black">{dueDate}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 print:bg-white print:ring-zinc-200">
                <div className="text-xs font-medium text-zinc-400 print:text-zinc-700">
                  Bill To
                </div>
                <div className="mt-2 text-sm font-semibold text-white print:text-black">
                  {billToName}
                </div>
                <div className="mt-1 text-sm text-zinc-300 print:text-zinc-700">
                  {billToAddress}
                </div>
                {billToPhone ? (
                  <div className="mt-1 text-sm text-zinc-300 print:text-zinc-700">
                    Phone: {billToPhone}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 print:bg-white print:ring-zinc-200">
                <div className="text-xs font-medium text-zinc-400 print:text-zinc-700">
                  From
                </div>
                <div className="mt-2 text-sm font-semibold text-white print:text-black">
                  {businessName || "Business name"}
                </div>
                <div className="mt-1 text-sm text-zinc-300 print:text-zinc-700">
                  {businessAddress || "Business address"}
                  {businessPhone ? ` • Phone: ${businessPhone}` : ""}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 print:ring-zinc-200">
              <div className="grid grid-cols-12 bg-white/5 px-4 py-3 text-xs font-semibold text-zinc-300 print:bg-zinc-100 print:text-zinc-700">
                <div className="col-span-3 sm:col-span-4">Description</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-2 text-right">Disc%</div> 
                <div className="col-span-3 sm:col-span-2 text-right">Amount</div>
              </div>

              <div className="divide-y divide-white/10 print:divide-zinc-200">
                {items.map((it) => {
                  const q = parseNum(it.qty) || 0;
                  const r = parseNum(it.rate) || 0;
                  const dPercent = parseNum(it.discount) || 0;
                  const itemTotal = (q * r) * (1 - dPercent / 100);

                  return (
                    <div
                      key={it.id}
                      className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm text-zinc-200 print:text-black"
                    >
                      <div className="col-span-3 sm:col-span-4">
                        <input
                          value={it.description}
                          onChange={(e) => updateItem(it.id, { description: e.target.value })}
                          className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 print:bg-white print:text-black print:ring-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          value={it.qty}
                          onChange={(e) => updateItem(it.id, { qty: e.target.value })}
                          className="w-full rounded-xl bg-white/5 px-3 py-2 text-right text-sm text-zinc-100 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 print:bg-white print:text-black print:ring-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          value={it.rate}
                          onChange={(e) => updateItem(it.id, { rate: e.target.value })}
                          className="w-full rounded-xl bg-white/5 px-3 py-2 text-right text-sm text-zinc-100 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 print:bg-white print:text-black print:ring-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          value={it.discount}
                          placeholder="%"
                          onChange={(e) => updateItem(it.id, { discount: e.target.value })}
                          className="w-full rounded-xl bg-white/5 px-3 py-2 text-right text-sm text-zinc-100 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 print:bg-white print:text-black print:ring-none"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right font-semibold">
                        {formatMoney(itemTotal, currency)}
                      </div>
                      <div className="col-span-12 flex justify-end gap-2 print:hidden">
                        <button
                          type="button"
                          className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 ring-1 ring-white/10 hover:bg-white/10"
                          onClick={() => removeItem(it.id)}
                          disabled={items.length <= 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="grid w-full gap-3 sm:max-w-lg">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 print:bg-white print:ring-zinc-200">
                  <div className="text-xs font-medium text-zinc-400 print:text-zinc-700">
                    Notes
                  </div>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 print:bg-white print:text-black print:ring-none"
                  />
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 print:bg-white print:ring-zinc-200">
                  <div className="text-xs font-medium text-zinc-400 print:text-zinc-700">
                    Terms
                  </div>
                  <input
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 print:bg-white print:text-black print:ring-none"
                  />
                </div>
              </div>

              <div className="w-full sm:max-w-sm">
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 print:bg-white print:ring-zinc-200">
                  <div className="flex items-center justify-between text-sm text-zinc-300 print:text-zinc-700">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white print:text-black">
                      {formatMoney(subtotal, currency)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-zinc-300 print:text-zinc-700">
                    <span>GST ({formatNumber(parseNum(gstPercent) || 0)}%)</span>
                    <span className="font-semibold text-white print:text-black">
                      {formatMoney(gst, currency)}
                    </span>
                  </div>
                  <div className="mt-3 h-px bg-white/10 print:bg-zinc-200" />
                  <div className="mt-3 flex items-center justify-between text-base">
                    <span className="font-semibold text-white print:text-black">Total</span>
                    <span className="font-semibold text-white print:text-black">
                      {formatMoney(total, currency)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10 print:hidden">
                  Print tip: Set margins to “Default” and enable “Background graphics” for best styling.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}