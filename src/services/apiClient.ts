// apiClient.ts
type ApiClient = {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, body: unknown) => Promise<T>;
  put: <T>(url: string, body: unknown) => Promise<T>;
  delete: (url: string) => Promise<void>;
};

const createApiClient = (baseUrl: string): ApiClient => ({
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${url}`);
    if (!response.ok)
      throw new Error(`GET request failed: ${response.statusText}`);
    return response.json();
  },
  post: async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok)
      throw new Error(`POST request failed: ${response.statusText}`);
    return response.json();
  },
  put: async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok)
      throw new Error(`PUT request failed: ${response.statusText}`);
    return response.json();
  },
  delete: async (url: string): Promise<void> => {
    const response = await fetch(`${baseUrl}${url}`, { method: "DELETE" });
    if (!response.ok)
      throw new Error(`DELETE request failed: ${response.statusText}`);
  },
});

export default createApiClient;
