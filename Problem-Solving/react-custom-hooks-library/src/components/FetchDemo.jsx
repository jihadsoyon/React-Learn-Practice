import useFetch from "../hooks/useFetch";

export default function FetchDemo() {
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div className="card">
      <h2>useFetch</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((user) => (
          <p
            key={user.id}
            className="result"
          >
            {user.name}
          </p>
        ))
      )}
    </div>
  );
}