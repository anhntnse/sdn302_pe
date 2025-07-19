'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ContactForm from '@/components/ContactForm';

export default function EditContactPage() {
  const router = useRouter();
  const params = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`/api/contacts/${params.id}`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        setContact(data);
      } catch {
        alert('Contact not found.');
        router.push('/');
      } finally {
        setFetching(false);
      }
    };

    fetchContact();
  }, [params.id, router]);

  const handleUpdate = async (updatedData) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/contacts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Update failed');
      router.push('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Contact</h1>

      {fetching ? (
        <div className="text-gray-500 animate-pulse">Loading contact details...</div>
      ) : contact ? (
        <ContactForm
          onSubmit={handleUpdate}
          loading={loading}
          initialData={contact}
        />
      ) : (
        <div className="text-red-500">Unable to load contact.</div>
      )}
    </div>
  );
}
