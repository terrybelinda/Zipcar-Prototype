CREATE DATABASE rent;
USE rent;

CREATE TABLE customer
{
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    gender VARCHAR(255),
    dob DATE
};