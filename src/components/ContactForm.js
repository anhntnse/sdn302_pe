"use client";

import { useState } from "react";

const groups = ["Friends", "Work", "Family", "Other"];

export default function ContactForm({ onSubmit, loading, initialData = {} }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    group: initialData.group || "Other",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("group: ", form.group);
    if (!form.name || !form.email) {
      setError("Please enter a valid name and email.");
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Name *"
        value={form.name}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={form.email}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
      />

      <select
        name="group"
        value={form.group}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
      >
        <option value="">-- Group --</option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>



      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading
          ? initialData._id
            ? "Updating..."
            : "Creating..."
          : initialData._id
          ? "Update Contact"
          : "Create Contact"}
      </button>
    </form>
  );
}
