import config from './config.ts';
import { AlertProps } from '@mui/material';

// Map our customised error messages to the status codes to give users more meaningful experience
export const getErrorMessageFromStatus = (status: number): string => {
  switch (status) {
    case 400:
      return 'Bad Request: The server could not understand your request.';
    case 401:
      return 'Unauthorized: You must log in to access this resource.';
    case 403:
      return 'Forbidden: You do not have permission to access this resource.';
    case 404:
      return 'Not Found: The requested resource could not be found.';
    case 500:
      return 'Internal Server Error: Something went wrong on the server.';
    case 502:
      return 'Bad Gateway: The server received an invalid response from the upstream server.';
    case 503:
      return 'Service Unavailable: The server is currently unavailable.';
    case 504:
      return 'Gateway Timeout: The server did not receive a timely response.';
    default:
      return `Unexpected Error: An unknown error occurred (status code: ${status}).`;
  }
};

// This is the generic function for doing fetch and managing error messages
export const genericFetch = async (
  url: string,
  options: RequestInit,
  showAlert: (msg: string, sev?: AlertProps['severity']) => void,
  successMessage?: string
) => {
  // combine passed url with our api base
  const urlToUse = `${config.apiEndpoint}${url}`;
  try {
    // Default to include credentials to include cookies etc. and have JSON headers
    const response = await fetch(urlToUse, {
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      ...options,
    });
    // Handle http errors
    if (!response.ok) {
      showAlert(getErrorMessageFromStatus(response.status));
      return;
    }
    // Handle no content
    if (response.status === 204) {
      if (successMessage) showAlert(successMessage, 'success');
      return true;
    }
    // We can be more confident of our response type to convert it throgh
    const result = await response.json();
    if (successMessage) {
      showAlert(successMessage, 'success');
    }
    return result ?? true;
  } catch (err) {
    showAlert('There was an unexpected error: ' + (err as Error).message);
  }
};
