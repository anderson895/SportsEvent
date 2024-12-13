-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2024 at 03:12 AM
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
-- Database: `sems-testing1`
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
(1, 'Intramural 2024', 0, '2024-12-06', '2024-12-08', '2024-12-01 01:58:23', '<p>Naga College Foundation Intramural 2024</p>');

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
  `bracketType` enum('winners','losers','final_rematch','final') DEFAULT NULL,
  `eliminationStage` tinyint(4) DEFAULT NULL,
  `venue` longtext DEFAULT NULL,
  `team1stat` varchar(255) DEFAULT NULL,
  `team2stat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `mediaId` int(11) NOT NULL,
  `url` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `title` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`mediaId`, `url`, `type`, `createdAt`, `title`, `description`, `author`) VALUES
(2, 'https://ik.imagekit.io/ghqmiuwd9/1731809474738_mixkit-skilled-basketball-player-shooting-baskets-training-alone-44448-hd-ready_c231imZdE.mp4', 'video', '2024-11-17 02:11:18', NULL, NULL, NULL),
(7, 'https://ik.imagekit.io/ghqmiuwd9/1732340668019_img4_VaaU0_fti.png', 'image', '2024-11-23 05:44:38', 'Sample Testing ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'undefined'),
(8, 'https://ik.imagekit.io/ghqmiuwd9/1732353823284_img5_EqPLUQY0A.png', 'image', '2024-11-23 09:23:48', 'Recent winner in the league', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'undefined'),
(9, 'https://ik.imagekit.io/ghqmiuwd9/1732354168269_mixkit-men-coming-to-play-soccer-football-4567-hd-ready_zwPWJXhed.mp4', 'video', '2024-11-23 09:29:50', 'Lorem ipsum odor amet, consectetuer adipiscing elit.', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae commodo sollicitudin congue at et iaculis fringilla dictum. Elementum libero dapibus hendrerit tristique non mus morbi nunc.', 'undefined');

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
(1, 'Basketball-M', 'https://ik.imagekit.io/ghqmiuwd9/1733017386848_basketball_5L0Kai3Rp.png', '<p>Basketball Men\'s Category</p>', '2024-12-01 01:43:09'),
(2, 'Basketball-W', 'https://ik.imagekit.io/ghqmiuwd9/1733017417529_basketball_LNzKNTYSU.png', '<p>Basketball Women\'s Category</p>', '2024-12-01 01:43:40'),
(3, 'Volleyball-M', 'https://ik.imagekit.io/ghqmiuwd9/1733017539189_volleyball_bmAj-nNjf.png', '<p>Volleyball Men\'s Category</p>', '2024-12-01 01:45:41'),
(4, 'Volleyball-W', 'https://ik.imagekit.io/ghqmiuwd9/1733017565606_volleyball_kvLuBmYmD.png', '<p>Volleyball Women\'s Category</p>', '2024-12-01 01:46:08'),
(5, 'Badminton-M', 'https://ik.imagekit.io/ghqmiuwd9/1733017869150_Badminton_e7Xb0gj2S.png', '<p>Badminton Men\'s Category</p>', '2024-12-01 01:51:11'),
(6, 'Badminton-W', 'https://ik.imagekit.io/ghqmiuwd9/1733017901422_Badminton_jVMpmx7F2.png', '<p>Badminton Women\'s Category</p>', '2024-12-01 01:51:43'),
(7, 'Table Tennis-M', 'https://ik.imagekit.io/ghqmiuwd9/1733018118889_Table_Tennis_kq-N6nF5S.png', '<p>Table Tennis Men\'s Category</p>', '2024-12-01 01:53:42'),
(8, 'Table Tennis-W', 'https://ik.imagekit.io/ghqmiuwd9/1733018139408_Table_Tennis_UxcZfu3LD.png', '<p>Table Tennis Women\'s Category</p>', '2024-12-01 01:55:41'),
(9, 'Sepak Takraw-M', 'https://ik.imagekit.io/ghqmiuwd9/1733018197396_Sepak_Q7Zb7ez2K.png', '<p>Sepak Takraw Men\'s Category</p>', '2024-12-01 01:56:40');

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
(1, 1, 1, 'Double Elimination', NULL, 15),
(2, 2, 1, 'Double Elimination', NULL, 12),
(3, 3, 1, 'Double Elimination', NULL, 15),
(4, 4, 1, 'Double Elimination', NULL, 15),
(5, 5, 1, 'Double Elimination', NULL, 4),
(6, 6, 1, 'Double Elimination', NULL, 4),
(7, 7, 1, 'Double Elimination', NULL, 4),
(8, 8, 1, 'Double Elimination', NULL, 4),
(9, 9, 1, 'Double Elimination', NULL, 7);

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
(1, 1, 'College of Accountancy and Finance', 2, 2, 0, 0),
(2, 1, 'College of Arts and Sciences', 3, 3, 0, 0),
(3, 1, 'College of Business and Management', 4, 5, 0, 0),
(4, 1, 'College of Criminal Justice Education', 5, 6, 0, 0),
(5, 1, 'College of Computer Studies', 6, 7, 0, 0),
(6, 1, 'College of Health Sciences', 7, 8, 0, 0),
(7, 1, 'College of Teacher Education', 9, 10, 0, 0),
(8, 2, 'College of Accountancy and Finance', 2, 2, 0, 0),
(9, 2, 'College of Arts and Sciences', 3, 3, 0, 0),
(10, 2, 'College of Business and Management', 4, 5, 0, 0),
(11, 2, 'College of Criminal Justice Education', 5, 6, 0, 0),
(12, 2, 'College of Computer Studies', 6, 7, 0, 0),
(13, 2, 'College of Health Sciences', 7, 8, 0, 0),
(14, 2, 'College of Teacher Education', 9, 10, 0, 0),
(15, 3, 'College of Accountancy and Finance', 2, 2, 0, 0),
(16, 3, 'College of Arts and Sciences', 3, 3, 0, 0),
(17, 3, 'College of Business and Management', 4, 5, 0, 0),
(18, 3, 'College of Criminal Justice Education', 5, 6, 0, 0),
(19, 3, 'College of Computer Studies', 6, 7, 0, 0),
(20, 3, 'College of Health Sciences', 7, 8, 0, 0),
(21, 3, 'College of Teacher Education', 9, 10, 0, 0),
(22, 4, 'College of Accountancy and Finance', 2, 2, 0, 0),
(23, 4, 'College of Arts and Sciences', 3, 3, 0, 0),
(24, 4, 'College of Business and Management', 4, 5, 0, 0),
(25, 4, 'College of Criminal Justice Education', 5, 6, 0, 0),
(26, 4, 'College of Computer Studies', 6, 7, 0, 0),
(27, 4, 'College of Health Sciences', 7, 8, 0, 0),
(28, 4, 'College of Teacher Education', 9, 10, 0, 0),
(29, 5, 'College of Accountancy and Finance', 2, 2, 0, 0),
(30, 5, 'College of Arts and Sciences', 3, 3, 0, 0),
(31, 5, 'College of Business and Management', 4, 5, 0, 0),
(32, 5, 'College of Criminal Justice Education', 5, 6, 0, 0),
(33, 5, 'College of Computer Studies', 6, 7, 0, 0),
(34, 5, 'College of Health Sciences', 7, 8, 0, 0),
(35, 5, 'College of Teacher Education', 9, 10, 0, 0),
(36, 6, 'College of Accountancy and Finance', 2, 2, 0, 0),
(37, 6, 'College of Arts and Sciences', 3, 3, 0, 0),
(38, 6, 'College of Business and Management', 4, 5, 0, 0),
(39, 6, 'College of Criminal Justice Education', 5, 6, 0, 0),
(40, 6, 'College of Computer Studies', 6, 7, 0, 0),
(41, 6, 'College of Health Sciences', 7, 8, 0, 0),
(42, 6, 'College of Teacher Education', 9, 10, 0, 0),
(43, 7, 'College of Accountancy and Finance', 2, 2, 0, 0),
(44, 7, 'College of Business and Management', 4, 5, 0, 0),
(45, 7, 'College of Computer Studies', 6, 7, 0, 0),
(46, 7, 'College of Arts and Sciences', 3, 3, 0, 0),
(47, 7, 'College of Criminal Justice Education', 5, 6, 0, 0),
(48, 7, 'College of Health Sciences', 7, 8, 0, 0),
(49, 7, 'College of Teacher Education', 9, 10, 0, 0),
(50, 8, 'College of Accountancy and Finance', 2, 2, 0, 0),
(51, 8, 'College of Arts and Sciences', 3, 3, 0, 0),
(52, 8, 'College of Business and Management', 4, 5, 0, 0),
(53, 8, 'College of Criminal Justice Education', 5, 6, 0, 0),
(54, 8, 'College of Computer Studies', 6, 7, 0, 0),
(55, 8, 'College of Health Sciences', 7, 8, 0, 0),
(56, 8, 'College of Teacher Education', 9, 10, 0, 0),
(57, 9, 'College of Accountancy and Finance', 2, 2, 0, 0),
(58, 9, 'College of Arts and Sciences', 3, 3, 0, 0),
(59, 9, 'College of Business and Management', 4, 5, 0, 0),
(60, 9, 'College of Criminal Justice Education', 5, 6, 0, 0),
(61, 9, 'College of Computer Studies', 6, 7, 0, 0),
(62, 9, 'College of Health Sciences', 7, 8, 0, 0),
(63, 9, 'College of Teacher Education', 9, 10, 0, 0);

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
(2, 'CAF', '$2a$10$lSmTYaZwvmy3mmeAl7p9hu4iOhvj583dTVl8/JNjznF4DbWGO2N4e', 'Coach', NULL, 'Active'),
(3, 'CAS', '$2a$10$UVw5HLvCJyg5UzXQ.ofY6uapplP1sGqpIKzWKgSo4SZICERY/6kCC', 'Coach', NULL, 'Active'),
(4, 'Admin', '$2a$10$VNuaBADcU37rtHdQu36xfOmwzn6EQCjKwtu9k5hkkg8sNbDAmoPOO', 'Admin', NULL, 'Active'),
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
  MODIFY `barcketId` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `mediaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `playerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sports`
--
ALTER TABLE `sports`
  MODIFY `sportsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sports_events`
--
ALTER TABLE `sports_events`
  MODIFY `sportEventsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teams_events`
--
ALTER TABLE `teams_events`
  MODIFY `teamEventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

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
