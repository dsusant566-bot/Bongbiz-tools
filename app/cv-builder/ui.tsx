"use client";

import * as React from "react";
import { Field, Input, Button } from "../_components/ui";
import { useReactToPrint } from "react-to-print";

export function CvBuilderClient() {
  const [data, setData] = React.useState({
    name: "Your Name",
    title: "Job Title",
    email: "email@example.com",
    phone: "123-456-7890",
    address: "123 Street, City",
    summary: "Professional summary goes here...",
    photo: "",
    experience: [{ company: "", city: "", duration: "", desc: "" }],
    education: [{ school: "", city: "", duration: "" }],
    skills: [] as string[]
  });

  const previewRef = React.useRef(null);
  const handlePrint = useReactToPrint({ contentRef: previewRef });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setData({...data, photo: e.target?.result as string});
      reader.readAsDataURL(file);
    }
  };

  const updateExp = (i: number, key: string, val: string) => {
    const exp = [...data.experience];
    (exp[i] as any)[key] = val;
    setData({...data, experience: exp});
  };

  const updateEdu = (i: number, key: string, val: string) => {
    const edu = [...data.education];
    (edu[i] as any)[key] = val;
    setData({...data, education: edu});
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="bb-panel rounded-3xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Personal Information</h2>
        <div className="space-y-4">
          <Field label="Photo"><Input type="file" accept="image/*" onChange={handlePhotoUpload} /></Field>
          <Field label="Name"><Input value={data.name} onChange={(e) => setData({...data, name: e.target.value})} /></Field>
          <Field label="Job Title"><Input value={data.title} onChange={(e) => setData({...data, title: e.target.value})} /></Field>
          <Field label="Email"><Input value={data.email} onChange={(e) => setData({...data, email: e.target.value})} /></Field>
          <Field label="Phone"><Input value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})} /></Field>
          <Field label="Address"><Input value={data.address} onChange={(e) => setData({...data, address: e.target.value})} /></Field>
          <Field label="Summary"><textarea className="w-full rounded-2xl bg-white/5 p-3 text-white" value={data.summary} onChange={(e) => setData({...data, summary: e.target.value})} /></Field>
          
          <h2 className="text-lg font-bold text-white mt-6">Experience</h2>
          {data.experience.map((exp, i) => (
             <div key={i} className="bg-white/5 p-3 rounded-xl space-y-2 mb-2">
               <Input placeholder="Company" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} />
               <Input placeholder="City" value={exp.city} onChange={(e) => updateExp(i, "city", e.target.value)} />
               <Input placeholder="Duration" value={exp.duration} onChange={(e) => updateExp(i, "duration", e.target.value)} />
               <textarea placeholder="Description" className="w-full rounded-xl bg-white/5 p-2 text-sm text-white" value={exp.desc} onChange={(e) => updateExp(i, "desc", e.target.value)} />
             </div>
          ))}
          <Button onClick={() => setData({...data, experience: [...data.experience, { company: "", city: "", duration: "", desc: "" }]})}>+ Add Experience</Button>

          <h2 className="text-lg font-bold text-white mt-6">Education</h2>
          {data.education.map((edu, i) => (
             <div key={i} className="bg-white/5 p-3 rounded-xl space-y-2 mb-2">
               <Input placeholder="School/College" value={edu.school} onChange={(e) => updateEdu(i, "school", e.target.value)} />
               <Input placeholder="City" value={edu.city} onChange={(e) => updateEdu(i, "city", e.target.value)} />
               <Input placeholder="Duration" value={edu.duration} onChange={(e) => updateEdu(i, "duration", e.target.value)} />
             </div>
          ))}
          <Button onClick={() => setData({...data, education: [...data.education, { school: "", city: "", duration: "" }]})}>+ Add Education</Button>

          <h2 className="text-lg font-bold text-white mt-6">Skills</h2>
          <Input placeholder="Add skill and press enter" onKeyDown={(e) => {
            if (e.key === "Enter") { setData({...data, skills: [...data.skills, e.currentTarget.value]}); e.currentTarget.value = ""; }
          }} />
          <Button onClick={handlePrint}>Download PDF</Button>
        </div>
      </section>

      <section className="sticky top-20 h-fit">
        <div ref={previewRef} className="mx-auto w-[210mm] min-h-[297mm] bg-white shadow-2xl p-10 text-black">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <p className="text-xl text-zinc-600">{data.title}</p>
            </div>
            {data.photo && <img src={data.photo} className="w-24 h-24 rounded-full object-cover" />}
          </div>
          <div className="my-4 text-sm text-zinc-500">{data.email} | {data.phone} | {data.address}</div>
          <h2 className="text-lg font-semibold mt-6 border-b border-zinc-300">Summary</h2>
          <p className="mt-2 text-sm text-zinc-700">{data.summary}</p>
          <h2 className="text-lg font-semibold mt-6 border-b border-zinc-300">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mt-4 text-sm">
              <div className="flex justify-between font-bold">
                <p>{exp.company} | {exp.city}</p>
                <p>{exp.duration}</p>
              </div>
              <p className="text-zinc-700 mt-1">{exp.desc}</p>
            </div>
          ))}
          <h2 className="text-lg font-semibold mt-6 border-b border-zinc-300">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mt-4 text-sm">
              <div className="flex justify-between font-bold">
                <p>{edu.school} | {edu.city}</p>
                <p>{edu.duration}</p>
              </div>
            </div>
          ))}
          <h2 className="text-lg font-semibold mt-6 border-b border-zinc-300">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-zinc-200 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
