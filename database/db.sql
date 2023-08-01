CREATE DATABASE fullstack IF NOT EXISTS;

use fullstack;

CREATE TABLE agenda (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `titre` varchar(255) NOT NULL,
  `date-start` date NOT NULL,
  `date-end` date NOT NULL,
  `idUser` int(255) NOT NULL
);

describe agenda;

CREATE TABLE user (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
);

describe user;