-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2021 a las 02:43:57
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datawarehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`city_id`, `name`, `country_id`) VALUES
(3, 'Ciudad Autónoma de Buenos Aires', 31),
(4, 'Rio de Janeiro', 32),
(7, 'Nueva York', 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`company_id`, `name`, `adress`, `email`, `phone`, `city_id`, `city_name`) VALUES
(3, 'Test', 'Una direccion cualquiera 1', 'test@test.com', 1166666666, 0, 'Ciudad Autonoma de Buenos Aires'),
(7, 'Compania 2', 'Alguna direccion', 'uncorreo@correo.com', 1166666666, 4, 'Rio de Janeiro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `charge` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(50) DEFAULT NULL,
  `adress` varchar(50) NOT NULL,
  `interest` int(11) NOT NULL DEFAULT 0,
  `instagram_user` varchar(50) DEFAULT NULL,
  `instagram_preferences` int(11) DEFAULT NULL,
  `whatsapp_user` int(11) DEFAULT NULL,
  `whatsapp_preferences` int(11) DEFAULT NULL,
  `linkedin_user` varchar(50) DEFAULT NULL,
  `linkedin_preferences` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`contact_id`, `first_name`, `last_name`, `charge`, `email`, `company_id`, `company_name`, `city_id`, `city_name`, `adress`, `interest`, `instagram_user`, `instagram_preferences`, `whatsapp_user`, `whatsapp_preferences`, `linkedin_user`, `linkedin_preferences`) VALUES
(8, 'Primer contacto', 'Acamica', 'Fullstack dev', 'contacto1@gmail.com', 3, 'Test', 3, 'Ciudad Autónoma de Buenos Aires', 'Direccion ficticia 1', 100, 'testig', 3, 1166666666, 2, 'testli', 1),
(11, 'Segundo contacto ', 'Acamica', 'Tester', 'tester@acamica.com', 7, 'Compania 2', 7, 'Nueva York', 'Alguna direccion', 75, '', 1, 0, 1, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`country_id`, `name`, `region_id`) VALUES
(31, 'Argentina', 12),
(32, 'Brasil', 12),
(33, 'Estados Unidos', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `region_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`region_id`, `name`) VALUES
(12, 'Sudamerica'),
(13, 'Norteamérica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `pass`, `is_admin`) VALUES
(0, 'Rosario', 'Farias', 'admin@admin.com', 'admin', 1),
(10, 'User', 'Acamica', 'user@acamica.com', 'acamica', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `company_id` (`company_id`,`city_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD KEY `regionid` (`region_id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`region_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`);

--
-- Filtros para la tabla `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `regionid` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
