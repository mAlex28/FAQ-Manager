export async function getAllUsers() {
  const response = await fetch("/")
  return await response.json()
}
