async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "An unexpected error occurred."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export function register(email, password) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export function login(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export function getCurrentUser() {
  return apiRequest("/auth/me");
}

export function logout() {
  return apiRequest("/auth/logout", {
    method: "POST"
  });
}
