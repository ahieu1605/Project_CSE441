'use client'
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [portfolios, setPortfolios] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/portfolio').then(res => res.json()).then(setPortfolios);
        fetch('/api/blogs').then(res => res.json()).then(setBlogs);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <h2 className="text-xl font-semibold mt-4">Portfolios</h2>
            <ul>
                {portfolios.map((p: any) => (
                    <li key={p.id} className="border p-2 my-2 flex justify-between">
                        <span>{p.title}</span>
                        {/* Thêm nút sửa/xóa nếu muốn */}
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4">Blogs</h2>
            <ul>
                {blogs.map((b: any) => (
                    <li key={b.id} className="border p-2 my-2 flex justify-between">
                        <span>{b.title}</span>
                        {/* Thêm nút sửa/xóa nếu muốn */}
                    </li>
                ))}
            </ul>
        </div>
    );
}