CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `is_admin` tinyint(4) NOT NULL,
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
  `license_state` tinyint(4) NOT NULL,
  `license_id` varchar(45) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `license_id_UNIQUE` (`license_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rental_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `apt` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` char(2) NOT NULL,
  `country` varchar(45) NOT NULL,
  `zipcode` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `capcity` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `license_no` varchar(255) NOT NULL,
  `vid` varchar(255) NOT NULL,
  `regisration_expiry` datetime NOT NULL,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `current_mileage` int(11) NOT NULL,
  `last_serviced` datetime NOT NULL,
  `condition` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `rental_location` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rental_location_idx` (`rental_location`),
  CONSTRAINT `rental_location` FOREIGN KEY (`rental_location`) REFERENCES `rental_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(45) NOT NULL,
  `amount` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `return_time` datetime NOT NULL,
  `return_status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  KEY `location_id_idx` (`location_id`),
  CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES `rental_location` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `rental_price` (
  `id` int(11) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `hours` int(11) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_type_idx` (`vehicle_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `membership_price` (
  `id` int(11) NOT NULL,
  `membership_type` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `service_satisfaction` varchar(255) DEFAULT NULL,
  `car_satisfaction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  CONSTRAINT `user_id_feedback` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vehicle_id_feedback` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




