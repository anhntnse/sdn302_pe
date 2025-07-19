"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm from "../../../components/PostForm";
import Loading from "../../../components/Loading";

export default function EditPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('API response:', data);
          setPost(data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {loading ? <Loading /> : post && <PostForm post={post} />}
    </div>
  );
}
