export const fetchData = async (
  endpoint: string,
  userId: string
): Promise<Response> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId })
  })
  const data = response
  return data
}
