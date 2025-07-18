"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({ post }) {
  const [name, setName] = useState(post?.name || "");
  const [desc, setDesc] = useState(post?.description || "");
  const [image, setImage] = useState(post?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(post?.image || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = previewUrl || '';

    try {
      if (imageFile) {
        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', 'product_image');

        const res = await fetch('https://api.cloudinary.com/v1_1/dyvkliqs4/image/upload', {
          method: 'POST',
          body: data,
        });

        const json = await res.json();
        if (!res.ok) {
          alert('Upload failed');
          setLoading(false);
          return;
        }
        imageUrl = json.secure_url;
      }

      const body = { name, description: desc, image: imageUrl };

      if (post) {
        await fetch(`/api/posts/${post._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      router.push("/");
    } catch (err) {
      alert('Có lỗi xảy ra khi upload hoặc lưu bài viết.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files[0];
          setImageFile(file);
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
          } else {
            setPreviewUrl(post?.image || "");
          }
        }}
        className="border rounded px-3 py-2 w-full"
      />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="max-h-40 object-contain" />
      )}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? (post ? "Đang cập nhật..." : "Đang tạo...") : (post ? "Update" : "Create")}
      </button>
    </form>
  )
}
