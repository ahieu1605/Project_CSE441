'use client'
import { useEffect, useState } from 'react';

export default function Profile() {
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetch('/api/profile')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setBio(data.bio || '');
                    setAvatar(data.avatar || '');
                }
            });
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bio, avatar }),
        });
        if (res.ok) setMsg('Cập nhật thành công!');
        else setMsg('Cập nhật thất bại!');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-2">
            <textarea className="border p-2 w-full" placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
            <input className="border p-2 w-full" placeholder="Avatar URL" value={avatar} onChange={e => setAvatar(e.target.value)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Cập nhật</button>
            <div>{msg}</div>
            {avatar && <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full mt-2" />}
        </form>
    );
}