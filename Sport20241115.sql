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
INSERT INTO `brackets` VALUES (1,1,'Single Elimination Bracket',1,'2024-11-13 14:24:08'),(2,2,'Winner Bracket',1,'2024-11-13 17:16:18'),(3,2,'Loser Bracket',1,'2024-11-13 17:16:18'),(4,2,'Final Rematch',1,'2024-11-13 17:16:18');
/*!40000 ALTER TABLE `brackets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `cateogryId` int(11) NOT NULL AUTO_INCREMENT,
  `sportsId` int(11) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `type` enum('single','double') NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cateogryId`),
  KEY `fk_sportsId_idx` (`sportsId`),
  CONSTRAINT `fk_sportsId` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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
-- Table structure for table `match_results`
--

DROP TABLE IF EXISTS `match_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_results` (
  `matchResultsId` int(11) NOT NULL AUTO_INCREMENT,
  `matchId` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT NULL,
  `team2Score` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`matchResultsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_results`
--

LOCK TABLES `match_results` WRITE;
/*!40000 ALTER TABLE `match_results` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_results` ENABLE KEYS */;
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
  `status` enum('scheduled','ongoing','completed') NOT NULL DEFAULT 'scheduled',
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
INSERT INTO `matches` VALUES (1,1,1,1,6,9,'completed',6,'2024-11-17 09:00:00',NULL,0,5,NULL,7,5,NULL,NULL,NULL,NULL),(2,1,1,1,8,7,'completed',7,'2024-11-18 07:00:00',NULL,0,5,NULL,7,11,NULL,NULL,NULL,NULL),(3,1,1,1,3,4,'completed',3,'2024-11-19 00:00:00',NULL,0,6,NULL,9,4,NULL,NULL,NULL,NULL),(4,1,1,1,5,2,'',0,'2024-11-20 02:00:00',NULL,0,6,NULL,0,0,NULL,NULL,NULL,NULL),(5,1,1,2,6,7,'',0,NULL,NULL,0,7,NULL,0,0,NULL,NULL,NULL,NULL),(6,1,1,2,3,NULL,'',0,NULL,NULL,0,7,NULL,0,0,NULL,NULL,NULL,NULL),(7,1,1,3,NULL,NULL,'',0,NULL,NULL,1,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(8,2,2,1,2,3,'completed',3,'2024-11-23 22:00:00',NULL,0,12,13,5,17,NULL,'winners',NULL,NULL),(9,2,2,1,4,5,'',0,'2024-11-24 21:00:00',NULL,0,12,13,0,0,NULL,'winners',NULL,NULL),(10,2,2,1,6,7,'',0,'2024-11-26 02:00:00',NULL,0,14,15,0,0,NULL,'winners',NULL,NULL),(11,2,2,1,8,9,'scheduled',0,'2024-11-26 16:00:00',NULL,0,14,15,0,0,NULL,'winners',NULL,'Court 1'),(12,2,2,2,3,NULL,'',0,NULL,NULL,0,16,17,0,0,NULL,'winners',NULL,NULL),(13,2,3,1,NULL,NULL,'',0,NULL,NULL,0,17,NULL,0,0,NULL,'losers',NULL,NULL),(14,2,2,2,NULL,NULL,'',0,NULL,NULL,0,16,18,0,0,NULL,'winners',NULL,NULL),(15,2,3,1,NULL,NULL,'',0,NULL,NULL,0,18,NULL,0,0,NULL,'losers',NULL,NULL),(16,2,2,3,NULL,NULL,'',0,NULL,NULL,0,21,20,0,0,NULL,'winners',NULL,NULL),(17,2,3,2,NULL,NULL,'',0,NULL,NULL,0,19,NULL,0,0,NULL,'losers',NULL,NULL),(18,2,3,2,NULL,NULL,'',0,NULL,NULL,0,19,NULL,0,0,NULL,'losers',NULL,NULL),(19,2,3,3,NULL,NULL,'',0,NULL,NULL,0,20,NULL,0,0,NULL,'losers',NULL,NULL),(20,2,3,4,NULL,NULL,'',0,NULL,NULL,0,21,NULL,0,0,NULL,'losers',NULL,NULL),(21,2,4,5,NULL,NULL,'',0,NULL,NULL,1,NULL,NULL,0,0,NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `scoreId` int(11) NOT NULL AUTO_INCREMENT,
  `matchId` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `team1_score` int(11) NOT NULL,
  `team2_score` int(11) NOT NULL,
  PRIMARY KEY (`scoreId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scoring_formats`
--

DROP TABLE IF EXISTS `scoring_formats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scoring_formats` (
  `scoringId` int(11) NOT NULL AUTO_INCREMENT,
  `sportsId` int(11) NOT NULL,
  `scoringType` enum('quarter','set','time','goal_based') NOT NULL,
  `periods` int(11) NOT NULL DEFAULT 4,
  PRIMARY KEY (`scoringId`),
  KEY `fk_scoringsports_idx` (`sportsId`),
  CONSTRAINT `fk_scoringsports` FOREIGN KEY (`sportsId`) REFERENCES `sports` (`sportsId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scoring_formats`
--

LOCK TABLES `scoring_formats` WRITE;
/*!40000 ALTER TABLE `scoring_formats` DISABLE KEYS */;
/*!40000 ALTER TABLE `scoring_formats` ENABLE KEYS */;
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
INSERT INTO `sports_events` VALUES (1,1,1,'Single Elimination'),(2,2,1,'Double Elimination');
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
  `teamCoach` longtext NOT NULL,
  `dateAdded` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (2,'College of Accountancy and Finance','https://ik.imagekit.io/0o9pbzaxk/caf_u3IB2QHRW.jpg','John Doe','2024-10-27 10:45:40'),(3,'College of Arts and Sciences','https://ik.imagekit.io/0o9pbzaxk/cas_dJb3exMVd.jpg','Juan Cruz','2024-10-27 11:25:51'),(4,'College of Business and Management','https://ik.imagekit.io/0o9pbzaxk/cbm_XquvNU8Hu.jpg','Jack Ty','2024-10-27 11:36:09'),(5,'College of Criminal Justice Education','https://ik.imagekit.io/0o9pbzaxk/ccje_R3HXqIfDx.jpg','April Cruz','2024-10-27 11:36:52'),(6,'College of Computer Studies','https://ik.imagekit.io/0o9pbzaxk/ccs_c-aP3cNgw.png','Mark Tan','2024-10-27 11:39:00'),(7,'College of Health Sciences','https://ik.imagekit.io/0o9pbzaxk/chs_JHFWFMFJQ.jpg','Nick Javier','2024-10-27 11:39:43'),(8,'College of Engineering','https://ik.imagekit.io/0o9pbzaxk/coe_2JliI7QeM.png','Jose Manalo','2024-10-27 11:40:47'),(9,'College of Teacher Education','https://ik.imagekit.io/0o9pbzaxk/cted_So7P0RKUo.jpg','Angelo Reyes','2024-10-27 11:41:38');
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
  `teamCoach` varchar(255) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `standing` varchar(255) NOT NULL,
  `teamId` int(11) NOT NULL,
  PRIMARY KEY (`teamEventId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams_events`
--

LOCK TABLES `teams_events` WRITE;
/*!40000 ALTER TABLE `teams_events` DISABLE KEYS */;
INSERT INTO `teams_events` VALUES (1,1,'Mark Tan','College of Computer Studies','',6),(2,1,'Jose Manalo','College of Engineering','',8),(3,1,'Juan Cruz','College of Arts and Sciences','',3),(4,1,'April Cruz','College of Criminal Justice Education','',5),(5,1,'Angelo Reyes','College of Teacher Education','',9),(6,1,'Nick Javier','College of Health Sciences','',7),(7,1,'Jack Ty','College of Business and Management','',4),(8,1,'John Doe','College of Accountancy and Finance','',2),(9,2,'John Doe','College of Accountancy and Finance','',2),(10,2,'Jack Ty','College of Business and Management','',4),(11,2,'Mark Tan','College of Computer Studies','',6),(12,2,'Jose Manalo','College of Engineering','',8),(13,2,'Juan Cruz','College of Arts and Sciences','',3),(14,2,'April Cruz','College of Criminal Justice Education','',5),(15,2,'Nick Javier','College of Health Sciences','',7),(16,2,'Angelo Reyes','College of Teacher Education','',9);
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
  `collegeName` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `sportEventId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Michael_Devs','$2a$10$PGJ4iFiTHQa6lmjifyZyUeFQcBVIXALq00ZzF3CpcBH31dxzOoXq2','Naga College Foundation','',0,'',NULL);
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

-- Dump completed on 2024-11-15  9:00:28
