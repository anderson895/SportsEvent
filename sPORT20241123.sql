-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sportevents
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brackets`
--

DROP TABLE IF EXISTS `brackets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brackets` (
  `barcketId` int(11) NOT NULL AUTO_INCREMENT,
  `sportsId` int(11) NOT NULL,
  `bracketType` varchar(255) NOT NULL,
  `isElimination` tinyint(4) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`barcketId`),
  KEY `fk_sportsId_idx` (`sportsId`),
  CONSTRAINT `fk_bracket_sports` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brackets`
--

LOCK TABLES `brackets` WRITE;
/*!40000 ALTER TABLE `brackets` DISABLE KEYS */;
INSERT INTO `brackets` VALUES (1,2,'Single Elimination Bracket',1,'2024-11-22 01:26:23'),(2,1,'Winner Bracket',1,'2024-11-22 01:27:29'),(3,1,'Loser Bracket',1,'2024-11-22 01:27:29'),(4,1,'Final Rematch',1,'2024-11-22 01:27:29');
/*!40000 ALTER TABLE `brackets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventId` int(11) NOT NULL AUTO_INCREMENT,
  `eventName` longtext NOT NULL,
  `eventYear` int(11) NOT NULL,
  `eventstartDate` date NOT NULL,
  `eventendDate` date NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `description` longtext NOT NULL,
  PRIMARY KEY (`eventId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Intramural 2024',0,'2024-10-26','2024-10-29','2024-10-27 06:43:42','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `matchId` int(11) NOT NULL AUTO_INCREMENT,
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
  `venue` longtext DEFAULT NULL,
  PRIMARY KEY (`matchId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (1,1,1,1,2,3,'pending',0,'2024-11-27 16:00:00',NULL,0,5,NULL,0,0,NULL,NULL,NULL,NULL),(2,1,1,1,4,5,'pending',0,'2024-11-26 16:00:00',NULL,0,5,NULL,0,0,NULL,NULL,NULL,NULL),(3,1,1,1,6,7,'pending',0,'2024-11-25 16:00:00',NULL,0,6,NULL,0,0,NULL,NULL,NULL,NULL),(4,1,1,1,8,9,'pending',0,'2024-11-25 16:00:00',NULL,0,6,NULL,0,0,NULL,NULL,NULL,NULL),(5,1,1,2,NULL,NULL,'pending',0,NULL,NULL,0,7,NULL,0,0,NULL,NULL,NULL,NULL),(6,1,1,2,NULL,NULL,'pending',0,NULL,NULL,0,7,NULL,0,0,NULL,NULL,NULL,NULL),(7,1,1,3,NULL,NULL,'pending',0,NULL,NULL,1,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(8,2,2,1,3,2,'pending',0,'2024-11-24 16:00:00',NULL,0,12,13,0,0,NULL,'winners',NULL,NULL),(9,2,2,1,4,5,'completed',5,'2024-11-25 16:00:00',NULL,0,12,13,2,4,NULL,'winners',NULL,NULL),(10,2,2,1,6,8,'pending',0,'2024-11-26 16:00:00',NULL,0,14,15,0,0,NULL,'winners',NULL,NULL),(11,2,2,1,7,9,'pending',0,'2024-11-27 16:00:00',NULL,0,14,15,0,0,NULL,'winners',NULL,NULL),(12,2,2,2,5,NULL,'pending',0,NULL,NULL,0,16,17,0,0,NULL,'winners',NULL,NULL),(13,2,3,1,4,NULL,'pending',0,NULL,NULL,0,17,NULL,0,0,NULL,'losers',NULL,NULL),(14,2,2,2,NULL,NULL,'pending',0,NULL,NULL,0,16,18,0,0,NULL,'winners',NULL,NULL),(15,2,3,1,NULL,NULL,'pending',0,NULL,NULL,0,18,NULL,0,0,NULL,'losers',NULL,NULL),(16,2,2,3,NULL,NULL,'pending',0,NULL,NULL,0,21,20,0,0,NULL,'winners',NULL,NULL),(17,2,3,2,NULL,NULL,'pending',0,NULL,NULL,0,19,NULL,0,0,NULL,'losers',NULL,NULL),(18,2,3,2,NULL,NULL,'pending',0,NULL,NULL,0,19,NULL,0,0,NULL,'losers',NULL,NULL),(19,2,3,3,NULL,NULL,'pending',0,NULL,NULL,0,20,NULL,0,0,NULL,'losers',NULL,NULL),(20,2,3,4,NULL,NULL,'pending',0,NULL,NULL,0,21,NULL,0,0,NULL,'losers',NULL,NULL),(21,2,4,5,NULL,NULL,'pending',0,NULL,NULL,1,NULL,NULL,0,0,NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `mediaId` int(11) NOT NULL AUTO_INCREMENT,
  `url` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`mediaId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'https://ik.imagekit.io/ghqmiuwd9/1731809426462_img4_SsAiEAv5H.png','image','2024-11-17 02:10:31'),(2,'https://ik.imagekit.io/ghqmiuwd9/1731809474738_mixkit-skilled-basketball-player-shooting-baskets-training-alone-44448-hd-ready_c231imZdE.mp4','video','2024-11-17 02:11:18'),(3,'https://ik.imagekit.io/ghqmiuwd9/1731809789019_img3_KcPk6qNZN.png','image','2024-11-17 02:16:32'),(4,'https://ik.imagekit.io/ghqmiuwd9/1731809807754_img5_btrQ-Fwzf.png','image','2024-11-17 02:16:52'),(5,'https://ik.imagekit.io/ghqmiuwd9/1731809882891_mixkit-men-coming-to-play-soccer-football-4567-hd-ready_K1P-vhQtd.mp4','video','2024-11-17 02:18:09'),(6,'https://ik.imagekit.io/ghqmiuwd9/1731809926992_img3_cjbiy1chT.png','image','2024-11-17 02:18:52');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `playerId` int(11) NOT NULL AUTO_INCREMENT,
  `teamEventId` int(11) NOT NULL,
  `playerName` longtext NOT NULL,
  `position` varchar(255) NOT NULL,
  `medicalCertificate` longtext NOT NULL,
  PRIMARY KEY (`playerId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,2,'CAS-Player 1','Power Forward','https://ik.imagekit.io/ghqmiuwd9/1731769782892_Free-Medical-Certificate-Template_nWZeW9_qA.jpg');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports` (
  `sportsId` int(11) NOT NULL AUTO_INCREMENT,
  `sportsName` longtext NOT NULL,
  `sportsLogo` longtext NOT NULL,
  `description` longtext NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`sportsId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'Basketball','https://ik.imagekit.io/0o9pbzaxk/basketball_XWfc7WLUe.png','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>','2024-10-27 15:14:02'),(2,'Volleyball','https://ik.imagekit.io/0o9pbzaxk/volleyball_GSuKETPBo.png','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>','2024-10-27 15:17:29'),(3,'Soccer','https://ik.imagekit.io/0o9pbzaxk/soccerball-transparent-png-28_JM9txIMUj.png','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>','2024-11-13 06:33:57');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports_events`
--

DROP TABLE IF EXISTS `sports_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports_events` (
  `sportEventsId` int(11) NOT NULL AUTO_INCREMENT,
  `sportsId` int(11) NOT NULL,
  `eventsId` int(11) NOT NULL,
  `bracketType` varchar(255) DEFAULT NULL,
  `coachId` int(11) DEFAULT NULL,
  `maxPlayers` int(11) DEFAULT NULL,
  PRIMARY KEY (`sportEventsId`),
  KEY `fk_sportsEve_idx` (`sportsId`),
  KEY `fk_eventsFk_idx` (`eventsId`),
  CONSTRAINT `fk_eventsFk` FOREIGN KEY (`eventsId`) REFERENCES `events` (`eventId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_sportsEve` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports_events`
--

LOCK TABLES `sports_events` WRITE;
/*!40000 ALTER TABLE `sports_events` DISABLE KEYS */;
INSERT INTO `sports_events` VALUES (1,2,1,'Single Elimination',NULL,10),(2,1,1,'Double Elimination',NULL,10);
/*!40000 ALTER TABLE `sports_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `teamId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `teamName` longtext NOT NULL,
  `teamLogo` longtext DEFAULT NULL,
  `teamCoach` int(11) NOT NULL,
  `dateAdded` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (2,'College of Accountancy and Finance','https://ik.imagekit.io/0o9pbzaxk/caf_u3IB2QHRW.jpg',2,'2024-10-27 10:45:40'),(3,'College of Arts and Sciences','https://ik.imagekit.io/0o9pbzaxk/cas_dJb3exMVd.jpg',3,'2024-10-27 11:25:51'),(4,'College of Business and Management','https://ik.imagekit.io/0o9pbzaxk/cbm_XquvNU8Hu.jpg',5,'2024-10-27 11:36:09'),(5,'College of Criminal Justice Education','https://ik.imagekit.io/0o9pbzaxk/ccje_R3HXqIfDx.jpg',6,'2024-10-27 11:36:52'),(6,'College of Computer Studies','https://ik.imagekit.io/0o9pbzaxk/ccs_c-aP3cNgw.png',7,'2024-10-27 11:39:00'),(7,'College of Health Sciences','https://ik.imagekit.io/0o9pbzaxk/chs_JHFWFMFJQ.jpg',8,'2024-10-27 11:39:43'),(8,'College of Engineering','https://ik.imagekit.io/0o9pbzaxk/coe_2JliI7QeM.png',9,'2024-10-27 11:40:47'),(9,'College of Teacher Education','https://ik.imagekit.io/0o9pbzaxk/cted_So7P0RKUo.jpg',10,'2024-10-27 11:41:38');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams_events`
--

DROP TABLE IF EXISTS `teams_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams_events` (
  `teamEventId` int(11) NOT NULL AUTO_INCREMENT,
  `sportEventsId` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `teamId` int(11) NOT NULL,
  `coachId` int(11) NOT NULL,
  `teamWin` int(11) DEFAULT 0,
  `teamLose` int(11) DEFAULT 0,
  PRIMARY KEY (`teamEventId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams_events`
--

LOCK TABLES `teams_events` WRITE;
/*!40000 ALTER TABLE `teams_events` DISABLE KEYS */;
INSERT INTO `teams_events` VALUES (1,1,'College of Accountancy and Finance',2,2,0,0),(2,1,'College of Arts and Sciences',3,3,0,0),(3,1,'College of Business and Management',4,5,0,1),(4,1,'College of Criminal Justice Education',5,6,1,0),(5,1,'College of Computer Studies',6,7,0,0),(6,1,'College of Health Sciences',7,8,0,0),(7,1,'College of Engineering',8,9,0,0),(8,1,'College of Teacher Education',9,10,0,0),(9,2,'College of Accountancy and Finance',2,2,0,0),(10,2,'College of Arts and Sciences',3,3,0,0),(11,2,'College of Business and Management',4,5,0,1),(12,2,'College of Criminal Justice Education',5,6,1,0),(13,2,'College of Computer Studies',6,7,0,0),(14,2,'College of Health Sciences',7,8,0,0),(15,2,'College of Engineering',8,9,0,0),(16,2,'College of Teacher Education',9,10,0,0);
/*!40000 ALTER TABLE `teams_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Michael_Devs','$2a$10$PGJ4iFiTHQa6lmjifyZyUeFQcBVIXALq00ZzF3CpcBH31dxzOoXq2','SuperAdmin',0,'Active'),(2,'darren','$2a$10$mjCfZeL1cXkNorlsWybBie6QRTul.kztIp3vXGvMNomOGuD.aFNfO','Coach',2,'Active'),(3,'Nick','$2a$10$UVw5HLvCJyg5UzXQ.ofY6uapplP1sGqpIKzWKgSo4SZICERY/6kCC','Coach',3,'Active'),(4,'Admin','$2a$10$I7hrXsymMIzoQQ78hEe.Y.jjEFH373J2j3glP9YCz//mMBYptk2z.','Admin',NULL,'Active'),(5,'James','$2a$10$nZOlNUXoS6gqUDWCOkhOFeFEvWgriuMRoowt167DLD.pjV.bcfqKu','Coach',NULL,'Active'),(6,'Peter','$2a$10$1TZaQTGs8jrxHAbgA991G.VlVcBINOTm.GQBWiSfWSvA241tLtHGW','Coach',NULL,'Active'),(7,'John','$2a$10$mjmurTgpLuN92VQ4G1js5OZfLzm4.8aeZVSPrMMe9G9N91wOYfDkC','Coach',NULL,'Active'),(8,'Juan','$2a$10$4TrC1yn49tU91PuY5n5xTeeEIBpzWvJ7bPqSimEDiZmvEH0cHxLiO','Coach',NULL,'Active'),(9,'Mark','$2a$10$bm9VwNs2JnkUkvrWYE31s.lfvERElV9PDPb/IAmpx/69NfShtibCW','Coach',NULL,'Active'),(10,'George','$2a$10$FF.pk..V3cnq49BW9IdGIOWDn6.3NL9oHkPb3wZs/v4LJtXw8lXju','Coach',NULL,'Active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-23  9:54:53
