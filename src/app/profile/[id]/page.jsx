import { notFound } from "next/navigation";

export default async function SingleProfile({ params }) {
  const username = params.id;
  const response = await fetch(`${process.env.DOMAIN}/api/users/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const userData = await response.json();
  return (
    <>
      {!userData.error ? (
        <p>
          User: {userData.data.firstName} ({username})
        </p>
      ) : (
        <>{notFound()}</>
      )}
    </>
  );
}
