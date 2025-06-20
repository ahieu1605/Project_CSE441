'use client'
import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');

    const handleUpload = async (e: any) => {
        e.preventDefault();
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = (reader.result as string).split(',')[1];
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, filename: file.name }),
            });
            const data = await res.json();
            setUrl(data.url);
        };
        reader.readAsDataURL(file);
    };

    return (
        <form onSubmit={handleUpload} className="max-w-md mx-auto p-4 space-y-2">
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Upload</button>
            {url && <img src={url} alt="uploaded" className="mt-2 max-h-40" />}
        </form>
    );
}