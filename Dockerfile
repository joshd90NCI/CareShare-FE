# Final Container: Serve the app with NGINX
FROM nginx:alpine

ARG VITE_API_URL
RUN echo "Building with VITE_API_URL=$VITE_API_URL"


# Copy the build output from the builder stage to the NGINX html directory
COPY /dist /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world this is mapped to port 81 in config.yml
EXPOSE 80