FROM httpd:2.4
COPY ./angular/dist/wartemis/ /usr/local/apache2/htdocs/
