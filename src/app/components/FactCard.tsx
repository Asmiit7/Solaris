"use client";

interface FactCardProps {
    label: string;
    value: string;
}

export default function FactCard({ label, value }: FactCardProps) {
    return (
        <div className="fact-card">
            <p className="fact-card-label">{label}</p>
            <p className="fact-card-value">{value}</p>
        </div>
    );
}
