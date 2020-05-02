SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

--Schema: Rent
CREATE SCHEMA IF NOT EXISTS `Rent` DEFAULT CHARACTER SET utf8 ;
USE `Rent` ;

--Table: `Rent`.`user`
DROP TABLE IF EXISTS `Rent`.`user` ;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `dob` datetime NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `apt` varchar(45) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` char(2) NOT NULL,
  `country` varchar(45) NOT NULL,
  `zipcode` varchar(45) NOT NULL,
  `membership_start_date` datetime NOT NULL,
  `membership_end_date` datetime NOT NULL,
  `license_state` varchar(2) NOT NULL,
  `license_id` varchar(45) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `card_number` varchar(255) NOT NULL,
  `card_expiry_month` int NOT NULL,
  `card_expiry_year` int NOT NULL,
  `card_cvv` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Table: `Rent`.`rental_location`
DROP TABLE IF EXISTS `Rent`.`rental_location` ;
CREATE TABLE `rental_location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `apt` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` char(2) NOT NULL,
  `country` varchar(45) NOT NULL,
  `zipcode` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `capcity` int NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Table: `Rent`.`vehicle`
DROP TABLE IF EXISTS `Rent`.`vehicle` ;
CREATE TABLE `vehicle` (
  `id` int NOT NULL,
  `license_no` varchar(255) NOT NULL,
  `vid` varchar(255) NOT NULL,
  `regisration_expiry` datetime NOT NULL,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `current_mileage` int NOT NULL,
  `last_serviced` datetime NOT NULL,
  `condition` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `rental_location` int NOT NULL,
  `status` tinyint NOT NULL,
  `vehicle_picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rental_location_idx` (`rental_location`),
  CONSTRAINT `rental_location` FOREIGN KEY (`rental_location`) REFERENCES `rental_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Table: `Rent`.`transaction`
DROP TABLE IF EXISTS `Rent`.`transaction` ;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(45) NOT NULL,
  `amount` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Table: `Rent`.`reservation`
DROP TABLE IF EXISTS `Rent`.`reservation` ;
CREATE TABLE `reservation` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `location_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `return_time` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  KEY `location_id_idx` (`location_id`),
  CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES `rental_location` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Table: `Rent`.`vehicle_type`
DROP TABLE IF EXISTS `Rent`.`vehicle_type` ;
CREATE TABLE `vehicle_type` (
  `id` int NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `hours` int NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_type_idx` (`vehicle_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--Table: `Rent`.`membership_price`
DROP TABLE IF EXISTS `Rent`.`membership_price` ;
CREATE TABLE `membership_price` (
  `id` int NOT NULL,
  `membership_type` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Table: `Rent`.`feedback`
DROP TABLE IF EXISTS `Rent`.`feedback` ;
CREATE TABLE `feedback` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `service_satisfaction` varchar(255) DEFAULT NULL,
  `car_satisfaction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  CONSTRAINT `user_id_feedback` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vehicle_id_feedback` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




