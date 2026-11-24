async function apiRequest(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`/api${endpoint}`, {
      ...options,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });
  } catch {
    throw new Error(
      "Unable to connect to BookShelf. Please try again later."
    );
  }

  if ([502, 503, 504].includes(response.status)) {
    throw new Error(
      "BookShelf is temporarily unavailable. Please try again later."
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an unexpected response. Please try again later."
    );
  }

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
