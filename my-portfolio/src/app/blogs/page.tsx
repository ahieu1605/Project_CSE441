'use client'
import { useEffect, useState } from 'react';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(setBlogs);
    }, []);
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <div className="space-y-4">
                {blogs.map((b: any) => (
                    <div key={b.id} className="border p-4 rounded">
                        <h2 className="font-semibold">{b.title}</h2>
                        <p>{b.content}</p>
                        <div className="text-xs text-gray-500">By {b.user?.name} - {new Date(b.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}