# Final Container: Serve the app with NGINX
FROM nginx:alpine

ARG VITE_API_URL

FROM alpine:latest

# Install Nginx and any required tools (like certbot if you're handling SSL in the container)
RUN apk update && apk add --no-cache nginx

# Create the directories upfront
RUN mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

# Copy your custom nginx.conf that includes the line:
# include /etc/nginx/sites-enabled/*;
COPY nginx.conf /etc/nginx/nginx.conf

# Sites available to mimic more standard nginx configurations
COPY careshare.conf /etc/nginx/sites-available/

# Copy your site configuration(s) into sites-available
COPY careshare.joshuadanceywebdev.ie.conf /etc/nginx/sites-available/

# Symlink the config from sites-available to sites-enabled
RUN ln -s /etc/nginx/sites-available/careshare.joshuadanceywebdev.ie.conf /etc/nginx/sites-enabled/

# Symlink the config from sites-available to sites-enabled
RUN ln -s /etc/nginx/sites-available/careshare.joshuadanceywebdev.ie.conf /etc/nginx/sites-enabled/


# If using Let's Encrypt inside the container (less common, but possible):
# - You might need to install certbot and run certificate retrieval commands at runtime or entrypoint.
# For now, just ensure cert files are available or mount them at runtime.

# Expose the necessary ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]



# Copy the build output from the builder stage to the NGINX html directory
COPY /dist /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world this is mapped to port 81 in config.yml
EXPOSE 80