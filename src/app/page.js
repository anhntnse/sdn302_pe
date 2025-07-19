"use client";

import { useEffect, useState } from "react";
import ContactCard from "@/components/ContactCard";
import Link from "next/link";

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [sort, setSort] = useState("asc");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setFiltered(data);
      });
  }, []);

  const confirmDelete = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedContact) return;

    try {
      const res = await fetch(`/api/contacts/${selectedContact._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      const newList = contacts.filter((c) => c._id !== selectedContact._id);
      setContacts(newList);
      setShowModal(false);
      setSelectedContact(null);
    } catch (err) {
      alert("Failed to delete contact.");
    }
  };

  // Filter + sort
  useEffect(() => {
    let temp = [...contacts];

    if (search) {
      temp = temp.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (group) {
      temp = temp.filter((c) => c.group === group);
    }

    temp.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFiltered(temp);
  }, [search, group, sort, contacts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Contact Directory
        </h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm text-gray-700 mb-1">
            Search by Name
          </label>
          <input
            id="search"
            type="text"
            placeholder="Enter name..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Group Filter */}
        <div className="w-full md:w-1/3">
          <label htmlFor="group" className="block text-sm text-gray-700 mb-1">
            Filter by Group
          </label>
          <select
            id="group"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="">All Groups</option>
            <option value="Friends">Friends</option>
            <option value="Work">Work</option>
            <option value="Family">Family</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="w-full md:w-1/3">
          <label htmlFor="sort" className="block text-sm text-gray-700 mb-1">
            Sort by Name
          </label>
          <select
            id="sort"
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onDelete={() => confirmDelete(contact)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No contacts found.
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedContact.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedContact(null);
                }}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
