// const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT ?? 'http://care-share-backend:8080/api';
const EXPIRY_TIME_IN_SECONDS = 5 * 60 * 60;

export default { apiEndpoint, EXPIRY_TIME_IN_SECONDS };
