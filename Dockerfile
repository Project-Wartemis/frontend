FROM httpd:2.4
COPY ./dist/wartemis/ /usr/local/apache2/htdocs/
