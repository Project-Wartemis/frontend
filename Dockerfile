FROM httpd:2.4-alpine
COPY ./angular/dist/wartemis/ /usr/local/apache2/htdocs/
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
