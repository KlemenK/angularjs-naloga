-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.6.22-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projekt`
--

DROP TABLE IF EXISTS `projekt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projekt` (
  `idprojekt` int(11) NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(45) DEFAULT NULL,
  `Avtor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idprojekt`),
  UNIQUE KEY `idprojekt_UNIQUE` (`idprojekt`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` VALUES (1,'pika pika','nekdo drug'),(2,'pika poka','kar nekdo'),(3,'poka poka','nekdo'),(4,'cap','carap'),(5,'sdfasd','asaas'),(24,'test proj','test');
/*!40000 ALTER TABLE `projekt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `idtask` int(11) NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(45) DEFAULT NULL,
  `Opis` varchar(250) DEFAULT NULL,
  `Cas_izvedbe` varchar(10) DEFAULT NULL,
  `Prioriteta` int(11) DEFAULT NULL,
  `projekt_idprojekt` int(11) NOT NULL,
  `zaposleni_idzaposleni` int(11) DEFAULT NULL,
  PRIMARY KEY (`idtask`,`projekt_idprojekt`),
  UNIQUE KEY `idtask_UNIQUE` (`idtask`),
  KEY `fk_task_zaposleni_idx` (`zaposleni_idzaposleni`),
  KEY `fk_task_projekt1_idx` (`projekt_idprojekt`),
  CONSTRAINT `fk_task_projekt1` FOREIGN KEY (`projekt_idprojekt`) REFERENCES `projekt` (`idprojekt`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_task_zaposleni` FOREIGN KEY (`zaposleni_idzaposleni`) REFERENCES `zaposleni` (`idzaposleni`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'kreiranje baze','kreiraj bazo na mysql...','nedoločen',3,1,NULL),(2,'front end','izdelava front-end...','nedoločen',2,1,5),(3,'back end','izdelava back-end...','nedoločen',2,1,NULL),(4,'front end','izdelava front-end...','nedoločen',1,2,NULL),(5,'back end','izdelava back-end...','nedoločen',2,2,1),(6,'front end','izdelava front-end...','nedoločen',1,3,3),(7,'back end','izdelava back-end...','nedoločen',3,3,4),(8,'Neki XY task','naredi nekaj xy ......','1h',2,4,5),(9,'tets','dsahgserhsda','1',2,4,5),(10,'sdsdggdsa','dsgasd','1',4,4,5),(11,'dfshdhf','sdfhfsd','2',4,4,5),(12,'testtask','sdagasdgasdg','cas',1,1,NULL),(13,'qwteewrz','werzwerz','wrezwerz',2,2,1),(17,'TEST','ćjadgćkdmngasdg','2',3,1,5),(18,'test task','ačsdgkđsadnmgžsdg','takoj',2,24,NULL);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zaposleni`
--

DROP TABLE IF EXISTS `zaposleni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zaposleni` (
  `idzaposleni` int(11) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(45) NOT NULL,
  `Priimek` varchar(45) NOT NULL,
  PRIMARY KEY (`idzaposleni`),
  UNIQUE KEY `idzaposleni_UNIQUE` (`idzaposleni`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zaposleni`
--

LOCK TABLES `zaposleni` WRITE;
/*!40000 ALTER TABLE `zaposleni` DISABLE KEYS */;
INSERT INTO `zaposleni` VALUES (1,'Johan','johanson'),(2,'Johanwe','ploh'),(3,'georg','bond'),(4,'james','johan'),(5,'Klemen','Kodrič'),(6,'asddaaa','sada'),(7,'test','test1'),(8,'test12','test1234'),(9,'Kekec','Kekčov'),(10,'test12','test123'),(11,'test1245125','test124'),(12,'test2w412','test2135'),(13,'testz','testy');
/*!40000 ALTER TABLE `zaposleni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-13 13:46:48
