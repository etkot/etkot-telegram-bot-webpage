export const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'

export const client: <T = any>(query: string, options?: Partial<RequestInit>) => Promise<T> = async (
  query: string,
  options = {}
) => {
  const res = await fetch(`${backendUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      query,
    }),
    ...options,
  })

  return (await res.json())?.data || {}
}
