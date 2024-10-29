-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2024 at 02:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sportevents`
--

-- --------------------------------------------------------

--
-- Table structure for table `brackets`
--

CREATE TABLE `brackets` (
  `barcketId` int(11) NOT NULL,
  `sportsId` int(11) NOT NULL,
  `bracketType` enum('single_elimination','double_elimination','round_robin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cateogryId` int(11) NOT NULL,
  `sportsId` int(11) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `type` enum('single','double') NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventId` int(11) NOT NULL,
  `eventName` longtext NOT NULL,
  `eventYear` int(11) NOT NULL,
  `eventstartDate` date NOT NULL,
  `eventendDate` date NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventId`, `eventName`, `eventYear`, `eventstartDate`, `eventendDate`, `createdAt`) VALUES
(1, 'Intramural 2024', 0, '2024-10-27', '2024-10-30', '2024-10-27 06:43:42');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `matchId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `team1Id` int(11) NOT NULL,
  `team2Id` int(11) NOT NULL,
  `round` int(11) NOT NULL,
  `status` enum('scheduled','ongoing','completed') NOT NULL DEFAULT 'scheduled',
  `winner_team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `scoreId` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `team1_score` int(11) NOT NULL,
  `team2_score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scoring_formats`
--

CREATE TABLE `scoring_formats` (
  `scoringId` int(11) NOT NULL,
  `sportsId` int(11) NOT NULL,
  `scoringType` enum('quarter','set','time','goal_based') NOT NULL,
  `periods` int(11) NOT NULL DEFAULT 4
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sports`
--

CREATE TABLE `sports` (
  `sportsId` int(11) NOT NULL,
  `sportsName` longtext NOT NULL,
  `sportsLogo` longtext NOT NULL,
  `description` longtext NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sports`
--

INSERT INTO `sports` (`sportsId`, `sportsName`, `sportsLogo`, `description`, `createdAt`) VALUES
(1, 'Basketball', 'https://ik.imagekit.io/0o9pbzaxk/basketball_XWfc7WLUe.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '2024-10-27 15:14:02'),
(2, 'Volleyball', 'https://ik.imagekit.io/0o9pbzaxk/volleyball_GSuKETPBo.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '2024-10-27 15:17:29');

-- --------------------------------------------------------

--
-- Table structure for table `sports_events`
--

CREATE TABLE `sports_events` (
  `sportEventsId` int(11) NOT NULL,
  `sportsId` int(11) NOT NULL,
  `eventsId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamId` int(10) UNSIGNED NOT NULL,
  `teamName` longtext NOT NULL,
  `teamLogo` longtext DEFAULT NULL,
  `teamCoach` longtext NOT NULL,
  `dateAdded` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `teamName`, `teamLogo`, `teamCoach`, `dateAdded`) VALUES
(2, 'College of Accountancy and Finance', 'https://ik.imagekit.io/0o9pbzaxk/caf_u3IB2QHRW.jpg', 'John Doe', '2024-10-27 10:45:40'),
(3, 'College of Arts and Sciences', 'https://ik.imagekit.io/0o9pbzaxk/cas_dJb3exMVd.jpg', 'Juan Cruz', '2024-10-27 11:25:51'),
(4, 'College of Business and Management', 'https://ik.imagekit.io/0o9pbzaxk/cbm_XquvNU8Hu.jpg', 'Jack Ty', '2024-10-27 11:36:09'),
(5, 'College of Criminal Justice Education', 'https://ik.imagekit.io/0o9pbzaxk/ccje_R3HXqIfDx.jpg', 'April Cruz', '2024-10-27 11:36:52'),
(6, 'College of Computer Studies', 'https://ik.imagekit.io/0o9pbzaxk/ccs_c-aP3cNgw.png', 'Mark Tan', '2024-10-27 11:39:00'),
(7, 'College of Health Sciences', 'https://ik.imagekit.io/0o9pbzaxk/chs_JHFWFMFJQ.jpg', 'Nick Javier', '2024-10-27 11:39:43'),
(8, 'College of Engineering', 'https://ik.imagekit.io/0o9pbzaxk/coe_2JliI7QeM.png', 'Jose Manalo', '2024-10-27 11:40:47'),
(9, 'College of Teacher Education', 'https://ik.imagekit.io/0o9pbzaxk/cted_So7P0RKUo.jpg', 'Angelo Reyes', '2024-10-27 11:41:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` longtext DEFAULT NULL,
  `collegeName` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `collegeName`) VALUES
(1, 'Josh_Devs', '$2a$10$PGJ4iFiTHQa6lmjifyZyUeFQcBVIXALq00ZzF3CpcBH31dxzOoXq2', 'Naga College Foundation');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brackets`
--
ALTER TABLE `brackets`
  ADD PRIMARY KEY (`barcketId`),
  ADD KEY `fk_sportsId_idx` (`sportsId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cateogryId`),
  ADD KEY `fk_sportsId_idx` (`sportsId`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`matchId`),
  ADD KEY `fk_matcheventskey_idx` (`eventId`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`scoreId`),
  ADD KEY `fk_scorematchkey_idx` (`matchId`);

--
-- Indexes for table `scoring_formats`
--
ALTER TABLE `scoring_formats`
  ADD PRIMARY KEY (`scoringId`),
  ADD KEY `fk_scoringsports_idx` (`sportsId`);

--
-- Indexes for table `sports`
--
ALTER TABLE `sports`
  ADD PRIMARY KEY (`sportsId`);

--
-- Indexes for table `sports_events`
--
ALTER TABLE `sports_events`
  ADD PRIMARY KEY (`sportEventsId`),
  ADD KEY `fk_sportsEve_idx` (`sportsId`),
  ADD KEY `fk_eventsFk_idx` (`eventsId`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brackets`
--
ALTER TABLE `brackets`
  MODIFY `barcketId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cateogryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `matchId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `scoreId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scoring_formats`
--
ALTER TABLE `scoring_formats`
  MODIFY `scoringId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sports`
--
ALTER TABLE `sports`
  MODIFY `sportsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sports_events`
--
ALTER TABLE `sports_events`
  MODIFY `sportEventsId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brackets`
--
ALTER TABLE `brackets`
  ADD CONSTRAINT `fk_bracket_sports` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_sportsId` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `fk_matcheventskey` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `fk_scorematchkey` FOREIGN KEY (`matchId`) REFERENCES `matches` (`matchId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `scoring_formats`
--
ALTER TABLE `scoring_formats`
  ADD CONSTRAINT `fk_scoringsports` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `sports_events`
--
ALTER TABLE `sports_events`
  ADD CONSTRAINT `fk_eventsFk` FOREIGN KEY (`eventsId`) REFERENCES `events` (`eventId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sportsEve` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
