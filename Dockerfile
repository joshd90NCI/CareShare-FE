# Final Container: Serve the app with NGINX
FROM nginx:alpine

# Copy the build output from the builder stage to the NGINX html directory
COPY /dist /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world this is mapped to port 81 in config.yml
EXPOSE 80