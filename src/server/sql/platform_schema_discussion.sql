-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: platform_schema
-- ------------------------------------------------------
-- Server version	5.7.23-log

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
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion` (
  `idDiscussion` varchar(45) NOT NULL,
  `idCourse` int(11) NOT NULL,
  `replayId` varchar(45) DEFAULT NULL,
  `DisName` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `like` int(11) DEFAULT '0',
  `belongId` varchar(45) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDiscussion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
INSERT INTO `discussion` VALUES ('1',1,'0','提问者1','Q1','2023-03-19 13:11:00','Q1是什么',17,'1',1),('1711463337361',1,'0','wyy','怎么没有回复',NULL,NULL,1,'1711463337361',2),('1711464982959',1,'1','wyy','',NULL,'回复内容',1,'1',2),('1711465037257',1,'1','wyy','',NULL,'回复1111',0,'1',2),('1711465059929',1,'1711463337361','wyy','',NULL,'5555',0,'1711463337361',2),('1711465130060',1,'1711463337361','wyy','',NULL,'56233',0,'1711463337361',2),('1712217114691',1,'1','wyy','',NULL,'4444444',0,'1',NULL),('1712217132434',1,'0','wyy','test',NULL,'11111',0,'1712217132434',NULL),('2',1,'1','回答者1','A1','2023-03-20 14:11:00','A1回答',6,'1',3),('3',2,'1','回答者2','A2','2023-03-21 13:11:00','A2回答',5,'1',4),('4',1,'0','提问者2','Q2','2023-03-19 13:11:00','Q2是什么',2,'4',5),('5',1,'4','回答者3','A3','2023-04-19 13:11:00','A3的回答',1,'4',6),('6',1,'2','回答者4','Q4',NULL,'回答Q2',4,'1',7),('7',1,'0','创建者','创建了一个问题',NULL,'这是一个创建的test',0,'7',8);
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-06 22:44:33
