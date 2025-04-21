CREATE TABLE `products` (
  `id` char(36) NOT NULL,
  `status` enum('Stocking','Bought') DEFAULT 'Stocking',
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)