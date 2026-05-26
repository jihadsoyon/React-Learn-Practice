import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); // ✅ loading state

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true); // ✅ start loading

                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users`
                );
                const data = await res.json();

                // ✅ frontend filtering (IMPORTANT)
                const filtered = data.filter((user) =>
                    user.name
                        .toLowerCase()
                        .startsWith(debouncedQuery.toLowerCase())
                );

                setResults(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // ✅ stop loading
            }
        };

        fetchData();
    }, [debouncedQuery]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Debounced Search</h1>

            <input
                type="text"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* ✅ Loading */}
            {loading && <p>Loading...</p>}

            {/* ✅ Empty state */}
            {!loading && results.length === 0 && debouncedQuery && (
                <p>No results found</p>
            )}

            {/* ✅ Results */}
            <ul>
                {results.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}