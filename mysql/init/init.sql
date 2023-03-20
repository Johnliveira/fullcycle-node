GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;

CREATE DATABASE IF NOT EXISTS nodedb;

USE nodedb;

CREATE TABLE IF NOT EXISTS people (
    id int not null auto_increment,
    fullname varchar(255),
    primary key(id)
);