
export default async function getAllUsers() {
  // https://jsonplaceholder.typicode.com
  const res = await fetch('https://jsonplaceholder.typicode.com/users')

  if(!res.ok) throw new Error('failed to fetch data')
  return res.json()
}
 