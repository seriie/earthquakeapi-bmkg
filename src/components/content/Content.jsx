import { useEffect, useState } from "react";

export default function Content() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
    const shakeMap = `https://data.bmkg.go.id/DataMKG/TEWS/${data.Shakemap}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setData(data.Infogempa.gempa);
            } catch (err) {
                setError("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p className="text-xl font-semibold animate-pulse">Loading data...</p>
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <header className="bg-gray-700 p-6 text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 text-white">Gempa Terkini</h1>
                </header>

                {/* Content */}
                <div className="p-6">
                    <div className="relative rounded-lg overflow-hidden shadow-lg mb-6">
                        {data.Shakemap ? (
                            <img
                                src={shakeMap}
                                alt="Shakemap"
                                className="w-full h-60 object-cover"
                            />
                        ) : (
                            <div className="w-full h-60 bg-gray-700 flex items-center justify-center">
                                <p className="text-gray-400 italic">No Shakemap Available</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Detail label="Date" value={data.Tanggal} />
                        <Detail label="Time" value={data.Jam} />
                        <Detail label="Coordinates" value={`${data.Lintang}, ${data.Bujur}`} />
                        <Detail label="Magnitude" value={data.Magnitude} />
                        <Detail label="Depth" value={data.Kedalaman} />
                        <Detail label="Region" value={data.Wilayah} />
                        <Detail label="Intensity" value={data.Dirasakan} />
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-700 p-4 text-center">
                    <p className="text-sm text-gray-300">
                        Data Source:{" "}
                        <a
                            href="https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 underline hover:text-teal-300"
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
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-700 px-4 py-2 rounded-lg shadow">
            <span className="text-sm font-medium text-gray-300 sm:w-1/3">{label}</span>
            <span
                className={`sm:w-2/3 text-lg font-semibold ${
                    value ? "whitespace-pre-line" : "text-gray-400 italic"
                }`}
            >
                {value || "Unavailable"}
            </span>
        </div>
    );
}