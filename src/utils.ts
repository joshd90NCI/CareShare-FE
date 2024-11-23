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
