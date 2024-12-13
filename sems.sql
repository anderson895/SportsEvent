-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 11:26 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `try111`
--

-- --------------------------------------------------------

--
-- Table structure for table `brackets`
--

CREATE TABLE `brackets` (
  `barcketId` int(11) NOT NULL,
  `sportsId` int(11) NOT NULL,
  `bracketType` varchar(255) NOT NULL,
  `isElimination` tinyint(4) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brackets`
--

INSERT INTO `brackets` (`barcketId`, `sportsId`, `bracketType`, `isElimination`, `createdAt`) VALUES
(1, 2, 'Single Elimination Bracket', 1, '2024-11-22 01:26:23'),
(2, 1, 'Winner Bracket', 1, '2024-11-22 01:27:29'),
(3, 1, 'Loser Bracket', 1, '2024-11-22 01:27:29'),
(4, 1, 'Final Rematch', 1, '2024-11-22 01:27:29');

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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventId`, `eventName`, `eventYear`, `eventstartDate`, `eventendDate`, `createdAt`, `description`) VALUES
(1, 'Intramural 2024', 0, '2024-10-26', '2024-10-29', '2024-10-27 06:43:42', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `matchId` int(11) NOT NULL,
  `sportEventsId` int(11) NOT NULL,
  `bracketId` int(11) DEFAULT NULL,
  `round` int(11) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `status` enum('scheduled','ongoing','completed','pending') NOT NULL DEFAULT 'pending',
  `winner_team_id` int(11) NOT NULL,
  `schedule` datetime DEFAULT NULL,
  `completedAt` datetime DEFAULT NULL,
  `isFinal` tinyint(4) DEFAULT 0,
  `next_match_id` int(11) DEFAULT NULL,
  `loser_next_match_id` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT 0,
  `team2Score` int(11) DEFAULT 0,
  `roundType` enum('round1','quarterfinals','semifinals','finals') DEFAULT NULL,
  `bracketType` enum('winners','losers') DEFAULT NULL,
  `eliminationStage` tinyint(4) DEFAULT NULL,
  `venue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`matchId`, `sportEventsId`, `bracketId`, `round`, `team1Id`, `team2Id`, `status`, `winner_team_id`, `schedule`, `completedAt`, `isFinal`, `next_match_id`, `loser_next_match_id`, `team1Score`, `team2Score`, `roundType`, `bracketType`, `eliminationStage`, `venue`) VALUES
(1, 1, 1, 1, 2, 3, 'completed', 2, '2024-11-27 16:00:00', NULL, 0, 5, NULL, 3, 2, NULL, NULL, NULL, NULL),
(2, 1, 1, 1, 4, 5, 'completed', 4, '2024-11-26 16:00:00', NULL, 0, 5, NULL, 3, 2, NULL, NULL, NULL, NULL),
(3, 1, 1, 1, 6, 7, 'completed', 7, '2024-11-25 16:00:00', NULL, 0, 6, NULL, 2, 6, NULL, NULL, NULL, NULL),
(4, 1, 1, 1, 8, 9, 'completed', 9, '2024-11-25 16:00:00', NULL, 0, 6, NULL, 3, 4, NULL, NULL, NULL, NULL),
(5, 1, 1, 2, 2, 4, 'completed', 2, '2024-11-23 10:19:50', NULL, 0, 7, NULL, 15, 2, NULL, NULL, NULL, ''),
(6, 1, 1, 2, 7, 9, 'completed', 7, '2024-11-23 10:19:53', NULL, 0, 7, NULL, 9, 2, NULL, NULL, NULL, ''),
(7, 1, 1, 3, 2, 7, 'completed', 2, '2024-11-23 10:19:58', NULL, 1, NULL, NULL, 12, 2, NULL, NULL, NULL, ''),
(8, 2, 2, 1, 3, 2, 'completed', 2, '2024-11-24 16:00:00', NULL, 0, 12, 13, 3, 8, NULL, 'winners', NULL, NULL),
(9, 2, 2, 1, 4, 5, 'completed', 5, '2024-11-25 16:00:00', NULL, 0, 12, 13, 2, 4, NULL, 'winners', NULL, NULL),
(10, 2, 2, 1, 6, 8, 'completed', 6, '2024-11-26 16:00:00', NULL, 0, 14, 15, 9, 4, NULL, 'winners', NULL, NULL),
(11, 2, 2, 1, 7, 9, 'completed', 7, '2024-11-27 16:00:00', NULL, 0, 14, 15, 3, 2, NULL, 'winners', NULL, NULL),
(12, 2, 2, 2, 5, 2, 'completed', 2, '2024-11-23 10:20:12', NULL, 0, 16, 17, 0, 12, NULL, 'winners', NULL, ''),
(13, 2, 3, 1, 4, 3, 'scheduled', 0, '2024-11-23 10:20:09', NULL, 0, 17, NULL, 0, 0, NULL, 'losers', NULL, ''),
(14, 2, 2, 2, 6, 7, 'scheduled', 0, '2024-11-23 10:20:17', NULL, 0, 16, 18, 0, 0, NULL, 'winners', NULL, ''),
(15, 2, 3, 1, 8, 9, 'scheduled', 0, '2024-11-23 10:20:25', NULL, 0, 18, NULL, 0, 0, NULL, 'losers', NULL, ''),
(16, 2, 2, 3, 2, NULL, 'scheduled', 0, '2024-11-23 10:20:29', NULL, 0, 21, 20, 0, 0, NULL, 'winners', NULL, ''),
(17, 2, 3, 2, 5, NULL, 'scheduled', 0, '2024-11-23 10:20:33', NULL, 0, 19, NULL, 0, 0, NULL, 'losers', NULL, ''),
(18, 2, 3, 2, NULL, NULL, 'scheduled', 0, '2024-11-23 10:20:37', NULL, 0, 19, NULL, 0, 0, NULL, 'losers', NULL, ''),
(19, 2, 3, 3, NULL, NULL, 'scheduled', 0, '2024-11-23 10:20:41', NULL, 0, 20, NULL, 0, 0, NULL, 'losers', NULL, ''),
(20, 2, 3, 4, NULL, NULL, 'scheduled', 0, '2024-11-23 10:20:45', NULL, 0, 21, NULL, 0, 0, NULL, 'losers', NULL, ''),
(21, 2, 4, 5, NULL, NULL, 'scheduled', 0, '2024-11-23 10:20:49', NULL, 1, NULL, NULL, 0, 0, NULL, '', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `mediaId` int(11) NOT NULL,
  `url` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`mediaId`, `url`, `type`, `createdAt`) VALUES
(1, 'https://ik.imagekit.io/ghqmiuwd9/1731809426462_img4_SsAiEAv5H.png', 'image', '2024-11-17 02:10:31'),
(2, 'https://ik.imagekit.io/ghqmiuwd9/1731809474738_mixkit-skilled-basketball-player-shooting-baskets-training-alone-44448-hd-ready_c231imZdE.mp4', 'video', '2024-11-17 02:11:18'),
(3, 'https://ik.imagekit.io/ghqmiuwd9/1731809789019_img3_KcPk6qNZN.png', 'image', '2024-11-17 02:16:32'),
(4, 'https://ik.imagekit.io/ghqmiuwd9/1731809807754_img5_btrQ-Fwzf.png', 'image', '2024-11-17 02:16:52'),
(5, 'https://ik.imagekit.io/ghqmiuwd9/1731809882891_mixkit-men-coming-to-play-soccer-football-4567-hd-ready_K1P-vhQtd.mp4', 'video', '2024-11-17 02:18:09'),
(6, 'https://ik.imagekit.io/ghqmiuwd9/1731809926992_img3_cjbiy1chT.png', 'image', '2024-11-17 02:18:52');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `playerId` int(11) NOT NULL,
  `teamEventId` int(11) NOT NULL,
  `playerName` longtext NOT NULL,
  `position` varchar(255) NOT NULL,
  `medicalCertificate` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`playerId`, `teamEventId`, `playerName`, `position`, `medicalCertificate`) VALUES
(1, 2, 'CAS-Player 1', 'Power Forward', 'https://ik.imagekit.io/ghqmiuwd9/1731769782892_Free-Medical-Certificate-Template_nWZeW9_qA.jpg');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sports`
--

INSERT INTO `sports` (`sportsId`, `sportsName`, `sportsLogo`, `description`, `createdAt`) VALUES
(1, 'Basketball', 'https://ik.imagekit.io/0o9pbzaxk/basketball_XWfc7WLUe.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '2024-10-27 15:14:02'),
(2, 'Volleyball', 'https://ik.imagekit.io/0o9pbzaxk/volleyball_GSuKETPBo.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '2024-10-27 15:17:29'),
(3, 'Soccer', 'https://ik.imagekit.io/0o9pbzaxk/soccerball-transparent-png-28_JM9txIMUj.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '2024-11-13 06:33:57');

-- --------------------------------------------------------

--
-- Table structure for table `sports_events`
--

CREATE TABLE `sports_events` (
  `sportEventsId` int(11) NOT NULL,
  `sportsId` int(11) NOT NULL,
  `eventsId` int(11) NOT NULL,
  `bracketType` varchar(255) DEFAULT NULL,
  `coachId` int(11) DEFAULT NULL,
  `maxPlayers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sports_events`
--

INSERT INTO `sports_events` (`sportEventsId`, `sportsId`, `eventsId`, `bracketType`, `coachId`, `maxPlayers`) VALUES
(1, 2, 1, 'Single Elimination', NULL, 10),
(2, 1, 1, 'Double Elimination', NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamId` int(10) UNSIGNED NOT NULL,
  `teamName` longtext NOT NULL,
  `teamLogo` longtext DEFAULT NULL,
  `teamCoach` int(11) NOT NULL,
  `dateAdded` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `teamName`, `teamLogo`, `teamCoach`, `dateAdded`) VALUES
(2, 'College of Accountancy and Finance', 'https://ik.imagekit.io/0o9pbzaxk/caf_u3IB2QHRW.jpg', 2, '2024-10-27 10:45:40'),
(3, 'College of Arts and Sciences', 'https://ik.imagekit.io/0o9pbzaxk/cas_dJb3exMVd.jpg', 3, '2024-10-27 11:25:51'),
(4, 'College of Business and Management', 'https://ik.imagekit.io/0o9pbzaxk/cbm_XquvNU8Hu.jpg', 5, '2024-10-27 11:36:09'),
(5, 'College of Criminal Justice Education', 'https://ik.imagekit.io/0o9pbzaxk/ccje_R3HXqIfDx.jpg', 6, '2024-10-27 11:36:52'),
(6, 'College of Computer Studies', 'https://ik.imagekit.io/0o9pbzaxk/ccs_c-aP3cNgw.png', 7, '2024-10-27 11:39:00'),
(7, 'College of Health Sciences', 'https://ik.imagekit.io/0o9pbzaxk/chs_JHFWFMFJQ.jpg', 8, '2024-10-27 11:39:43'),
(8, 'College of Engineering', 'https://ik.imagekit.io/0o9pbzaxk/coe_2JliI7QeM.png', 9, '2024-10-27 11:40:47'),
(9, 'College of Teacher Education', 'https://ik.imagekit.io/0o9pbzaxk/cted_So7P0RKUo.jpg', 10, '2024-10-27 11:41:38');

-- --------------------------------------------------------

--
-- Table structure for table `teams_events`
--

CREATE TABLE `teams_events` (
  `teamEventId` int(11) NOT NULL,
  `sportEventsId` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `teamId` int(11) NOT NULL,
  `coachId` int(11) NOT NULL,
  `teamWin` int(11) DEFAULT 0,
  `teamLose` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams_events`
--

INSERT INTO `teams_events` (`teamEventId`, `sportEventsId`, `teamName`, `teamId`, `coachId`, `teamWin`, `teamLose`) VALUES
(1, 1, 'College of Accountancy and Finance', 2, 2, 4, 0),
(2, 1, 'College of Arts and Sciences', 3, 3, 0, 2),
(3, 1, 'College of Business and Management', 4, 5, 1, 2),
(4, 1, 'College of Criminal Justice Education', 5, 6, 1, 2),
(5, 1, 'College of Computer Studies', 6, 7, 1, 1),
(6, 1, 'College of Health Sciences', 7, 8, 3, 0),
(7, 1, 'College of Engineering', 8, 9, 0, 2),
(8, 1, 'College of Teacher Education', 9, 10, 1, 2),
(9, 2, 'College of Accountancy and Finance', 2, 2, 4, 0),
(10, 2, 'College of Arts and Sciences', 3, 3, 0, 2),
(11, 2, 'College of Business and Management', 4, 5, 1, 2),
(12, 2, 'College of Criminal Justice Education', 5, 6, 1, 2),
(13, 2, 'College of Computer Studies', 6, 7, 1, 1),
(14, 2, 'College of Health Sciences', 7, 8, 3, 0),
(15, 2, 'College of Engineering', 8, 9, 0, 2),
(16, 2, 'College of Teacher Education', 9, 10, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `teamId`, `status`) VALUES
(1, 'Michael_Devs', '$2a$10$PGJ4iFiTHQa6lmjifyZyUeFQcBVIXALq00ZzF3CpcBH31dxzOoXq2', 'SuperAdmin', 0, 'Active'),
(2, 'CAF', '$2a$10$mjCfZeL1cXkNorlsWybBie6QRTul.kztIp3vXGvMNomOGuD.aFNfO', 'Coach', NULL, 'Active'),
(3, 'CAS', '$2a$10$UVw5HLvCJyg5UzXQ.ofY6uapplP1sGqpIKzWKgSo4SZICERY/6kCC', 'Coach', NULL, 'Active'),
(4, 'Admin', '$2a$10$I7hrXsymMIzoQQ78hEe.Y.jjEFH373J2j3glP9YCz//mMBYptk2z.', 'Admin', NULL, 'Active'),
(5, 'CBM', '$2a$10$nZOlNUXoS6gqUDWCOkhOFeFEvWgriuMRoowt167DLD.pjV.bcfqKu', 'Coach', NULL, 'Active'),
(6, 'CCJE', '$2a$10$1TZaQTGs8jrxHAbgA991G.VlVcBINOTm.GQBWiSfWSvA241tLtHGW', 'Coach', NULL, 'Active'),
(7, 'CCS', '$2a$10$mjmurTgpLuN92VQ4G1js5OZfLzm4.8aeZVSPrMMe9G9N91wOYfDkC', 'Coach', NULL, 'Active'),
(8, 'CHS', '$2a$10$4TrC1yn49tU91PuY5n5xTeeEIBpzWvJ7bPqSimEDiZmvEH0cHxLiO', 'Coach', NULL, 'Active'),
(9, 'COE', '$2a$10$bm9VwNs2JnkUkvrWYE31s.lfvERElV9PDPb/IAmpx/69NfShtibCW', 'Coach', NULL, 'Active'),
(10, 'CTED', '$2a$10$FF.pk..V3cnq49BW9IdGIOWDn6.3NL9oHkPb3wZs/v4LJtXw8lXju', 'Coach', NULL, 'Active');

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
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`matchId`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`mediaId`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`playerId`);

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
-- Indexes for table `teams_events`
--
ALTER TABLE `teams_events`
  ADD PRIMARY KEY (`teamEventId`);

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
  MODIFY `barcketId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `matchId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `mediaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `playerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sports`
--
ALTER TABLE `sports`
  MODIFY `sportsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sports_events`
--
ALTER TABLE `sports_events`
  MODIFY `sportEventsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teams_events`
--
ALTER TABLE `teams_events`
  MODIFY `teamEventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brackets`
--
ALTER TABLE `brackets`
  ADD CONSTRAINT `fk_bracket_sports` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
