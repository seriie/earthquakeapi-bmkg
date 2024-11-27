import { useEffect, useState } from "react";

export default function Content() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();
                setData(result.Infogempa.gempa);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p className="text-xl font-semibold">Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500">
                        Info Gempa Terbaru
                    </h1>
                    <div className="mt-6 space-y-4">
                        <Detail label="Tanggal" value={data.Tanggal} />
                        <Detail label="Jam" value={data.Jam} />
                        <Detail label="Koordinat" value={`${data.Lintang}, ${data.Bujur}`} />
                        <Detail label="Magnitudo" value={data.Magnitude} />
                        <Detail label="Kedalaman" value={data.Kedalaman} />
                        <Detail label="Wilayah" value={data.Wilayah} />
                        <Detail label="Dirasakan" value={data.Dirasakan} />
                    </div>
                </div>
                <footer className="bg-gray-700 p-4 text-center">
                    <p className="text-sm text-gray-300">
                        Data diambil dari{" "}
                        <a
                            href="https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300"
                        >
                            BMKG
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="font-medium text-gray-400">{label}</span>
            <span className="text-lg font-semibold">{value || "Data tidak tersedia"}</span>
        </div>
    );
}