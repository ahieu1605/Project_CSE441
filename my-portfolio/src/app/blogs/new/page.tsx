'use client'
import { useState } from 'react';

export default function NewBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        if (res.ok) setMsg('Tạo blog thành công!');
        else setMsg('Tạo blog thất bại!');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-2">
            <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea className="border p-2 w-full" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Tạo blog</button>
            <div>{msg}</div>
        </form>
    );
}