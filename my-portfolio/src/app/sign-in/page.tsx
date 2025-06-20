'use client'
import { useState } from 'react';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) setMsg('Đăng nhập thành công!');
        else setMsg('Sai email hoặc mật khẩu!');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-2">
            <input className="border p-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Sign In</button>
            <div>{msg}</div>
        </form>
    );
}