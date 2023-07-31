FROM nginx

COPY ./nginx.conf /nginx.conf

CMD ["/bin/sh" , "-c" , "envsubst '$WEB_SERVICE_PORT $NUMBER_VALIDATOR_SERVICE_PORT $FRONTEND_PORT ' < /nginx.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

RUN rm /etc/nginx/nginx.conf 

COPY nginx.conf /etc/nginx/nginx.conf
