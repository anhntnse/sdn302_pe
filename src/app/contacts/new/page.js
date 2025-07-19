"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function NewContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      // Clean data: remove optional empty fields
      const cleanedData = {
        name: data.name,
        email: data.email,
      };

      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Tạo liên hệ thất bại");

      router.push("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add new contact</h1>
      <ContactForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
