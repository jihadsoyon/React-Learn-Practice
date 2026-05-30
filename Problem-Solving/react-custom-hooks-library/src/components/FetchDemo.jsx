import useFetch from "../hooks/useFetch";

export default function FetchDemo() {
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>useFetch</h2>

      {data.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}