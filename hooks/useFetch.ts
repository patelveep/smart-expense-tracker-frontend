import { useState, useCallback } from 'react';
// Generic response type
interface FetchDataResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (
        url: string,
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
        body?: Record<string, unknown> | null,
        headers?: Record<string, string>
    ) => Promise<void>;
}
const GET_ACCESS_TOKEN_ENDPOINT = 'https://api.example.com/refresh-token';
const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'refreshToken';
// Custom Hook with token refresh functionality
const useFetch = <T>(
): FetchDataResponse<T> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    // Function to refresh the access token using the provided refresh token
    const refreshAccessToken = async (refreshToken: string | null): Promise<string> => {
        try {
            const response = await fetch(GET_ACCESS_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            const data = await response.json();
            return data.accessToken; // Assuming the response contains the new access token
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(`Error refreshing access token: ${err.message}`);
            }
            throw new Error('Unknown error occurred while refreshing token');
        }
    };
    // Function to make the API request
    const fetchData = useCallback(
        async (
            url: string,
            method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
            body: Record<string, unknown> | null = null,
            headers: Record<string, string> = {},
            shouldAutoRefreshToken: boolean = false, // flag to enable or disable auto-refresh
        ) => {
            setLoading(true);
            setError(null);
            let retryCount = 0; // To avoid infinite retry loop
            const maxRetries = 1; // Limit retries to once
            const makeRequest = async (headers: Record<string, string>) => {
                try {
                    const options: RequestInit = {
                        method,
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers,
                        },
                        body: body ? JSON.stringify(body) : null,
                    };
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        // Handle specific status code for expired access token (401 Unauthorized)
                        if (response.status === 401 && shouldAutoRefreshToken) {
                            // Handle token expiration and refresh
                            if (retryCount < maxRetries) {
                                retryCount += 1;
                                // Refresh the access token
                                const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
                                const newToken = await refreshAccessToken(refreshToken);
                                const updatedHeaders = {
                                    ...headers,
                                    Authorization: `Bearer ${newToken}`, // Add the new token
                                };
                                // Retry the original API call with the new token
                                return makeRequest(updatedHeaders);
                            } else {
                                throw new Error('Max retry attempts reached');
                            }
                        }
                        // If status is not 401 or refresh fails, throw the error
                        const errorDetails = await response.json();
                        throw new Error(errorDetails.message || response.statusText);
                    }
                    // Parse the response data
                    const result: T = await response.json();
                    setData(result);
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            };
            // Initial call with headers including current access token
            const headersWithAuth = {
                ...headers,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)}`, // Get the current token from storage or context
            };
            await makeRequest(headersWithAuth);
        },
        []
    );
    return { fetchData, loading, data, error };
};
export default useFetch;