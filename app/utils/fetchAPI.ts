const API_BASE_URL = 'https://api.example.com';

function getTokenFromCookies() {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = getTokenFromCookies();
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function get(endpoint: string) {
    return fetchAPI(endpoint);
}

export async function post(endpoint: string, data: any) {
    return fetchAPI(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export async function patch(endpoint: string, data: any) {
    return fetchAPI(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}