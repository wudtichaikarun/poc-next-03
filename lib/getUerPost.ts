export default async function getUserPosts(userId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    // fetch check the data after 60 seconds
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return undefined;

  return res.json();
}
