"use client";

import Link from "next/link";

export default function ContactCard({ contact, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-2 hover:shadow-md transition">
      <div className="text-lg font-medium text-gray-800">{contact.name}</div>
      <div className="text-sm text-gray-600">{contact.email}</div>
      {contact.phone && (
        <div className="text-sm text-gray-500">Phone: {contact.phone}</div>
      )}
      <div className="text-xs inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded w-fit">
        {contact.group || "Other"}
      </div>

      <div className="flex gap-3 mt-3">
        <Link
          href={`/contacts/${contact._id}/edit`}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(contact)}
          className="text-sm text-red-600 font-medium hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
