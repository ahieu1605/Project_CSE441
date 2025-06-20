'use client'
import { useEffect, useState } from 'react';

export default function PortfolioDetail({ params }: { params: { id: string } }) {
    const [portfolio, setPortfolio] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/portfolio/${params.id}`)
            .then(res => res.json())
            .then(setPortfolio);
    }, [params.id]);

    if (!portfolio) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{portfolio.title}</h1>
            <p>{portfolio.description}</p>
            {portfolio.image && <img src={portfolio.image} alt={portfolio.title} className="mt-2 max-h-40" />}
            <div className="text-xs text-gray-500 mt-1">Created: {new Date(portfolio.createdAt).toLocaleString()}</div>
        </div>
    );
}