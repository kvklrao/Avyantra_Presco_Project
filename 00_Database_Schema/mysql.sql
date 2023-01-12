-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: avyantra-test.csjxx6cjtity.ap-south-1.rds.amazonaws.com    Database: avyantra_dev
-- ------------------------------------------------------
-- Server version	5.7.38-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Admin_name` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `Contact` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sample1s`
--

DROP TABLE IF EXISTS `Sample1s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sample1s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `babyName` varchar(255) NOT NULL,
  `babyMedRecNo` varchar(255) NOT NULL,
  `babyAdmissionType` varchar(255) NOT NULL,
  `babyPlaceofBirth` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(255) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `data_entry_permission` tinyint(1) DEFAULT '0',
  `score_generation_permission` tinyint(1) DEFAULT '0',
  `deleted_flag` tinyint(1) DEFAULT '0',
  `hospital_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `antibiotics_list`
--

DROP TABLE IF EXISTS `antibiotics_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `antibiotics_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dashboard_users`
--

DROP TABLE IF EXISTS `dashboard_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dashboard_users` (
  `user_id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hospital_id` bigint(20) NOT NULL,
  `hospital_branch_id` bigint(20) NOT NULL,
  `is_super_user` tinyint(1) NOT NULL DEFAULT '0',
  `is_primary_user` tinyint(1) NOT NULL DEFAULT '0',
  `hospital_access` tinyint(1) NOT NULL,
  `branch_access` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dummies`
--

DROP TABLE IF EXISTS `dummies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dummies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `babyName` varchar(255) NOT NULL,
  `babyMedRecNo` varchar(255) NOT NULL,
  `babyAdmissionType` varchar(255) NOT NULL,
  `babyPlaceofBirth` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fungi_list`
--

DROP TABLE IF EXISTS `fungi_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fungi_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gram_negative_bac_list`
--

DROP TABLE IF EXISTS `gram_negative_bac_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gram_negative_bac_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gram_positive_bac_list`
--

DROP TABLE IF EXISTS `gram_positive_bac_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gram_positive_bac_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hospital_wards`
--

DROP TABLE IF EXISTS `hospital_wards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_wards` (
  `ward_id` int(11) NOT NULL AUTO_INCREMENT,
  `ward_name` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ward_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `hospital_branch_name` varchar(255) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_hospital_branch_roles`
--

DROP TABLE IF EXISTS `m_hospital_branch_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_hospital_branch_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `hospital_branch_id` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_hospital_branch_specialities`
--

DROP TABLE IF EXISTS `m_hospital_branch_specialities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_hospital_branch_specialities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `speciality_id` int(11) DEFAULT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `hospital_branch_id` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_hospital_types`
--

DROP TABLE IF EXISTS `m_hospital_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_hospital_types` (
  `hospital_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `hospital_type` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedby` bigint(20) DEFAULT NULL,
  `deleted_flag` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`hospital_type_id`),
  KEY `idx_m_user_type_deleted_flag` (`deleted_flag`),
  KEY `idx_m_user_type_active_flag` (`active_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_hospitals`
--

DROP TABLE IF EXISTS `m_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_hospitals` (
  `hospital_id` int(11) NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_hospitals_branches`
--

DROP TABLE IF EXISTS `m_hospitals_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_hospitals_branches` (
  `hospital_branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `contace_number` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `wards` int(11) DEFAULT NULL,
  PRIMARY KEY (`hospital_branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_permissions`
--

DROP TABLE IF EXISTS `m_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_permissions` (
  `permision_Id` int(11) NOT NULL AUTO_INCREMENT,
  `permission` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`permision_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_referral_doctors`
--

DROP TABLE IF EXISTS `m_referral_doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_referral_doctors` (
  `referral_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `hospital_branch_speciality_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `referral_source` int(1) NOT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(250) DEFAULT NULL,
  `email_address` varchar(250) DEFAULT NULL,
  `doctor_name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`referral_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_referral_opinions`
--

DROP TABLE IF EXISTS `m_referral_opinions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_referral_opinions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_referral_hospital_id` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `opinion` varchar(255) DEFAULT NULL,
  `prescription` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `referral_doctor_id` int(11) DEFAULT NULL,
  `study_id` int(11) DEFAULT NULL,
  `reading` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_roles`
--

DROP TABLE IF EXISTS `m_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_specialities`
--

DROP TABLE IF EXISTS `m_specialities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_specialities` (
  `speciality_id` int(11) NOT NULL AUTO_INCREMENT,
  `speciality` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`speciality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_staffs`
--

DROP TABLE IF EXISTS `m_staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_staffs` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `hospital_branch_speciality_id` int(11) DEFAULT NULL,
  `hospital_branch_role_id` int(11) DEFAULT NULL,
  `reporting_user_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_states`
--

DROP TABLE IF EXISTS `m_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_states` (
  `state_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `state_name` varchar(100) NOT NULL,
  `state_code` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deleted_flag` tinyint(1) NOT NULL DEFAULT '0',
  `active_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`state_id`),
  KEY `idx_m_state_deleted_flag` (`deleted_flag`),
  KEY `idx_m_state_active_flag` (`active_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_status`
--

DROP TABLE IF EXISTS `m_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_status` (
  `status_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `deleted_flag` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_user_coupon_infos`
--

DROP TABLE IF EXISTS `m_user_coupon_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_user_coupon_infos` (
  `user_coupon_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `Coupon_code` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_user_types`
--

DROP TABLE IF EXISTS `m_user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_user_types` (
  `user_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedby` bigint(20) DEFAULT NULL,
  `deleted_flag` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_type_id`),
  KEY `idx_m_user_type_deleted_flag` (`deleted_flag`),
  KEY `idx_m_user_type_active_flag` (`active_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_users`
--

DROP TABLE IF EXISTS `m_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `passcode` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `contact_number` bigint(20) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `parent_user_id` bigint(20) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `profile_pic` varchar(100) DEFAULT NULL,
  `data_entry_permission` tinyint(1) DEFAULT '0',
  `score_generation_permission` tinyint(1) DEFAULT '0',
  `status` varchar(100) DEFAULT NULL,
  `verification_key` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=558 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_users_additional_info`
--

DROP TABLE IF EXISTS `m_users_additional_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_users_additional_info` (
  `user_id` int(11) NOT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `institution_name` varchar(255) DEFAULT NULL,
  `institution_type` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_users_additional_infos`
--

DROP TABLE IF EXISTS `m_users_additional_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_users_additional_infos` (
  `user_id` int(11) NOT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `institution_name` varchar(255) DEFAULT NULL,
  `institution_type` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_users_bkp`
--

DROP TABLE IF EXISTS `m_users_bkp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_users_bkp` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `passcode` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `contact_number` bigint(20) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `parent_user_id` bigint(20) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_referral_files`
--

DROP TABLE IF EXISTS `map_referral_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_referral_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_referral_hospital_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_referral_hospitals`
--

DROP TABLE IF EXISTS `map_referral_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_referral_hospitals` (
  `referral_hospital_id` int(11) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(11) DEFAULT NULL,
  `hospital_branch_id` int(11) DEFAULT NULL,
  `referral_id` int(11) DEFAULT NULL,
  `requester_type` int(11) DEFAULT NULL,
  `hospital_action_status` int(11) DEFAULT NULL,
  `referral_action_status` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `referral_source` int(3) DEFAULT NULL,
  `passcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`referral_hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_staff_hospitals`
--

DROP TABLE IF EXISTS `map_staff_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_staff_hospitals` (
  `staff_hospital_id` int(11) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(11) DEFAULT NULL,
  `hospital_branch_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `permission_id` int(2) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`staff_hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_staff_referral_hospitals`
--

DROP TABLE IF EXISTS `map_staff_referral_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_staff_referral_hospitals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referral_id` int(11) DEFAULT NULL,
  `hospital_branch_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `study_id` int(10) DEFAULT NULL,
  `reading` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_branches`
--

DROP TABLE IF EXISTS `map_user_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_user_branches` (
  `map_user_branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `unique_key` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`map_user_branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_module_permissions`
--

DROP TABLE IF EXISTS `map_user_module_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_user_module_permissions` (
  `user_module_permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_module_permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_permissions`
--

DROP TABLE IF EXISTS `map_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_user_permissions` (
  `user_permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_roles`
--

DROP TABLE IF EXISTS `map_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_user_roles` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `hospital_branch_roles_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_uniquekeys`
--

DROP TABLE IF EXISTS `map_user_uniquekeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_user_uniquekeys` (
  `map_user_unique_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `unique_key` varchar(255) DEFAULT NULL,
  `key_type` varchar(250) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`map_user_unique_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_ward_branches`
--

DROP TABLE IF EXISTS `map_ward_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_ward_branches` (
  `map_ward_branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `ward_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `hospital_id` int(11) DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`map_ward_branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `models` (
  `map_user_branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `unique_key` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_flag` tinyint(1) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `active_flag` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`map_user_branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_antibiotics`
--

DROP TABLE IF EXISTS `patient_baby_antibiotics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_antibiotics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `antibiotic_given` varchar(255) DEFAULT NULL,
  `date_of_administration_of_antiobiotic` varchar(255) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_hours` varchar(255) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` varchar(255) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` varchar(255) DEFAULT NULL,
  `grade_of_antibiotic` varchar(255) DEFAULT NULL,
  `date_of_blood_samples_sent_for_culture_test` varchar(255) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_hours` varchar(255) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` varchar(255) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pba_study_id` (`study_id`),
  KEY `IX_pba_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2594 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_appears_infos`
--

DROP TABLE IF EXISTS `patient_baby_appears_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_appears_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_appearance` varchar(255) DEFAULT NULL,
  `baby_skin_colour` varchar(255) DEFAULT NULL,
  `baby_cry_sound` varchar(255) DEFAULT NULL,
  `baby_cry_sound_status` varchar(255) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` varchar(255) DEFAULT NULL,
  `hypotonia_muscular_response_five_min_after_birth` varchar(255) DEFAULT NULL,
  `excessive_sleeping` varchar(255) DEFAULT NULL,
  `hypothermia` varchar(255) DEFAULT NULL,
  `hypothermia_status_value` varchar(255) DEFAULT NULL,
  `baby_feeding_status` varchar(255) DEFAULT NULL,
  `baby_presence_of_convulsions` varchar(255) DEFAULT NULL,
  `baby_jaundice` varchar(255) DEFAULT NULL,
  `breast_feeding_initiation` varchar(255) DEFAULT NULL,
  `kangaroo_mother_care` varchar(255) DEFAULT NULL,
  `study_id` varchar(255) DEFAULT NULL,
  `umbilical_discharge` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hypothermia_status` varchar(255) DEFAULT NULL,
  `reading` varchar(10) DEFAULT NULL,
  `reading_date` varchar(225) DEFAULT NULL,
  `baby_weight_at_birth` varchar(11) DEFAULT NULL,
  `baby_weight_at_birth_unit` varchar(11) DEFAULT NULL,
  `time_of_reading_hours` varchar(11) DEFAULT NULL,
  `time_of_reading_minute` varchar(11) DEFAULT NULL,
  `umbilical_redness` varchar(255) DEFAULT NULL,
  `umbilical_enduration` varchar(45) CHARACTER SET big5 DEFAULT NULL,
  `skin_pustules` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbai_study_id` (`study_id`),
  KEY `IX_pbai_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2710 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_cns_infos`
--

DROP TABLE IF EXISTS `patient_baby_cns_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_cns_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `features_of_encephalopathy` varchar(255) DEFAULT NULL,
  `seizures` varchar(255) DEFAULT NULL,
  `abnormal_movements_like_tonic_posturing` varchar(255) DEFAULT NULL,
  `af_bulge` varchar(255) DEFAULT NULL,
  `patient_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  `baby_movement` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbci_study_id` (`study_id`),
  KEY `IX_pbci_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2708 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_cv_infos`
--

DROP TABLE IF EXISTS `patient_baby_cv_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_cv_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `heart_rate` varchar(255) DEFAULT NULL,
  `urine_output` varchar(255) DEFAULT NULL,
  `baby_blood_pressure_mean_arterial_bp` varchar(255) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` varchar(255) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` varchar(255) DEFAULT NULL,
  `capillary_refill` varchar(255) DEFAULT NULL,
  `capillary_refill_unit` varchar(255) DEFAULT NULL,
  `low_peripheral_pulse_volume` varchar(255) DEFAULT NULL,
  `cool_peripheries` varchar(255) DEFAULT NULL,
  `two_d_echo_done` varchar(255) DEFAULT NULL,
  `two_d_echo_done_if_yes` varchar(255) DEFAULT NULL,
  `baby_on_ionotropes` varchar(255) DEFAULT NULL,
  `study_id` int(11) DEFAULT NULL,
  `central_line` varchar(255) DEFAULT NULL,
  `skin_pustules` varchar(255) DEFAULT NULL,
  `infusion_of_blood_products` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  `central_line_if_applicable` varchar(255) DEFAULT NULL,
  `central_line_insert_date` varchar(255) DEFAULT NULL,
  `central_line_removed_date` varchar(45) DEFAULT NULL,
  `central_line_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbcvi_study_id` (`study_id`),
  KEY `IX_pbcvi_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2653 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_finals`
--

DROP TABLE IF EXISTS `patient_baby_finals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_finals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `days_of_stay_in_hospital` varchar(255) DEFAULT NULL,
  `final_diagnosis_sepsis` varchar(255) DEFAULT NULL,
  `final_diagnosis_rds` varchar(255) DEFAULT NULL,
  `final_diagnosis_ttnb` varchar(255) DEFAULT NULL,
  `final_diagnosis_jaundice` varchar(255) DEFAULT NULL,
  `final_diagnosis_lbw` varchar(255) DEFAULT NULL,
  `final_diagnosis_lga` varchar(255) DEFAULT NULL,
  `final_diagnosis_aga` varchar(255) DEFAULT NULL,
  `final_diagnosis_sga` varchar(255) DEFAULT NULL,
  `final_diagnosis_anemia` varchar(255) DEFAULT NULL,
  `final_diagnosis_dextochordia` varchar(255) DEFAULT NULL,
  `final_diagnosis_hypoglycemia` varchar(255) DEFAULT NULL,
  `final_diagnosis_hypocalcemia` varchar(255) DEFAULT NULL,
  `final_diagnosis_gastroenteritis` varchar(255) DEFAULT NULL,
  `final_diagnosis_perinatal_respiratory_depression` varchar(255) DEFAULT NULL,
  `final_diagnosis_shock` varchar(255) DEFAULT NULL,
  `final_diagnosis_feeding_intolerence` varchar(255) DEFAULT NULL,
  `baby_discharge_date` varchar(255) DEFAULT NULL,
  `final_diagnosis_pulmonary_hemerrage` varchar(255) DEFAULT NULL,
  `final_diagnosis_thrombocytopenia` varchar(255) DEFAULT NULL,
  `final_diagnosis_eos_los` varchar(255) DEFAULT NULL,
  `final_diagnosis_other` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  `final_diagnosis_meningitis` varchar(255) CHARACTER SET cp850 DEFAULT NULL,
  `final_diagnosis_hypoxia` varchar(255) DEFAULT NULL,
  `final_diagnosis_metabolic_acidosis` varchar(45) DEFAULT NULL,
  `final_diagnosis_asphyxia` varchar(45) DEFAULT NULL,
  `final_diagnosis_endocarditis` varchar(45) DEFAULT NULL,
  `final_diagnosis_peritonitis` varchar(45) DEFAULT NULL,
  `final_diagnosis_soft_tissue_abscess` varchar(45) DEFAULT NULL,
  `final_diagnosis_coagulopathy` varchar(45) DEFAULT NULL,
  `final_diagnosis_uti` varchar(45) DEFAULT NULL,
  `final_diagnosis_umblical_sepsis` varchar(45) DEFAULT NULL,
  `final_diagnosis_bleeding_manifestation` varchar(45) DEFAULT NULL,
  `final_diagnosis_central_peripheral` varchar(45) DEFAULT NULL,
  `final_lga_sga_aga_suspect` varchar(45) DEFAULT NULL,
  `discharge_status` varchar(45) DEFAULT NULL,
  `final_diagnosis_septic_arthritis` varchar(45) DEFAULT NULL,
  `final_diagnosis_pneumonia` varchar(45) DEFAULT NULL,
  `final_diagnosis_seizures` varchar(45) DEFAULT NULL,
  `final_diagnosis_pulmonary_hemorrhage` varchar(45) DEFAULT NULL,
  `final_diagnosis_skin_pustules` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbf_study_id` (`study_id`),
  KEY `IX_pbf_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2456 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_git_infos`
--

DROP TABLE IF EXISTS `patient_baby_git_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_git_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `abdominal_dystension` varchar(255) DEFAULT NULL,
  `frequency_of_stools` varchar(255) DEFAULT NULL,
  `diarrhea` varchar(255) DEFAULT NULL,
  `blood_present_in_stool` varchar(250) DEFAULT NULL,
  `vomiting` varchar(255) DEFAULT NULL,
  `feeding_intolerance` varchar(255) DEFAULT NULL,
  `baby_movement` varchar(255) DEFAULT NULL,
  `patient_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbgi_study_id` (`study_id`),
  KEY `IX_pbgi_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2651 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_global_record`
--

DROP TABLE IF EXISTS `patient_baby_global_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_global_record` (
  `global_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) NOT NULL,
  `reading_id` int(11) NOT NULL,
  `entity_type` varchar(45) DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedate` datetime DEFAULT NULL,
  PRIMARY KEY (`global_record_id`),
  UNIQUE KEY `global_record_id_UNIQUE` (`study_id`,`reading_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_global_records`
--

DROP TABLE IF EXISTS `patient_baby_global_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_global_records` (
  `global_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `reading_id` int(11) DEFAULT NULL,
  `entity_type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `record_complete_flag` varchar(25) DEFAULT NULL,
  `active_flag` bigint(3) DEFAULT '1',
  `deleted_flag` bigint(3) DEFAULT '0',
  `ward_id` int(11) DEFAULT NULL,
  `score` float DEFAULT NULL,
  PRIMARY KEY (`global_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2044 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_investigations`
--

DROP TABLE IF EXISTS `patient_baby_investigations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_investigations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `baby_thyroid_status` varchar(255) DEFAULT NULL,
  `baby_thyroid_result` varchar(255) DEFAULT NULL,
  `baby_blood_glucose` varchar(255) DEFAULT NULL,
  `baby_haemoglobin_levels` varchar(255) DEFAULT NULL,
  `baby_c_reactive_protien_levels` varchar(255) DEFAULT NULL,
  `micro_esr` varchar(255) DEFAULT NULL,
  `baby_procalcitonin_levels` varchar(255) DEFAULT NULL,
  `total_leucocute_count_unit` varchar(255) DEFAULT NULL,
  `total_leucocute_count` varchar(255) DEFAULT NULL,
  `absolute_neutrophil_count` varchar(255) DEFAULT NULL,
  `absolute_neutrophil_count_unit` varchar(255) DEFAULT NULL,
  `immature_to_mature_neutrophil_ratios` varchar(255) DEFAULT NULL,
  `thrombocytopenia_unit` varchar(255) DEFAULT NULL,
  `thrombocytopenia` varchar(255) DEFAULT NULL,
  `urine_rest_for_pus_cells` varchar(255) DEFAULT NULL,
  `urine_culture_test` varchar(255) DEFAULT NULL,
  `blood_culture_report` varchar(255) DEFAULT NULL,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` varchar(255) DEFAULT NULL,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` varchar(255) DEFAULT NULL,
  `fungi` text,
  `other_organism` varchar(255) DEFAULT NULL,
  `antibiotic_status` varchar(255) DEFAULT NULL,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` varchar(255) DEFAULT NULL,
  `potassium` varchar(255) DEFAULT NULL,
  `chlorine` varchar(255) DEFAULT NULL,
  `calcium` varchar(255) DEFAULT NULL,
  `phosphate` varchar(255) DEFAULT NULL,
  `magnesium` varchar(255) DEFAULT NULL,
  `urea` varchar(255) DEFAULT NULL,
  `creatinine` varchar(255) DEFAULT NULL,
  `lactate_levels` varchar(255) DEFAULT NULL,
  `bilirubin_levels` varchar(255) DEFAULT NULL,
  `cord_ph` varchar(255) DEFAULT NULL,
  `arrhythmia` varchar(255) DEFAULT NULL,
  `csf_culture` varchar(255) DEFAULT NULL,
  `csf_culture_tsb_value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `antibiotic_status_value` longtext,
  `reading` varchar(10) DEFAULT NULL,
  `prothrombin_type` varchar(255) DEFAULT NULL,
  `activated_partial_prothrombine_type` varchar(45) DEFAULT NULL,
  `baby_c_reactive_protien_result` varchar(255) DEFAULT NULL,
  `baby_thyroid_t3` varchar(100) DEFAULT NULL,
  `baby_thyroid_t4` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbi_study_id` (`study_id`),
  KEY `IX_pbi_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2602 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_baby_resp_infos`
--

DROP TABLE IF EXISTS `patient_baby_resp_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_baby_resp_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groaning` varchar(255) DEFAULT NULL,
  `grunting` varchar(255) DEFAULT NULL,
  `stridor` varchar(255) DEFAULT NULL,
  `retraction` varchar(255) DEFAULT NULL,
  `fast_breathing` varchar(255) DEFAULT NULL,
  `oxygen_saturation` varchar(255) DEFAULT NULL,
  `breathing_rate` varchar(255) DEFAULT NULL,
  `baby_chest_indrawing` varchar(255) DEFAULT NULL,
  `x_ray_status_done` varchar(255) DEFAULT NULL,
  `x_ray_result` varchar(255) DEFAULT NULL,
  `x_ray_diagnosis_any_other` varchar(255) DEFAULT NULL,
  `x_ray_status` varchar(255) DEFAULT NULL,
  `apnea_status` varchar(255) DEFAULT NULL,
  `apnea_diagnosis` varchar(255) DEFAULT NULL,
  `baby_respiratory_support` varchar(2000) DEFAULT NULL,
  `baby_respiratory_support_if_yes` varchar(255) DEFAULT NULL,
  `study_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pbri_study_id` (`study_id`),
  KEY `IX_pbri_reading` (`reading`)
) ENGINE=InnoDB AUTO_INCREMENT=2741 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_basic_infos`
--

DROP TABLE IF EXISTS `patient_basic_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_basic_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(11) DEFAULT NULL,
  `hospital_type` int(11) NOT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `hospital_branch_id` bigint(11) DEFAULT NULL,
  `hospital_branch_name` varchar(255) DEFAULT NULL,
  `deleted_flag` bigint(3) DEFAULT NULL,
  `active_flag` bigint(3) DEFAULT NULL,
  `baby_medical_record_number` varchar(255) DEFAULT NULL,
  `baby_mother_medical_record_number` varchar(255) DEFAULT NULL,
  `is_update` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_basic_info_hospital_type` (`hospital_type`)
) ENGINE=InnoDB AUTO_INCREMENT=1423 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_file_uploads`
--

DROP TABLE IF EXISTS `patient_file_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_file_uploads` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `document_type` varchar(255) DEFAULT NULL,
  `patient_unique_id` varchar(255) DEFAULT NULL,
  `s3_filename` varchar(255) DEFAULT NULL,
  `uploaded_time_in_s3` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_general_infos`
--

DROP TABLE IF EXISTS `patient_general_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_general_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_ward` varchar(25) DEFAULT NULL,
  `record_type` varchar(255) DEFAULT NULL,
  `baby_admission_type` varchar(255) DEFAULT NULL,
  `baby_birth_date` varchar(255) DEFAULT NULL,
  `study_id` int(11) DEFAULT NULL,
  `baby_place_of_birth_pin_code` varchar(255) DEFAULT NULL,
  `baby_place_of_birth_name` varchar(255) DEFAULT NULL,
  `baby_birth_time_hours` varchar(255) DEFAULT NULL,
  `baby_birth_time_minit` varchar(255) DEFAULT NULL,
  `baby_age_of_admission` varchar(255) DEFAULT NULL,
  `baby_apgar_score_one_min` varchar(255) DEFAULT NULL,
  `baby_apgar_score_five_min` varchar(255) DEFAULT NULL,
  `baby_apgar_score_ten_min` varchar(255) DEFAULT NULL,
  `baby_preterm` varchar(255) DEFAULT NULL,
  `baby_condition_yes_eos_los` varchar(255) DEFAULT NULL,
  `baby_condition_rds_yes_no` varchar(255) DEFAULT NULL,
  `baby_gender` varchar(255) DEFAULT NULL,
  `baby_appear_score` varchar(255) DEFAULT NULL,
  `baby_condition_jaundice_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_ttnb_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_lga_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_aga_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_sga_suspect` varchar(255) DEFAULT NULL,
  `baby_shock_aga_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_dextrocordia_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_anemia_suspect` varchar(255) DEFAULT NULL,
  `baby_condition_lbw_suspect` varchar(255) DEFAULT NULL,
  `mother_age` varchar(255) DEFAULT NULL,
  `place_of_delivery` varchar(255) DEFAULT NULL,
  `birth_facility` varchar(255) DEFAULT NULL,
  `baby_gestational_age` varchar(255) DEFAULT NULL,
  `baby_gestational_age_unit` varchar(255) DEFAULT NULL,
  `baby_weight_at_birth` varchar(255) DEFAULT NULL,
  `baby_condition_suspect` varchar(255) DEFAULT NULL,
  `baby_day_of_event` varchar(255) DEFAULT NULL,
  `baby_weight_at_admission` varchar(255) DEFAULT NULL,
  `baby_condition_other_if_suspect` varchar(255) DEFAULT NULL,
  `prelim_diagnosis_perinatal` varchar(255) DEFAULT NULL,
  `prelim_diagnosis_hypoglycemia` varchar(255) DEFAULT NULL,
  `prelim_diagnosis_hypocalcemia` varchar(255) DEFAULT NULL,
  `prelim_diagnosis_feeding_intolerence` varchar(255) DEFAULT NULL,
  `prelim_diagnosis_gastroenteritis` varchar(255) DEFAULT NULL,
  `baby_weight_at_birth_unit` varchar(255) DEFAULT NULL,
  `baby_weight_at_admission_unit` varchar(255) DEFAULT NULL,
  `baby_date_of_admission` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `updatedBy` int(255) DEFAULT NULL,
  `meningitis` varchar(255) DEFAULT NULL,
  `umblical_sepsis` varchar(255) DEFAULT NULL,
  `skin_pustules` varchar(255) DEFAULT NULL,
  `diagMRDS` varchar(25) DEFAULT NULL,
  `seizures` varchar(255) DEFAULT NULL,
  `bleeding_manifestation` varchar(255) DEFAULT NULL,
  `central_peripheral` varchar(255) DEFAULT NULL,
  `asphyxia` varchar(255) DEFAULT NULL,
  `pneumonia` varchar(255) DEFAULT NULL,
  `peritonitis` varchar(255) DEFAULT NULL,
  `coagulopathy` varchar(255) DEFAULT NULL,
  `soft_tissue_abscess` varchar(255) DEFAULT NULL,
  `endocarditis` varchar(255) DEFAULT NULL,
  `pulmonary_hemorrhage` varchar(255) DEFAULT NULL,
  `thrombocytopenia` varchar(255) DEFAULT NULL,
  `uti` varchar(45) DEFAULT NULL,
  `septic_arthritis` varchar(255) DEFAULT NULL,
  `hypoxia` varchar(255) DEFAULT NULL,
  `metabolic_acidosis` varchar(45) DEFAULT NULL,
  `rupture_time` varchar(45) DEFAULT NULL,
  `baby_lga_sga_aga_suspect` varchar(45) DEFAULT NULL,
  `diagCongenitalHeartDisease` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pgi_study_id` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1683 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_infos`
--

DROP TABLE IF EXISTS `patient_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_infos` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `primary_contact_no` varchar(255) DEFAULT NULL,
  `secondary_contact_no` varchar(255) DEFAULT NULL,
  `Identification_marks` tinytext,
  `pincode` bigint(20) DEFAULT NULL,
  `study_id` bigint(20) DEFAULT NULL,
  `active_flag` int(11) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mothers_img` varchar(45) DEFAULT NULL,
  `educational_level` varchar(45) DEFAULT NULL,
  `medico_legal_case` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `IX_pi_study_id` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1423 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_levels`
--

DROP TABLE IF EXISTS `patient_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` varchar(255) DEFAULT NULL,
  `patient_level` int(11) DEFAULT NULL,
  `is_last` tinyint(1) DEFAULT NULL,
  `tab_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_maternal_infos`
--

DROP TABLE IF EXISTS `patient_maternal_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_maternal_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `mother_age` varchar(255) DEFAULT NULL,
  `mother_weight_unit` varchar(255) DEFAULT NULL,
  `mother_weight` varchar(255) DEFAULT NULL,
  `mother_height` varchar(255) DEFAULT NULL,
  `mother_height_unit` varchar(255) DEFAULT NULL,
  `mother_haemoglobin` varchar(255) DEFAULT NULL,
  `mother_bmi` varchar(255) DEFAULT NULL,
  `maternal_blood_pressure` varchar(255) DEFAULT NULL,
  `maternal_blood_pressure_diastolic` varchar(255) DEFAULT NULL,
  `maternal_diabetes` varchar(255) DEFAULT NULL,
  `maternal_fever` varchar(255) DEFAULT NULL,
  `maternal_fever_unit` varchar(255) DEFAULT NULL,
  `maternal_fever_basic` varchar(255) DEFAULT NULL,
  `maternal_thyroid_function` varchar(255) DEFAULT NULL,
  `maternal_thyroid_function_basic` varchar(255) DEFAULT NULL,
  `maternal_thyroid_function_unit_basic` varchar(255) DEFAULT NULL,
  `maternal_thyroid_function_unit_basic_unit` varchar(255) DEFAULT NULL,
  `more_than_3_vaginal_examinations_during_labor` varchar(255) DEFAULT NULL,
  `rupture_of_membranes_rom_one` varchar(255) DEFAULT NULL,
  `umbilical_discharge` varchar(255) DEFAULT NULL,
  `leaking_pv` varchar(255) DEFAULT NULL,
  `rupture_of_membranes_rom` varchar(255) DEFAULT NULL,
  `smelly_amniotic_fluid` varchar(255) DEFAULT NULL,
  `chorioamnionitis` varchar(255) DEFAULT NULL,
  `gbs_infection` varchar(255) DEFAULT NULL,
  `colonisation_or_urinary_tract_infection` varchar(255) DEFAULT NULL,
  `torch_infections` varchar(255) DEFAULT NULL,
  `type_of_delivery` varchar(255) DEFAULT NULL,
  `delayed_cord_clamping` varchar(255) DEFAULT NULL,
  `vaginal_swab_culture_two` varchar(255) DEFAULT NULL,
  `vaginal_swab_culture_three` varchar(255) DEFAULT NULL,
  `amniotic_fluid_culture` varchar(255) DEFAULT NULL,
  `amniotic_fluid_culture_three` varchar(255) DEFAULT NULL,
  `amniotic_fluid_culture_two` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rupture_of_membranes_rom_two` varchar(255) DEFAULT NULL,
  `vaginal_swab_culture` varchar(255) DEFAULT NULL,
  `maternal_fever_duration` varchar(45) DEFAULT NULL,
  `pih` varchar(45) DEFAULT NULL,
  `maternal_thyroid_t3` varchar(100) DEFAULT NULL,
  `maternal_thyroid_t4` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IX_pmi_study_id` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1388 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_first_name` varchar(255) DEFAULT NULL,
  `patient_last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_id` int(11) DEFAULT NULL,
  `report_type` int(11) DEFAULT NULL,
  `report_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_report_name` (`report_name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sample1s`
--

DROP TABLE IF EXISTS `sample1s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sample1s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `babyName` varchar(255) NOT NULL,
  `babyMedRecNo` varchar(255) NOT NULL,
  `babyAdmissionType` varchar(255) NOT NULL,
  `babyPlaceofBirth` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_asha`
--

DROP TABLE IF EXISTS `sepsis_score_asha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_asha` (
  `id` int(11) NOT NULL DEFAULT '0',
  `sepsis_score` decimal(7,4) NOT NULL DEFAULT '0.0000',
  UNIQUE KEY `idx_baby_study` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_full_params`
--

DROP TABLE IF EXISTS `sepsis_score_full_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_full_params` (
  `id` int(11) NOT NULL DEFAULT '0',
  `hospital_type` int(11) NOT NULL,
  `reading` varchar(10) DEFAULT NULL,
  `sepsis_score` decimal(7,4) NOT NULL DEFAULT '0.0000',
  UNIQUE KEY `idx_study` (`hospital_type`,`id`,`reading`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics`
--

DROP TABLE IF EXISTS `sepsis_score_metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_ADB`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_ADB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_ADB` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_ADB_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_Asha`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_Asha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_Asha` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_Asha_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_LR`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_LR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_LR` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_LR_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_NB`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_NB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_NB` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_NB_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_RF`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_RF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_RF` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_RF_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_SVM_L`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_SVM_L`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_SVM_L` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_SVM_L_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_SVM_P`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_SVM_P`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_SVM_P` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_SVM_P_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_SVM_R`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_SVM_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_SVM_R` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_SVM_R_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_metrics_ritesh`
--

DROP TABLE IF EXISTS `sepsis_score_metrics_ritesh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_metrics_ritesh` (
  `SNO` bigint(20) DEFAULT NULL,
  `Metrics` text,
  `Score` double DEFAULT NULL,
  KEY `ix_sepsis_score_metrics_ritesh_SNO` (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records`
--

DROP TABLE IF EXISTS `sepsis_score_new_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` float DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_ADB`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_ADB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_ADB` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_ADB_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_Asha`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_Asha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_Asha` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` bigint(20) DEFAULT NULL,
  `baby_medical_record_number` text,
  `baby_mother_medical_record_number` text,
  `baby_admission_type` text,
  `baby_place_of_birth_name` text,
  `baby_birth_date` text,
  `baby_birth_time_hours` bigint(20) DEFAULT NULL,
  `baby_birth_time_minit` bigint(20) DEFAULT NULL,
  `baby_age_of_admission` bigint(20) DEFAULT NULL,
  `place_of_delivery` text,
  `birth_facility` text,
  `baby_gestational_age` bigint(20) DEFAULT NULL,
  `baby_weight_at_admission` bigint(20) DEFAULT NULL,
  `baby_weight_at_birth` bigint(20) DEFAULT NULL,
  `baby_preterm` text,
  `baby_date_of_admission` text,
  `mother_weight` bigint(20) DEFAULT NULL,
  `mother_height` bigint(20) DEFAULT NULL,
  `mother_age` bigint(20) DEFAULT NULL,
  `mother_bmi` bigint(20) DEFAULT NULL,
  `maternal_blood_pressure` bigint(20) DEFAULT NULL,
  `maternal_blood_pressure_diastolic` bigint(20) DEFAULT NULL,
  `maternal_diabetes` text,
  `rupture_of_membranes_rom` text,
  `rupture_of_membranes_rom_one` text,
  `rupture_of_membranes_rom_two` bigint(20) DEFAULT NULL,
  `type_of_delivery` text,
  `delayed_cord_clamping` text,
  `baby_appearance` text,
  `breast_feeding_initiation` text,
  `baby_feeding_status` text,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `vomiting` text,
  `abdominal_dystension` text,
  `retraction` text,
  `fast_breathing` text,
  `baby_chest_indrawing` text,
  `baby_movement` text,
  `baby_name` text,
  `mother_name` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_Asha_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_LR`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_LR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_LR` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_LR_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_NB`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_NB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_NB` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_NB_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_RF`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_RF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_RF` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_RF_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_SVM_L`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_SVM_L`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_SVM_L` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_SVM_L_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_SVM_P`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_SVM_P`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_SVM_P` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_SVM_P_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_SVM_R`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_SVM_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_SVM_R` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` bigint(20) DEFAULT NULL,
  `baby_medical_record_number` text,
  `baby_mother_medical_record_number` text,
  `baby_admission_type` text,
  `baby_place_of_birth_name` text,
  `baby_birth_date` text,
  `baby_birth_time_hours` bigint(20) DEFAULT NULL,
  `baby_birth_time_minit` bigint(20) DEFAULT NULL,
  `baby_age_of_admission` bigint(20) DEFAULT NULL,
  `place_of_delivery` text,
  `birth_facility` text,
  `baby_gestational_age` bigint(20) DEFAULT NULL,
  `baby_weight_at_admission` bigint(20) DEFAULT NULL,
  `baby_weight_at_birth` bigint(20) DEFAULT NULL,
  `baby_preterm` text,
  `baby_date_of_admission` text,
  `mother_weight` bigint(20) DEFAULT NULL,
  `mother_height` bigint(20) DEFAULT NULL,
  `mother_age` bigint(20) DEFAULT NULL,
  `mother_bmi` bigint(20) DEFAULT NULL,
  `maternal_blood_pressure` bigint(20) DEFAULT NULL,
  `maternal_blood_pressure_diastolic` bigint(20) DEFAULT NULL,
  `maternal_diabetes` text,
  `rupture_of_membranes_rom` text,
  `rupture_of_membranes_rom_one` text,
  `rupture_of_membranes_rom_two` bigint(20) DEFAULT NULL,
  `type_of_delivery` text,
  `delayed_cord_clamping` text,
  `baby_appearance` text,
  `breast_feeding_initiation` text,
  `baby_feeding_status` text,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `vomiting` text,
  `abdominal_dystension` text,
  `retraction` text,
  `fast_breathing` text,
  `baby_chest_indrawing` text,
  `baby_movement` text,
  `baby_name` text,
  `mother_name` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_SVM_R_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_new_records_stage`
--

DROP TABLE IF EXISTS `sepsis_score_new_records_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_new_records_stage` (
  `index` bigint(20) DEFAULT NULL,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `blood_culture_report` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `sepsis_score` float DEFAULT NULL,
  KEY `ix_sepsis_score_new_records_stage_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records`
--

DROP TABLE IF EXISTS `sepsis_score_old_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` float DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_ADB`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_ADB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_ADB` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_ADB_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_Asha`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_Asha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_Asha` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` bigint(20) DEFAULT NULL,
  `baby_medical_record_number` text,
  `baby_mother_medical_record_number` text,
  `baby_admission_type` text,
  `baby_place_of_birth_name` text,
  `baby_birth_date` text,
  `baby_birth_time_hours` bigint(20) DEFAULT NULL,
  `baby_birth_time_minit` bigint(20) DEFAULT NULL,
  `baby_age_of_admission` bigint(20) DEFAULT NULL,
  `place_of_delivery` text,
  `birth_facility` text,
  `baby_gestational_age` bigint(20) DEFAULT NULL,
  `baby_weight_at_admission` bigint(20) DEFAULT NULL,
  `baby_weight_at_birth` bigint(20) DEFAULT NULL,
  `baby_preterm` text,
  `baby_date_of_admission` text,
  `mother_weight` bigint(20) DEFAULT NULL,
  `mother_height` bigint(20) DEFAULT NULL,
  `mother_age` bigint(20) DEFAULT NULL,
  `mother_bmi` bigint(20) DEFAULT NULL,
  `maternal_blood_pressure` bigint(20) DEFAULT NULL,
  `maternal_blood_pressure_diastolic` bigint(20) DEFAULT NULL,
  `maternal_diabetes` text,
  `rupture_of_membranes_rom` text,
  `rupture_of_membranes_rom_one` text,
  `rupture_of_membranes_rom_two` bigint(20) DEFAULT NULL,
  `type_of_delivery` text,
  `delayed_cord_clamping` text,
  `baby_appearance` text,
  `breast_feeding_initiation` text,
  `baby_feeding_status` text,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `vomiting` text,
  `abdominal_dystension` text,
  `retraction` text,
  `fast_breathing` text,
  `baby_chest_indrawing` text,
  `baby_movement` text,
  `baby_name` text,
  `mother_name` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_Asha_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_LR`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_LR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_LR` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_LR_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_NB`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_NB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_NB` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_NB_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_RF`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_RF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_RF` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_RF_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_SVM_L`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_SVM_L`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_SVM_L` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_SVM_L_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_SVM_P`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_SVM_P`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_SVM_P` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_SVM_P_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_SVM_R`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_SVM_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_SVM_R` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` double DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_SVM_R_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_ritesh`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_ritesh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_ritesh` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` text,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` float DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_ritesh_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sepsis_score_old_records_stage`
--

DROP TABLE IF EXISTS `sepsis_score_old_records_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sepsis_score_old_records_stage` (
  `index` bigint(20) DEFAULT NULL,
  `baby_medical_record_number` text,
  `reading` text,
  `baby_appearance` text,
  `baby_skin_colour` text,
  `baby_cry_sound` text,
  `baby_cry_sound_status` bigint(20) DEFAULT NULL,
  `hypotonia_muscular_response_one_min_after_birth` text,
  `hypotonia_muscular_response_five_min_after_birth` text,
  `excessive_sleeping` text,
  `hypothermia` text,
  `hypothermia_status_value` bigint(20) DEFAULT NULL,
  `baby_feeding_status` text,
  `baby_presence_of_convulsions` text,
  `baby_jaundice` text,
  `breast_feeding_initiation` text,
  `kangaroo_mother_care` text,
  `hypothermia_status` text,
  `groaning` text,
  `grunting` text,
  `stridor` text,
  `retraction` text,
  `fast_breathing` text,
  `oxygen_saturation` bigint(20) DEFAULT NULL,
  `breathing_rate` bigint(20) DEFAULT NULL,
  `baby_chest_indrawing` text,
  `x_ray_status_done` text,
  `x_ray_result` text,
  `x_ray_diagnosis_any_other` text,
  `x_ray_status` text,
  `apnea_status` text,
  `apnea_diagnosis` text,
  `baby_respiratory_support` text,
  `baby_respiratory_support_if_yes` text,
  `heart_rate` bigint(20) DEFAULT NULL,
  `urine_output` text,
  `baby_blood_pressure_mean_arterial_bp` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_upper_limb` bigint(20) DEFAULT NULL,
  `baby_blood_pressure_lower_limb` bigint(20) DEFAULT NULL,
  `capillary_refill` text,
  `capillary_refill_unit` text,
  `low_peripheral_pulse_volume` text,
  `cool_peripheries` text,
  `two_d_echo_done` text,
  `two_d_echo_done_if_yes` text,
  `baby_on_ionotropes` text,
  `central_line` text,
  `skin_pustules` text,
  `infusion_of_blood_products` text,
  `features_of_encephalopathy` text,
  `seizures` text,
  `abnormal_movements_like_tonic_posturing` text,
  `af_bulge` text,
  `patient_id` text,
  `abdominal_dystension` text,
  `frequency_of_stools` bigint(20) DEFAULT NULL,
  `diarrhea` text,
  `vomiting` text,
  `feeding_intolerance` text,
  `baby_movement` text,
  `baby_thyroid_status` text,
  `baby_thyroid_result` bigint(20) DEFAULT NULL,
  `baby_blood_glucose` bigint(20) DEFAULT NULL,
  `baby_haemoglobin_levels` bigint(20) DEFAULT NULL,
  `baby_c_reactive_protien_levels` bigint(20) DEFAULT NULL,
  `micro_esr` bigint(20) DEFAULT NULL,
  `baby_procalcitonin_levels` bigint(20) DEFAULT NULL,
  `total_leucocute_count_unit` text,
  `total_leucocute_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count` bigint(20) DEFAULT NULL,
  `absolute_neutrophil_count_unit` text,
  `immature_to_mature_neutrophil_ratios` text,
  `thrombocytopenia_unit` text,
  `thrombocytopenia` bigint(20) DEFAULT NULL,
  `urine_rest_for_pus_cells` text,
  `urine_culture_test` text,
  `gram_positive_bacteria` text,
  `gram_positive_bacteria_if_other` text,
  `gram_negative_bacteria` text,
  `gram_negative_bacteria_if_other` text,
  `fungi` text,
  `other_organism` text,
  `antibiotic_status` text,
  `antibiotic_status_resisitant` text,
  `antibiotic_status_intermediate` text,
  `sodium` bigint(20) DEFAULT NULL,
  `potassium` bigint(20) DEFAULT NULL,
  `chlorine` bigint(20) DEFAULT NULL,
  `calcium` bigint(20) DEFAULT NULL,
  `phosphate` bigint(20) DEFAULT NULL,
  `magnesium` bigint(20) DEFAULT NULL,
  `urea` bigint(20) DEFAULT NULL,
  `creatinine` bigint(20) DEFAULT NULL,
  `lactate_levels` bigint(20) DEFAULT NULL,
  `bilirubin_levels` bigint(20) DEFAULT NULL,
  `cord_ph` bigint(20) DEFAULT NULL,
  `arrhythmia` text,
  `csf_culture` text,
  `csf_culture_tsb_value` bigint(20) DEFAULT NULL,
  `antibiotic_status_value` text,
  `antibiotic_given` text,
  `date_of_administration_of_antiobiotic` text,
  `time_of_administration_of_antiobiotic_hours` bigint(20) DEFAULT NULL,
  `time_of_administration_of_antiobiotic_minute` bigint(20) DEFAULT NULL,
  `antibiotic_name` text,
  `antibiotic_name_if_other` text,
  `grade_of_antibiotic` text,
  `date_of_blood_samples_sent_for_culture_test` text,
  `time_of_blood_samples_sent_for_culture_test_hours` bigint(20) DEFAULT NULL,
  `time_of_blood_samples_sent_for_culture_test_minute` bigint(20) DEFAULT NULL,
  `blood_sample_taken_prior_to_antiobiotic_administration` text,
  `days_of_stay_in_hospital` bigint(20) DEFAULT NULL,
  `final_diagnosis_sepsis` text,
  `final_diagnosis_rds` text,
  `final_diagnosis_ttnb` text,
  `final_diagnosis_jaundice` text,
  `final_diagnosis_lbw` text,
  `final_diagnosis_lga` text,
  `final_diagnosis_aga` text,
  `final_diagnosis_sga` text,
  `final_diagnosis_anemia` text,
  `final_diagnosis_dextochordia` text,
  `final_diagnosis_hypoglycemia` text,
  `final_diagnosis_hypocalcemia` text,
  `final_diagnosis_gastroenteritis` text,
  `final_diagnosis_perinatal_respiratory_depression` text,
  `final_diagnosis_shock` text,
  `final_diagnosis_feeding_intolerence` text,
  `baby_discharge_date` text,
  `final_diagnosis_pulmonary_hemerrage` text,
  `final_diagnosis_thrombocytopenia` text,
  `final_diagnosis_eos_los` text,
  `final_diagnosis_other` text,
  `blood_culture_report` text,
  `sepsis_score` float DEFAULT NULL,
  KEY `ix_sepsis_score_old_records_stage_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_message_logs`
--

DROP TABLE IF EXISTS `t_message_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_message_logs` (
  `message_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `is_read` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `deleted_date` varchar(255) DEFAULT NULL,
  `active_flag` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`message_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temp_sepsis_predictions`
--

DROP TABLE IF EXISTS `temp_sepsis_predictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temp_sepsis_predictions` (
  `index` bigint(20) DEFAULT NULL,
  `study_id` bigint(20) DEFAULT NULL,
  `blood_culture_report` text,
  `predictions` double DEFAULT NULL,
  `accuracy_score` double DEFAULT NULL,
  KEY `ix_temp_sepsis_predictions_index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tmp_asha_sepsis`
--

DROP TABLE IF EXISTS `tmp_asha_sepsis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tmp_asha_sepsis` (
  `hospital_type` int(11) DEFAULT NULL,
  `study_id` int(11) DEFAULT NULL,
  `sepsis_score_asha` decimal(5,3) DEFAULT NULL,
  UNIQUE KEY `idx_study_id` (`study_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tmp_full_sepsis`
--

DROP TABLE IF EXISTS `tmp_full_sepsis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tmp_full_sepsis` (
  `hospital_type` int(11) DEFAULT NULL,
  `study_id` int(11) DEFAULT NULL,
  `sepsis_score` decimal(5,3) DEFAULT NULL,
  UNIQUE KEY `idx_study_id` (`hospital_type`,`study_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tutorials`
--

DROP TABLE IF EXISTS `tutorials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `vw_get_all_aasha_data`
--

DROP TABLE IF EXISTS `vw_get_all_aasha_data`;
/*!50001 DROP VIEW IF EXISTS `vw_get_all_aasha_data`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_all_aasha_data` AS SELECT
 1 AS `study_id`,
  1 AS `baby_medical_record_number`,
  1 AS `baby_mother_medical_record_number`,
  1 AS `baby_admission_type`,
  1 AS `baby_place_of_birth_name`,
  1 AS `baby_birth_date`,
  1 AS `baby_birth_time_hours`,
  1 AS `baby_birth_time_minit`,
  1 AS `baby_age_of_admission`,
  1 AS `place_of_delivery`,
  1 AS `birth_facility`,
  1 AS `baby_gestational_age`,
  1 AS `baby_weight_at_admission`,
  1 AS `baby_weight_at_birth`,
  1 AS `baby_preterm`,
  1 AS `baby_date_of_admission`,
  1 AS `mother_weight`,
  1 AS `mother_height`,
  1 AS `mother_age`,
  1 AS `mother_bmi`,
  1 AS `maternal_blood_pressure`,
  1 AS `maternal_blood_pressure_diastolic`,
  1 AS `maternal_diabetes`,
  1 AS `rupture_of_membranes_rom`,
  1 AS `rupture_of_membranes_rom_one`,
  1 AS `rupture_of_membranes_rom_two`,
  1 AS `type_of_delivery`,
  1 AS `delayed_cord_clamping`,
  1 AS `baby_appearance`,
  1 AS `breast_feeding_initiation`,
  1 AS `baby_feeding_status`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `urine_output`,
  1 AS `frequency_of_stools`,
  1 AS `vomiting`,
  1 AS `abdominal_dystension`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `baby_chest_indrawing`,
  1 AS `baby_movement`,
  1 AS `baby_name`,
  1 AS `mother_name`,
  1 AS `blood_culture_report` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_all_data`
--

DROP TABLE IF EXISTS `vw_get_all_data`;
/*!50001 DROP VIEW IF EXISTS `vw_get_all_data`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_all_data` AS SELECT
 1 AS `id`,
  1 AS `hospital_name`,
  1 AS `hospital_branch_name`,
  1 AS `study_id`,
  1 AS `baby_medical_record_number`,
  1 AS `baby_mother_medical_record_number`,
  1 AS `record_type`,
  1 AS `baby_admission_type`,
  1 AS `baby_birth_date`,
  1 AS `baby_place_of_birth_pin_code`,
  1 AS `baby_place_of_birth_name`,
  1 AS `baby_birth_time_hours`,
  1 AS `baby_birth_time_minit`,
  1 AS `baby_age_of_admission`,
  1 AS `baby_apgar_score_one_min`,
  1 AS `baby_apgar_score_five_min`,
  1 AS `baby_apgar_score_ten_min`,
  1 AS `baby_preterm`,
  1 AS `baby_condition_yes_eos_los`,
  1 AS `baby_condition_rds_yes_no`,
  1 AS `baby_gender`,
  1 AS `baby_condition_jaundice_suspect`,
  1 AS `baby_condition_ttnb_suspect`,
  1 AS `baby_condition_lga_suspect`,
  1 AS `baby_condition_aga_suspect`,
  1 AS `baby_condition_sga_suspect`,
  1 AS `baby_shock_aga_suspect`,
  1 AS `baby_condition_dextrocordia_suspect`,
  1 AS `baby_condition_anemia_suspect`,
  1 AS `baby_condition_lbw_suspect`,
  1 AS `place_of_delivery`,
  1 AS `birth_facility`,
  1 AS `baby_gestational_age`,
  1 AS `baby_gestational_age_unit`,
  1 AS `baby_weight_at_birth`,
  1 AS `baby_condition_suspect`,
  1 AS `baby_day_of_event`,
  1 AS `baby_weight_at_admission`,
  1 AS `baby_condition_other_if_suspect`,
  1 AS `prelim_diagnosis_perinatal`,
  1 AS `prelim_diagnosis_hypoglycemia`,
  1 AS `prelim_diagnosis_hypocalcemia`,
  1 AS `prelim_diagnosis_feeding_intolerence`,
  1 AS `prelim_diagnosis_gastroenteritis`,
  1 AS `baby_weight_at_birth_unit`,
  1 AS `baby_weight_at_admission_unit`,
  1 AS `baby_date_of_admission`,
  1 AS `mother_weight_unit`,
  1 AS `mother_weight`,
  1 AS `mother_height`,
  1 AS `mother_height_unit`,
  1 AS `mother_haemoglobin`,
  1 AS `mother_bmi`,
  1 AS `maternal_blood_pressure`,
  1 AS `maternal_blood_pressure_diastolic`,
  1 AS `maternal_diabetes`,
  1 AS `maternal_fever`,
  1 AS `maternal_fever_unit`,
  1 AS `maternal_fever_basic`,
  1 AS `maternal_thyroid_function`,
  1 AS `maternal_thyroid_function_basic`,
  1 AS `maternal_thyroid_function_unit_basic`,
  1 AS `maternal_thyroid_function_unit_basic_unit`,
  1 AS `more_than_3_vaginal_examinations_during_labor`,
  1 AS `rupture_of_membranes_rom_one`,
  1 AS `leaking_pv`,
  1 AS `rupture_of_membranes_rom`,
  1 AS `smelly_amniotic_fluid`,
  1 AS `chorioamnionitis`,
  1 AS `gbs_infection`,
  1 AS `colonisation_or_urinary_tract_infection`,
  1 AS `torch_infections`,
  1 AS `type_of_delivery`,
  1 AS `delayed_cord_clamping`,
  1 AS `vaginal_swab_culture_two`,
  1 AS `vaginal_swab_culture_three`,
  1 AS `amniotic_fluid_culture`,
  1 AS `amniotic_fluid_culture_three`,
  1 AS `amniotic_fluid_culture_two`,
  1 AS `rupture_of_membranes_rom_two`,
  1 AS `vaginal_swab_culture`,
  1 AS `mother_age`,
  1 AS `baby_appearance`,
  1 AS `baby_skin_colour`,
  1 AS `baby_cry_sound`,
  1 AS `baby_cry_sound_status`,
  1 AS `hypotonia_muscular_response_one_min_after_birth`,
  1 AS `hypotonia_muscular_response_five_min_after_birth`,
  1 AS `excessive_sleeping`,
  1 AS `hypothermia`,
  1 AS `hypothermia_status_value`,
  1 AS `baby_feeding_status`,
  1 AS `baby_presence_of_convulsions`,
  1 AS `baby_jaundice`,
  1 AS `breast_feeding_initiation`,
  1 AS `kangaroo_mother_care`,
  1 AS `hypothermia_status`,
  1 AS `baby_weight_at_birth_baby_appearance`,
  1 AS `baby_weight_at_birth_unit_baby_appearance`,
  1 AS `umbilical_discharge`,
  1 AS `groaning`,
  1 AS `grunting`,
  1 AS `stridor`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `oxygen_saturation`,
  1 AS `breathing_rate`,
  1 AS `baby_chest_indrawing`,
  1 AS `x_ray_status_done`,
  1 AS `x_ray_result`,
  1 AS `x_ray_diagnosis_any_other`,
  1 AS `x_ray_status`,
  1 AS `apnea_status`,
  1 AS `apnea_diagnosis`,
  1 AS `baby_respiratory_support`,
  1 AS `baby_respiratory_support_if_yes`,
  1 AS `heart_rate`,
  1 AS `urine_output`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `capillary_refill_unit`,
  1 AS `low_peripheral_pulse_volume`,
  1 AS `cool_peripheries`,
  1 AS `two_d_echo_done`,
  1 AS `two_d_echo_done_if_yes`,
  1 AS `baby_on_ionotropes`,
  1 AS `central_line`,
  1 AS `skin_pustules`,
  1 AS `infusion_of_blood_products`,
  1 AS `features_of_encephalopathy`,
  1 AS `seizures`,
  1 AS `abnormal_movements_like_tonic_posturing`,
  1 AS `af_bulge`,
  1 AS `abdominal_dystension`,
  1 AS `frequency_of_stools`,
  1 AS `diarrhea`,
  1 AS `vomiting`,
  1 AS `feeding_intolerance`,
  1 AS `baby_movement`,
  1 AS `baby_thyroid_status`,
  1 AS `baby_thyroid_result`,
  1 AS `baby_blood_glucose`,
  1 AS `baby_haemoglobin_levels`,
  1 AS `baby_c_reactive_protien_levels`,
  1 AS `micro_esr`,
  1 AS `baby_procalcitonin_levels`,
  1 AS `total_leucocute_count_unit`,
  1 AS `total_leucocute_count`,
  1 AS `absolute_neutrophil_count`,
  1 AS `absolute_neutrophil_count_unit`,
  1 AS `immature_to_mature_neutrophil_ratios`,
  1 AS `thrombocytopenia_unit`,
  1 AS `thrombocytopenia`,
  1 AS `urine_rest_for_pus_cells`,
  1 AS `urine_culture_test`,
  1 AS `blood_culture_report`,
  1 AS `gram_positive_bacteria`,
  1 AS `gram_positive_bacteria_if_other`,
  1 AS `gram_negative_bacteria`,
  1 AS `gram_negative_bacteria_if_other`,
  1 AS `fungi`,
  1 AS `other_organism`,
  1 AS `antibiotic_status_resisitant`,
  1 AS `antibiotic_status_intermediate`,
  1 AS `sodium`,
  1 AS `potassium`,
  1 AS `chlorine`,
  1 AS `calcium`,
  1 AS `phosphate`,
  1 AS `magnesium`,
  1 AS `urea`,
  1 AS `creatinine`,
  1 AS `lactate_levels`,
  1 AS `bilirubin_levels`,
  1 AS `cord_ph`,
  1 AS `arrhythmia`,
  1 AS `csf_culture`,
  1 AS `csf_culture_tsb_value`,
  1 AS `antibiotic_status_value`,
  1 AS `antibiotic_given`,
  1 AS `date_of_administration_of_antiobiotic`,
  1 AS `time_of_administration_of_antiobiotic_hours`,
  1 AS `time_of_administration_of_antiobiotic_minute`,
  1 AS `antibiotic_name`,
  1 AS `antibiotic_name_if_other`,
  1 AS `grade_of_antibiotic`,
  1 AS `date_of_blood_samples_sent_for_culture_test`,
  1 AS `time_of_blood_samples_sent_for_culture_test_hours`,
  1 AS `time_of_blood_samples_sent_for_culture_test_minute`,
  1 AS `blood_sample_taken_prior_to_antiobiotic_administration`,
  1 AS `days_of_stay_in_hospital`,
  1 AS `final_diagnosis_sepsis`,
  1 AS `final_diagnosis_rds`,
  1 AS `final_diagnosis_ttnb`,
  1 AS `final_diagnosis_jaundice`,
  1 AS `final_diagnosis_lbw`,
  1 AS `final_diagnosis_lga`,
  1 AS `final_diagnosis_aga`,
  1 AS `final_diagnosis_sga`,
  1 AS `final_diagnosis_anemia`,
  1 AS `final_diagnosis_dextochordia`,
  1 AS `final_diagnosis_hypoglycemia`,
  1 AS `final_diagnosis_hypocalcemia`,
  1 AS `final_diagnosis_gastroenteritis`,
  1 AS `final_diagnosis_perinatal_respiratory_depression`,
  1 AS `final_diagnosis_shock`,
  1 AS `final_diagnosis_feeding_intolerence`,
  1 AS `baby_discharge_date`,
  1 AS `final_diagnosis_eos_los`,
  1 AS `final_diagnosis_other`,
  1 AS `reading`,
  1 AS `reading_date`,
  1 AS `createdAt`,
  1 AS `time_of_reading_hours`,
  1 AS `time_of_reading_minute` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_all_data_1`
--

DROP TABLE IF EXISTS `vw_get_all_data_1`;
/*!50001 DROP VIEW IF EXISTS `vw_get_all_data_1`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_all_data_1` AS SELECT
 1 AS `id`,
  1 AS `hospital_name`,
  1 AS `hospital_branch_name`,
  1 AS `study_id`,
  1 AS `baby_medical_record_number`,
  1 AS `baby_mother_medical_record_number`,
  1 AS `record_type`,
  1 AS `baby_admission_type`,
  1 AS `baby_birth_date`,
  1 AS `baby_place_of_birth_pin_code`,
  1 AS `baby_place_of_birth_name`,
  1 AS `baby_birth_time_hours`,
  1 AS `baby_birth_time_minit`,
  1 AS `baby_age_of_admission`,
  1 AS `baby_apgar_score_one_min`,
  1 AS `baby_apgar_score_five_min`,
  1 AS `baby_apgar_score_ten_min`,
  1 AS `baby_preterm`,
  1 AS `baby_condition_yes_eos_los`,
  1 AS `baby_condition_rds_yes_no`,
  1 AS `baby_gender`,
  1 AS `baby_condition_jaundice_suspect`,
  1 AS `baby_condition_ttnb_suspect`,
  1 AS `baby_condition_lga_suspect`,
  1 AS `baby_condition_aga_suspect`,
  1 AS `baby_condition_sga_suspect`,
  1 AS `baby_shock_aga_suspect`,
  1 AS `baby_condition_dextrocordia_suspect`,
  1 AS `baby_condition_anemia_suspect`,
  1 AS `baby_condition_lbw_suspect`,
  1 AS `place_of_delivery`,
  1 AS `birth_facility`,
  1 AS `baby_gestational_age`,
  1 AS `baby_gestational_age_unit`,
  1 AS `baby_weight_at_birth`,
  1 AS `baby_condition_suspect`,
  1 AS `baby_day_of_event`,
  1 AS `baby_weight_at_admission`,
  1 AS `baby_condition_other_if_suspect`,
  1 AS `prelim_diagnosis_perinatal`,
  1 AS `prelim_diagnosis_hypoglycemia`,
  1 AS `prelim_diagnosis_hypocalcemia`,
  1 AS `prelim_diagnosis_feeding_intolerence`,
  1 AS `prelim_diagnosis_gastroenteritis`,
  1 AS `baby_weight_at_birth_unit`,
  1 AS `baby_weight_at_admission_unit`,
  1 AS `baby_date_of_admission`,
  1 AS `mother_weight_unit`,
  1 AS `mother_weight`,
  1 AS `mother_height`,
  1 AS `mother_height_unit`,
  1 AS `mother_haemoglobin`,
  1 AS `mother_bmi`,
  1 AS `maternal_blood_pressure`,
  1 AS `maternal_blood_pressure_diastolic`,
  1 AS `maternal_diabetes`,
  1 AS `maternal_fever`,
  1 AS `maternal_fever_unit`,
  1 AS `maternal_fever_basic`,
  1 AS `maternal_thyroid_function`,
  1 AS `maternal_thyroid_function_basic`,
  1 AS `maternal_thyroid_function_unit_basic`,
  1 AS `maternal_thyroid_function_unit_basic_unit`,
  1 AS `more_than_3_vaginal_examinations_during_labor`,
  1 AS `rupture_of_membranes_rom_one`,
  1 AS `leaking_pv`,
  1 AS `rupture_of_membranes_rom`,
  1 AS `smelly_amniotic_fluid`,
  1 AS `chorioamnionitis`,
  1 AS `gbs_infection`,
  1 AS `colonisation_or_urinary_tract_infection`,
  1 AS `torch_infections`,
  1 AS `type_of_delivery`,
  1 AS `delayed_cord_clamping`,
  1 AS `vaginal_swab_culture_two`,
  1 AS `vaginal_swab_culture_three`,
  1 AS `amniotic_fluid_culture`,
  1 AS `amniotic_fluid_culture_three`,
  1 AS `amniotic_fluid_culture_two`,
  1 AS `rupture_of_membranes_rom_two`,
  1 AS `vaginal_swab_culture`,
  1 AS `mother_age`,
  1 AS `baby_appearance`,
  1 AS `baby_skin_colour`,
  1 AS `baby_cry_sound`,
  1 AS `baby_cry_sound_status`,
  1 AS `hypotonia_muscular_response_one_min_after_birth`,
  1 AS `hypotonia_muscular_response_five_min_after_birth`,
  1 AS `excessive_sleeping`,
  1 AS `hypothermia`,
  1 AS `hypothermia_status_value`,
  1 AS `baby_feeding_status`,
  1 AS `baby_presence_of_convulsions`,
  1 AS `baby_jaundice`,
  1 AS `breast_feeding_initiation`,
  1 AS `kangaroo_mother_care`,
  1 AS `hypothermia_status`,
  1 AS `baby_weight_at_birth_baby_appearance`,
  1 AS `baby_weight_at_birth_unit_baby_appearance`,
  1 AS `umbilical_discharge`,
  1 AS `groaning`,
  1 AS `grunting`,
  1 AS `stridor`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `oxygen_saturation`,
  1 AS `breathing_rate`,
  1 AS `baby_chest_indrawing`,
  1 AS `x_ray_status_done`,
  1 AS `x_ray_result`,
  1 AS `x_ray_diagnosis_any_other`,
  1 AS `x_ray_status`,
  1 AS `apnea_status`,
  1 AS `apnea_diagnosis`,
  1 AS `baby_respiratory_support`,
  1 AS `baby_respiratory_support_if_yes`,
  1 AS `heart_rate`,
  1 AS `urine_output`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `capillary_refill_unit`,
  1 AS `low_peripheral_pulse_volume`,
  1 AS `cool_peripheries`,
  1 AS `two_d_echo_done`,
  1 AS `two_d_echo_done_if_yes`,
  1 AS `baby_on_ionotropes`,
  1 AS `central_line`,
  1 AS `skin_pustules`,
  1 AS `infusion_of_blood_products`,
  1 AS `features_of_encephalopathy`,
  1 AS `seizures`,
  1 AS `abnormal_movements_like_tonic_posturing`,
  1 AS `af_bulge`,
  1 AS `abdominal_dystension`,
  1 AS `frequency_of_stools`,
  1 AS `diarrhea`,
  1 AS `vomiting`,
  1 AS `feeding_intolerance`,
  1 AS `baby_movement`,
  1 AS `baby_thyroid_status`,
  1 AS `baby_thyroid_result`,
  1 AS `baby_blood_glucose`,
  1 AS `baby_haemoglobin_levels`,
  1 AS `baby_c_reactive_protien_levels`,
  1 AS `micro_esr`,
  1 AS `baby_procalcitonin_levels`,
  1 AS `total_leucocute_count_unit`,
  1 AS `total_leucocute_count`,
  1 AS `absolute_neutrophil_count`,
  1 AS `absolute_neutrophil_count_unit`,
  1 AS `immature_to_mature_neutrophil_ratios`,
  1 AS `thrombocytopenia_unit`,
  1 AS `thrombocytopenia`,
  1 AS `urine_rest_for_pus_cells`,
  1 AS `urine_culture_test`,
  1 AS `blood_culture_report`,
  1 AS `gram_positive_bacteria`,
  1 AS `gram_positive_bacteria_if_other`,
  1 AS `gram_negative_bacteria`,
  1 AS `gram_negative_bacteria_if_other`,
  1 AS `fungi`,
  1 AS `other_organism`,
  1 AS `antibiotic_status_resisitant`,
  1 AS `antibiotic_status_intermediate`,
  1 AS `sodium`,
  1 AS `potassium`,
  1 AS `chlorine`,
  1 AS `calcium`,
  1 AS `phosphate`,
  1 AS `magnesium`,
  1 AS `urea`,
  1 AS `creatinine`,
  1 AS `lactate_levels`,
  1 AS `bilirubin_levels`,
  1 AS `cord_ph`,
  1 AS `arrhythmia`,
  1 AS `csf_culture`,
  1 AS `csf_culture_tsb_value`,
  1 AS `antibiotic_status_value`,
  1 AS `antibiotic_given`,
  1 AS `date_of_administration_of_antiobiotic`,
  1 AS `time_of_administration_of_antiobiotic_hours`,
  1 AS `time_of_administration_of_antiobiotic_minute`,
  1 AS `antibiotic_name`,
  1 AS `antibiotic_name_if_other`,
  1 AS `grade_of_antibiotic`,
  1 AS `date_of_blood_samples_sent_for_culture_test`,
  1 AS `time_of_blood_samples_sent_for_culture_test_hours`,
  1 AS `time_of_blood_samples_sent_for_culture_test_minute`,
  1 AS `blood_sample_taken_prior_to_antiobiotic_administration`,
  1 AS `days_of_stay_in_hospital`,
  1 AS `final_diagnosis_sepsis`,
  1 AS `final_diagnosis_rds`,
  1 AS `final_diagnosis_ttnb`,
  1 AS `final_diagnosis_jaundice`,
  1 AS `final_diagnosis_lbw`,
  1 AS `final_diagnosis_lga`,
  1 AS `final_diagnosis_aga`,
  1 AS `final_diagnosis_sga`,
  1 AS `final_diagnosis_anemia`,
  1 AS `final_diagnosis_dextochordia`,
  1 AS `final_diagnosis_hypoglycemia`,
  1 AS `final_diagnosis_hypocalcemia`,
  1 AS `final_diagnosis_gastroenteritis`,
  1 AS `final_diagnosis_perinatal_respiratory_depression`,
  1 AS `final_diagnosis_shock`,
  1 AS `final_diagnosis_feeding_intolerence`,
  1 AS `baby_discharge_date`,
  1 AS `final_diagnosis_eos_los`,
  1 AS `final_diagnosis_other`,
  1 AS `reading`,
  1 AS `reading_date`,
  1 AS `createdAt`,
  1 AS `time_of_reading_hours`,
  1 AS `time_of_reading_minute` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_generated_score`
--

DROP TABLE IF EXISTS `vw_get_generated_score`;
/*!50001 DROP VIEW IF EXISTS `vw_get_generated_score`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_generated_score` AS SELECT
 1 AS `study_id`,
  1 AS `reading`,
  1 AS `sepsis_score`,
  1 AS `record_flag` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_ml_data`
--

DROP TABLE IF EXISTS `vw_get_ml_data`;
/*!50001 DROP VIEW IF EXISTS `vw_get_ml_data`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_ml_data` AS SELECT
 1 AS `study_id`,
  1 AS `baby_medical_record_number`,
  1 AS `reading`,
  1 AS `baby_appearance`,
  1 AS `baby_skin_colour`,
  1 AS `baby_cry_sound`,
  1 AS `baby_cry_sound_status`,
  1 AS `hypotonia_muscular_response_one_min_after_birth`,
  1 AS `hypotonia_muscular_response_five_min_after_birth`,
  1 AS `excessive_sleeping`,
  1 AS `hypothermia`,
  1 AS `hypothermia_status_value`,
  1 AS `baby_feeding_status`,
  1 AS `baby_presence_of_convulsions`,
  1 AS `baby_jaundice`,
  1 AS `breast_feeding_initiation`,
  1 AS `kangaroo_mother_care`,
  1 AS `hypothermia_status`,
  1 AS `groaning`,
  1 AS `grunting`,
  1 AS `stridor`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `oxygen_saturation`,
  1 AS `breathing_rate`,
  1 AS `baby_chest_indrawing`,
  1 AS `x_ray_status_done`,
  1 AS `x_ray_result`,
  1 AS `x_ray_diagnosis_any_other`,
  1 AS `x_ray_status`,
  1 AS `apnea_status`,
  1 AS `apnea_diagnosis`,
  1 AS `baby_respiratory_support`,
  1 AS `baby_respiratory_support_if_yes`,
  1 AS `heart_rate`,
  1 AS `urine_output`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `capillary_refill`,
  1 AS `capillary_refill_unit`,
  1 AS `low_peripheral_pulse_volume`,
  1 AS `cool_peripheries`,
  1 AS `two_d_echo_done`,
  1 AS `two_d_echo_done_if_yes`,
  1 AS `baby_on_ionotropes`,
  1 AS `central_line`,
  1 AS `skin_pustules`,
  1 AS `infusion_of_blood_products`,
  1 AS `features_of_encephalopathy`,
  1 AS `seizures`,
  1 AS `abnormal_movements_like_tonic_posturing`,
  1 AS `af_bulge`,
  1 AS `patient_id`,
  1 AS `abdominal_dystension`,
  1 AS `frequency_of_stools`,
  1 AS `diarrhea`,
  1 AS `vomiting`,
  1 AS `feeding_intolerance`,
  1 AS `baby_movement`,
  1 AS `baby_thyroid_status`,
  1 AS `baby_thyroid_result`,
  1 AS `baby_blood_glucose`,
  1 AS `baby_haemoglobin_levels`,
  1 AS `baby_c_reactive_protien_levels`,
  1 AS `micro_esr`,
  1 AS `baby_procalcitonin_levels`,
  1 AS `total_leucocute_count_unit`,
  1 AS `total_leucocute_count`,
  1 AS `absolute_neutrophil_count`,
  1 AS `absolute_neutrophil_count_unit`,
  1 AS `immature_to_mature_neutrophil_ratios`,
  1 AS `thrombocytopenia_unit`,
  1 AS `thrombocytopenia`,
  1 AS `urine_rest_for_pus_cells`,
  1 AS `urine_culture_test`,
  1 AS `blood_culture_report`,
  1 AS `gram_positive_bacteria`,
  1 AS `gram_positive_bacteria_if_other`,
  1 AS `gram_negative_bacteria`,
  1 AS `gram_negative_bacteria_if_other`,
  1 AS `fungi`,
  1 AS `other_organism`,
  1 AS `antibiotic_status`,
  1 AS `antibiotic_status_resisitant`,
  1 AS `antibiotic_status_intermediate`,
  1 AS `sodium`,
  1 AS `potassium`,
  1 AS `chlorine`,
  1 AS `calcium`,
  1 AS `phosphate`,
  1 AS `magnesium`,
  1 AS `urea`,
  1 AS `creatinine`,
  1 AS `lactate_levels`,
  1 AS `bilirubin_levels`,
  1 AS `cord_ph`,
  1 AS `arrhythmia`,
  1 AS `csf_culture`,
  1 AS `csf_culture_tsb_value`,
  1 AS `antibiotic_status_value`,
  1 AS `antibiotic_given`,
  1 AS `date_of_administration_of_antiobiotic`,
  1 AS `time_of_administration_of_antiobiotic_hours`,
  1 AS `time_of_administration_of_antiobiotic_minute`,
  1 AS `antibiotic_name`,
  1 AS `antibiotic_name_if_other`,
  1 AS `grade_of_antibiotic`,
  1 AS `date_of_blood_samples_sent_for_culture_test`,
  1 AS `time_of_blood_samples_sent_for_culture_test_hours`,
  1 AS `time_of_blood_samples_sent_for_culture_test_minute`,
  1 AS `blood_sample_taken_prior_to_antiobiotic_administration`,
  1 AS `days_of_stay_in_hospital`,
  1 AS `final_diagnosis_sepsis`,
  1 AS `final_diagnosis_rds`,
  1 AS `final_diagnosis_ttnb`,
  1 AS `final_diagnosis_jaundice`,
  1 AS `final_diagnosis_lbw`,
  1 AS `final_diagnosis_lga`,
  1 AS `final_diagnosis_aga`,
  1 AS `final_diagnosis_sga`,
  1 AS `final_diagnosis_anemia`,
  1 AS `final_diagnosis_dextochordia`,
  1 AS `final_diagnosis_hypoglycemia`,
  1 AS `final_diagnosis_hypocalcemia`,
  1 AS `final_diagnosis_gastroenteritis`,
  1 AS `final_diagnosis_perinatal_respiratory_depression`,
  1 AS `final_diagnosis_shock`,
  1 AS `final_diagnosis_feeding_intolerence`,
  1 AS `baby_discharge_date`,
  1 AS `final_diagnosis_pulmonary_hemerrage`,
  1 AS `final_diagnosis_thrombocytopenia`,
  1 AS `final_diagnosis_eos_los`,
  1 AS `final_diagnosis_other` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_ml_data_old`
--

DROP TABLE IF EXISTS `vw_get_ml_data_old`;
/*!50001 DROP VIEW IF EXISTS `vw_get_ml_data_old`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_ml_data_old` AS SELECT
 1 AS `study_id`,
  1 AS `baby_medical_record_number`,
  1 AS `reading`,
  1 AS `baby_appearance`,
  1 AS `baby_skin_colour`,
  1 AS `baby_cry_sound`,
  1 AS `baby_cry_sound_status`,
  1 AS `hypotonia_muscular_response_one_min_after_birth`,
  1 AS `hypotonia_muscular_response_five_min_after_birth`,
  1 AS `excessive_sleeping`,
  1 AS `hypothermia`,
  1 AS `hypothermia_status_value`,
  1 AS `baby_feeding_status`,
  1 AS `baby_presence_of_convulsions`,
  1 AS `baby_jaundice`,
  1 AS `breast_feeding_initiation`,
  1 AS `kangaroo_mother_care`,
  1 AS `hypothermia_status`,
  1 AS `groaning`,
  1 AS `grunting`,
  1 AS `stridor`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `oxygen_saturation`,
  1 AS `breathing_rate`,
  1 AS `baby_chest_indrawing`,
  1 AS `x_ray_status_done`,
  1 AS `x_ray_result`,
  1 AS `x_ray_diagnosis_any_other`,
  1 AS `x_ray_status`,
  1 AS `apnea_status`,
  1 AS `apnea_diagnosis`,
  1 AS `baby_respiratory_support`,
  1 AS `baby_respiratory_support_if_yes`,
  1 AS `heart_rate`,
  1 AS `urine_output`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `capillary_refill`,
  1 AS `capillary_refill_unit`,
  1 AS `low_peripheral_pulse_volume`,
  1 AS `cool_peripheries`,
  1 AS `two_d_echo_done`,
  1 AS `two_d_echo_done_if_yes`,
  1 AS `baby_on_ionotropes`,
  1 AS `central_line`,
  1 AS `skin_pustules`,
  1 AS `infusion_of_blood_products`,
  1 AS `features_of_encephalopathy`,
  1 AS `seizures`,
  1 AS `abnormal_movements_like_tonic_posturing`,
  1 AS `af_bulge`,
  1 AS `patient_id`,
  1 AS `abdominal_dystension`,
  1 AS `frequency_of_stools`,
  1 AS `diarrhea`,
  1 AS `vomiting`,
  1 AS `feeding_intolerance`,
  1 AS `baby_movement`,
  1 AS `baby_thyroid_status`,
  1 AS `baby_thyroid_result`,
  1 AS `baby_blood_glucose`,
  1 AS `baby_haemoglobin_levels`,
  1 AS `baby_c_reactive_protien_levels`,
  1 AS `micro_esr`,
  1 AS `baby_procalcitonin_levels`,
  1 AS `total_leucocute_count_unit`,
  1 AS `total_leucocute_count`,
  1 AS `absolute_neutrophil_count`,
  1 AS `absolute_neutrophil_count_unit`,
  1 AS `immature_to_mature_neutrophil_ratios`,
  1 AS `thrombocytopenia_unit`,
  1 AS `thrombocytopenia`,
  1 AS `urine_rest_for_pus_cells`,
  1 AS `urine_culture_test`,
  1 AS `blood_culture_report`,
  1 AS `gram_positive_bacteria`,
  1 AS `gram_positive_bacteria_if_other`,
  1 AS `gram_negative_bacteria`,
  1 AS `gram_negative_bacteria_if_other`,
  1 AS `fungi`,
  1 AS `other_organism`,
  1 AS `antibiotic_status`,
  1 AS `antibiotic_status_resisitant`,
  1 AS `antibiotic_status_intermediate`,
  1 AS `sodium`,
  1 AS `potassium`,
  1 AS `chlorine`,
  1 AS `calcium`,
  1 AS `phosphate`,
  1 AS `magnesium`,
  1 AS `urea`,
  1 AS `creatinine`,
  1 AS `lactate_levels`,
  1 AS `bilirubin_levels`,
  1 AS `cord_ph`,
  1 AS `arrhythmia`,
  1 AS `csf_culture`,
  1 AS `csf_culture_tsb_value`,
  1 AS `antibiotic_status_value`,
  1 AS `antibiotic_given`,
  1 AS `date_of_administration_of_antiobiotic`,
  1 AS `time_of_administration_of_antiobiotic_hours`,
  1 AS `time_of_administration_of_antiobiotic_minute`,
  1 AS `antibiotic_name`,
  1 AS `antibiotic_name_if_other`,
  1 AS `grade_of_antibiotic`,
  1 AS `date_of_blood_samples_sent_for_culture_test`,
  1 AS `time_of_blood_samples_sent_for_culture_test_hours`,
  1 AS `time_of_blood_samples_sent_for_culture_test_minute`,
  1 AS `blood_sample_taken_prior_to_antiobiotic_administration`,
  1 AS `days_of_stay_in_hospital`,
  1 AS `final_diagnosis_sepsis`,
  1 AS `final_diagnosis_rds`,
  1 AS `final_diagnosis_ttnb`,
  1 AS `final_diagnosis_jaundice`,
  1 AS `final_diagnosis_lbw`,
  1 AS `final_diagnosis_lga`,
  1 AS `final_diagnosis_aga`,
  1 AS `final_diagnosis_sga`,
  1 AS `final_diagnosis_anemia`,
  1 AS `final_diagnosis_dextochordia`,
  1 AS `final_diagnosis_hypoglycemia`,
  1 AS `final_diagnosis_hypocalcemia`,
  1 AS `final_diagnosis_gastroenteritis`,
  1 AS `final_diagnosis_perinatal_respiratory_depression`,
  1 AS `final_diagnosis_shock`,
  1 AS `final_diagnosis_feeding_intolerence`,
  1 AS `baby_discharge_date`,
  1 AS `final_diagnosis_pulmonary_hemerrage`,
  1 AS `final_diagnosis_thrombocytopenia`,
  1 AS `final_diagnosis_eos_los`,
  1 AS `final_diagnosis_other` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_ml_data_ritesh`
--

DROP TABLE IF EXISTS `vw_get_ml_data_ritesh`;
/*!50001 DROP VIEW IF EXISTS `vw_get_ml_data_ritesh`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_ml_data_ritesh` AS SELECT
 1 AS `study_id`,
  1 AS `baby_medical_record_number`,
  1 AS `reading`,
  1 AS `baby_appearance`,
  1 AS `baby_skin_colour`,
  1 AS `baby_cry_sound`,
  1 AS `baby_cry_sound_status`,
  1 AS `hypotonia_muscular_response_one_min_after_birth`,
  1 AS `hypotonia_muscular_response_five_min_after_birth`,
  1 AS `excessive_sleeping`,
  1 AS `hypothermia`,
  1 AS `hypothermia_status_value`,
  1 AS `baby_feeding_status`,
  1 AS `baby_presence_of_convulsions`,
  1 AS `baby_jaundice`,
  1 AS `breast_feeding_initiation`,
  1 AS `kangaroo_mother_care`,
  1 AS `hypothermia_status`,
  1 AS `groaning`,
  1 AS `grunting`,
  1 AS `stridor`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `oxygen_saturation`,
  1 AS `breathing_rate`,
  1 AS `baby_chest_indrawing`,
  1 AS `x_ray_status_done`,
  1 AS `x_ray_result`,
  1 AS `x_ray_diagnosis_any_other`,
  1 AS `x_ray_status`,
  1 AS `apnea_status`,
  1 AS `apnea_diagnosis`,
  1 AS `baby_respiratory_support`,
  1 AS `baby_respiratory_support_if_yes`,
  1 AS `heart_rate`,
  1 AS `urine_output`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `capillary_refill`,
  1 AS `capillary_refill_unit`,
  1 AS `low_peripheral_pulse_volume`,
  1 AS `cool_peripheries`,
  1 AS `two_d_echo_done`,
  1 AS `two_d_echo_done_if_yes`,
  1 AS `baby_on_ionotropes`,
  1 AS `central_line`,
  1 AS `skin_pustules`,
  1 AS `infusion_of_blood_products`,
  1 AS `features_of_encephalopathy`,
  1 AS `seizures`,
  1 AS `abnormal_movements_like_tonic_posturing`,
  1 AS `af_bulge`,
  1 AS `patient_id`,
  1 AS `abdominal_dystension`,
  1 AS `frequency_of_stools`,
  1 AS `diarrhea`,
  1 AS `vomiting`,
  1 AS `feeding_intolerance`,
  1 AS `baby_movement`,
  1 AS `baby_thyroid_status`,
  1 AS `baby_thyroid_result`,
  1 AS `baby_blood_glucose`,
  1 AS `baby_haemoglobin_levels`,
  1 AS `baby_c_reactive_protien_levels`,
  1 AS `micro_esr`,
  1 AS `baby_procalcitonin_levels`,
  1 AS `total_leucocute_count_unit`,
  1 AS `total_leucocute_count`,
  1 AS `absolute_neutrophil_count`,
  1 AS `absolute_neutrophil_count_unit`,
  1 AS `immature_to_mature_neutrophil_ratios`,
  1 AS `thrombocytopenia_unit`,
  1 AS `thrombocytopenia`,
  1 AS `urine_rest_for_pus_cells`,
  1 AS `urine_culture_test`,
  1 AS `blood_culture_report`,
  1 AS `gram_positive_bacteria`,
  1 AS `gram_positive_bacteria_if_other`,
  1 AS `gram_negative_bacteria`,
  1 AS `gram_negative_bacteria_if_other`,
  1 AS `fungi`,
  1 AS `other_organism`,
  1 AS `antibiotic_status`,
  1 AS `antibiotic_status_resisitant`,
  1 AS `antibiotic_status_intermediate`,
  1 AS `sodium`,
  1 AS `potassium`,
  1 AS `chlorine`,
  1 AS `calcium`,
  1 AS `phosphate`,
  1 AS `magnesium`,
  1 AS `urea`,
  1 AS `creatinine`,
  1 AS `lactate_levels`,
  1 AS `bilirubin_levels`,
  1 AS `cord_ph`,
  1 AS `arrhythmia`,
  1 AS `csf_culture`,
  1 AS `csf_culture_tsb_value`,
  1 AS `antibiotic_status_value`,
  1 AS `antibiotic_given`,
  1 AS `date_of_administration_of_antiobiotic`,
  1 AS `time_of_administration_of_antiobiotic_hours`,
  1 AS `time_of_administration_of_antiobiotic_minute`,
  1 AS `antibiotic_name`,
  1 AS `antibiotic_name_if_other`,
  1 AS `grade_of_antibiotic`,
  1 AS `date_of_blood_samples_sent_for_culture_test`,
  1 AS `time_of_blood_samples_sent_for_culture_test_hours`,
  1 AS `time_of_blood_samples_sent_for_culture_test_minute`,
  1 AS `blood_sample_taken_prior_to_antiobiotic_administration`,
  1 AS `days_of_stay_in_hospital`,
  1 AS `final_diagnosis_sepsis`,
  1 AS `final_diagnosis_rds`,
  1 AS `final_diagnosis_ttnb`,
  1 AS `final_diagnosis_jaundice`,
  1 AS `final_diagnosis_lbw`,
  1 AS `final_diagnosis_lga`,
  1 AS `final_diagnosis_aga`,
  1 AS `final_diagnosis_sga`,
  1 AS `final_diagnosis_anemia`,
  1 AS `final_diagnosis_dextochordia`,
  1 AS `final_diagnosis_hypoglycemia`,
  1 AS `final_diagnosis_hypocalcemia`,
  1 AS `final_diagnosis_gastroenteritis`,
  1 AS `final_diagnosis_perinatal_respiratory_depression`,
  1 AS `final_diagnosis_shock`,
  1 AS `final_diagnosis_feeding_intolerence`,
  1 AS `baby_discharge_date`,
  1 AS `final_diagnosis_pulmonary_hemerrage`,
  1 AS `final_diagnosis_thrombocytopenia`,
  1 AS `final_diagnosis_eos_los`,
  1 AS `final_diagnosis_other` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_get_staffs`
--

DROP TABLE IF EXISTS `vw_get_staffs`;
/*!50001 DROP VIEW IF EXISTS `vw_get_staffs`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_get_staffs` AS SELECT
 1 AS `hospital_id`,
  1 AS `hospital_branch_id`,
  1 AS `staff_id`,
  1 AS `first_name`,
  1 AS `last_name`,
  1 AS `hospital_branch_speciality_id`,
  1 AS `user_id`,
  1 AS `hospital_branch_role_id`,
  1 AS `contact_number`,
  1 AS `email_address`,
  1 AS `speciality_id`,
  1 AS `speciality`,
  1 AS `role_id`,
  1 AS `role`,
  1 AS `status`,
  1 AS `user_name`,
  1 AS `reporting_user_id`,
  1 AS `password`,
  1 AS `deleted_flag`,
  1 AS `branch_name` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_ml`
--

DROP TABLE IF EXISTS `vw_ml`;
/*!50001 DROP VIEW IF EXISTS `vw_ml`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_ml` AS SELECT
 1 AS `baby_medical_record_number`,
  1 AS `reading`,
  1 AS `baby_appearance`,
  1 AS `baby_skin_colour`,
  1 AS `baby_cry_sound`,
  1 AS `baby_cry_sound_status`,
  1 AS `hypotonia_muscular_response_one_min_after_birth`,
  1 AS `hypotonia_muscular_response_five_min_after_birth`,
  1 AS `excessive_sleeping`,
  1 AS `hypothermia`,
  1 AS `hypothermia_status_value`,
  1 AS `baby_feeding_status`,
  1 AS `baby_presence_of_convulsions`,
  1 AS `baby_jaundice`,
  1 AS `breast_feeding_initiation`,
  1 AS `kangaroo_mother_care`,
  1 AS `hypothermia_status`,
  1 AS `groaning`,
  1 AS `grunting`,
  1 AS `stridor`,
  1 AS `retraction`,
  1 AS `fast_breathing`,
  1 AS `oxygen_saturation`,
  1 AS `breathing_rate`,
  1 AS `baby_chest_indrawing`,
  1 AS `x_ray_status_done`,
  1 AS `x_ray_result`,
  1 AS `x_ray_diagnosis_any_other`,
  1 AS `x_ray_status`,
  1 AS `apnea_status`,
  1 AS `apnea_diagnosis`,
  1 AS `baby_respiratory_support`,
  1 AS `baby_respiratory_support_if_yes`,
  1 AS `heart_rate`,
  1 AS `urine_output`,
  1 AS `baby_blood_pressure_mean_arterial_bp`,
  1 AS `baby_blood_pressure_upper_limb`,
  1 AS `baby_blood_pressure_lower_limb`,
  1 AS `capillary_refill`,
  1 AS `capillary_refill_unit`,
  1 AS `low_peripheral_pulse_volume`,
  1 AS `cool_peripheries`,
  1 AS `two_d_echo_done`,
  1 AS `two_d_echo_done_if_yes`,
  1 AS `baby_on_ionotropes`,
  1 AS `central_line`,
  1 AS `skin_pustules`,
  1 AS `infusion_of_blood_products`,
  1 AS `features_of_encephalopathy`,
  1 AS `seizures`,
  1 AS `abnormal_movements_like_tonic_posturing`,
  1 AS `af_bulge`,
  1 AS `patient_id`,
  1 AS `abdominal_dystension`,
  1 AS `frequency_of_stools`,
  1 AS `diarrhea`,
  1 AS `vomiting`,
  1 AS `feeding_intolerance`,
  1 AS `baby_movement`,
  1 AS `baby_thyroid_status`,
  1 AS `baby_thyroid_result`,
  1 AS `baby_blood_glucose`,
  1 AS `baby_haemoglobin_levels`,
  1 AS `baby_c_reactive_protien_levels`,
  1 AS `micro_esr`,
  1 AS `baby_procalcitonin_levels`,
  1 AS `total_leucocute_count_unit`,
  1 AS `total_leucocute_count`,
  1 AS `absolute_neutrophil_count`,
  1 AS `absolute_neutrophil_count_unit`,
  1 AS `immature_to_mature_neutrophil_ratios`,
  1 AS `thrombocytopenia_unit`,
  1 AS `thrombocytopenia`,
  1 AS `urine_rest_for_pus_cells`,
  1 AS `urine_culture_test`,
  1 AS `blood_culture_report`,
  1 AS `gram_positive_bacteria`,
  1 AS `gram_positive_bacteria_if_other`,
  1 AS `gram_negative_bacteria`,
  1 AS `gram_negative_bacteria_if_other`,
  1 AS `fungi`,
  1 AS `other_organism`,
  1 AS `antibiotic_status`,
  1 AS `antibiotic_status_resisitant`,
  1 AS `antibiotic_status_intermediate`,
  1 AS `sodium`,
  1 AS `potassium`,
  1 AS `chlorine`,
  1 AS `calcium`,
  1 AS `phosphate`,
  1 AS `magnesium`,
  1 AS `urea`,
  1 AS `creatinine`,
  1 AS `lactate_levels`,
  1 AS `bilirubin_levels`,
  1 AS `cord_ph`,
  1 AS `arrhythmia`,
  1 AS `csf_culture`,
  1 AS `csf_culture_tsb_value`,
  1 AS `antibiotic_status_value`,
  1 AS `antibiotic_given`,
  1 AS `date_of_administration_of_antiobiotic`,
  1 AS `time_of_administration_of_antiobiotic_hours`,
  1 AS `time_of_administration_of_antiobiotic_minute`,
  1 AS `antibiotic_name`,
  1 AS `antibiotic_name_if_other`,
  1 AS `grade_of_antibiotic`,
  1 AS `date_of_blood_samples_sent_for_culture_test`,
  1 AS `time_of_blood_samples_sent_for_culture_test_hours`,
  1 AS `time_of_blood_samples_sent_for_culture_test_minute`,
  1 AS `blood_sample_taken_prior_to_antiobiotic_administration`,
  1 AS `days_of_stay_in_hospital`,
  1 AS `final_diagnosis_sepsis`,
  1 AS `final_diagnosis_rds`,
  1 AS `final_diagnosis_ttnb`,
  1 AS `final_diagnosis_jaundice`,
  1 AS `final_diagnosis_lbw`,
  1 AS `final_diagnosis_lga`,
  1 AS `final_diagnosis_aga`,
  1 AS `final_diagnosis_sga`,
  1 AS `final_diagnosis_anemia`,
  1 AS `final_diagnosis_dextochordia`,
  1 AS `final_diagnosis_hypoglycemia`,
  1 AS `final_diagnosis_hypocalcemia`,
  1 AS `final_diagnosis_gastroenteritis`,
  1 AS `final_diagnosis_perinatal_respiratory_depression`,
  1 AS `final_diagnosis_shock`,
  1 AS `final_diagnosis_feeding_intolerence`,
  1 AS `baby_discharge_date`,
  1 AS `final_diagnosis_pulmonary_hemerrage`,
  1 AS `final_diagnosis_thrombocytopenia`,
  1 AS `final_diagnosis_eos_los`,
  1 AS `final_diagnosis_other` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_get_all_aasha_data`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_all_aasha_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_all_aasha_data` AS select `a`.`id` AS `study_id`,`a`.`baby_medical_record_number` AS `baby_medical_record_number`,`a`.`baby_mother_medical_record_number` AS `baby_mother_medical_record_number`,`b`.`baby_admission_type` AS `baby_admission_type`,`b`.`baby_place_of_birth_name` AS `baby_place_of_birth_name`,`b`.`baby_birth_date` AS `baby_birth_date`,cast(replace(`b`.`baby_birth_time_hours`,'NA',99999) as unsigned) AS `baby_birth_time_hours`,cast(replace(`b`.`baby_birth_time_minit`,'NA',99999) as unsigned) AS `baby_birth_time_minit`,cast(replace(`b`.`baby_age_of_admission`,'NA',99999) as unsigned) AS `baby_age_of_admission`,`b`.`place_of_delivery` AS `place_of_delivery`,`b`.`birth_facility` AS `birth_facility`,cast(replace(`b`.`baby_gestational_age`,'NA',99999) as unsigned) AS `baby_gestational_age`,cast(replace(`b`.`baby_weight_at_admission`,'NA',99999) as unsigned) AS `baby_weight_at_admission`,cast(replace(`b`.`baby_weight_at_birth`,'NA',99999) as unsigned) AS `baby_weight_at_birth`,`b`.`baby_preterm` AS `baby_preterm`,`b`.`baby_date_of_admission` AS `baby_date_of_admission`,cast(replace(`c`.`mother_weight`,'NA',99999) as unsigned) AS `mother_weight`,cast(replace(`c`.`mother_height`,'NA',99999) as unsigned) AS `mother_height`,cast(replace(`c`.`mother_age`,'NA',99999) as unsigned) AS `mother_age`,cast(replace(`c`.`mother_bmi`,'NA',99999) as unsigned) AS `mother_bmi`,cast(replace(`c`.`maternal_blood_pressure`,'NA',99999) as unsigned) AS `maternal_blood_pressure`,cast(replace(`c`.`maternal_blood_pressure_diastolic`,'NA',99999) as unsigned) AS `maternal_blood_pressure_diastolic`,`c`.`maternal_diabetes` AS `maternal_diabetes`,`c`.`rupture_of_membranes_rom` AS `rupture_of_membranes_rom`,`c`.`rupture_of_membranes_rom_one` AS `rupture_of_membranes_rom_one`,cast(replace(`c`.`rupture_of_membranes_rom_two`,'NA',99999) as unsigned) AS `rupture_of_membranes_rom_two`,`c`.`type_of_delivery` AS `type_of_delivery`,`c`.`delayed_cord_clamping` AS `delayed_cord_clamping`,`d`.`baby_appearance` AS `baby_appearance`,`d`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`d`.`baby_feeding_status` AS `baby_feeding_status`,cast(replace(`f`.`baby_blood_pressure_upper_limb`,'NA',99999) as unsigned) AS `baby_blood_pressure_upper_limb`,cast(replace(`f`.`baby_blood_pressure_lower_limb`,'NA',99999) as unsigned) AS `baby_blood_pressure_lower_limb`,cast(replace(`f`.`baby_blood_pressure_mean_arterial_bp`,'NA',99999) as unsigned) AS `baby_blood_pressure_mean_arterial_bp`,`f`.`urine_output` AS `urine_output`,cast(replace(`h`.`frequency_of_stools`,'NA',99999) as unsigned) AS `frequency_of_stools`,`h`.`vomiting` AS `vomiting`,`h`.`abdominal_dystension` AS `abdominal_dystension`,`e`.`retraction` AS `retraction`,`e`.`fast_breathing` AS `fast_breathing`,`e`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`h`.`baby_movement` AS `baby_movement`,`j`.`baby_name` AS `baby_name`,`j`.`mother_name` AS `mother_name`,`i`.`blood_culture_report` AS `blood_culture_report` from ((((((((`patient_basic_infos` `a` join `patient_general_infos` `b` on((`a`.`id` = `b`.`study_id`))) join `patient_maternal_infos` `c` on((`a`.`id` = `c`.`study_id`))) join `patient_baby_appears_infos` `d` on((`a`.`id` = `d`.`study_id`))) join `patient_baby_resp_infos` `e` on(((`a`.`id` = `e`.`study_id`) and (`d`.`reading` = `e`.`reading`)))) join `patient_baby_cv_infos` `f` on(((`a`.`id` = `f`.`study_id`) and (`d`.`reading` = `f`.`reading`)))) join `patient_baby_git_infos` `h` on(((`a`.`id` = `h`.`study_id`) and (`d`.`reading` = `h`.`reading`)))) join `patient_baby_investigations` `i` on(((`a`.`id` = `i`.`study_id`) and (`d`.`reading` = `i`.`reading`)))) join `patient_infos` `j` on((`a`.`id` = `j`.`study_id`))) where (`a`.`hospital_type` = 7) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_all_data`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_all_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_all_data` AS select `a`.`id` AS `id`,`a`.`hospital_name` AS `hospital_name`,`a`.`hospital_branch_name` AS `hospital_branch_name`,`a`.`id` AS `study_id`,`a`.`baby_medical_record_number` AS `baby_medical_record_number`,`a`.`baby_mother_medical_record_number` AS `baby_mother_medical_record_number`,`b`.`record_type` AS `record_type`,`b`.`baby_admission_type` AS `baby_admission_type`,`b`.`baby_birth_date` AS `baby_birth_date`,`b`.`baby_place_of_birth_pin_code` AS `baby_place_of_birth_pin_code`,`b`.`baby_place_of_birth_name` AS `baby_place_of_birth_name`,`b`.`baby_birth_time_hours` AS `baby_birth_time_hours`,`b`.`baby_birth_time_minit` AS `baby_birth_time_minit`,`b`.`baby_age_of_admission` AS `baby_age_of_admission`,`b`.`baby_apgar_score_one_min` AS `baby_apgar_score_one_min`,`b`.`baby_apgar_score_five_min` AS `baby_apgar_score_five_min`,`b`.`baby_apgar_score_ten_min` AS `baby_apgar_score_ten_min`,`b`.`baby_preterm` AS `baby_preterm`,`b`.`baby_condition_yes_eos_los` AS `baby_condition_yes_eos_los`,`b`.`baby_condition_rds_yes_no` AS `baby_condition_rds_yes_no`,`b`.`baby_gender` AS `baby_gender`,`b`.`baby_condition_jaundice_suspect` AS `baby_condition_jaundice_suspect`,`b`.`baby_condition_ttnb_suspect` AS `baby_condition_ttnb_suspect`,`b`.`baby_condition_lga_suspect` AS `baby_condition_lga_suspect`,`b`.`baby_condition_aga_suspect` AS `baby_condition_aga_suspect`,`b`.`baby_condition_sga_suspect` AS `baby_condition_sga_suspect`,`b`.`baby_shock_aga_suspect` AS `baby_shock_aga_suspect`,`b`.`baby_condition_dextrocordia_suspect` AS `baby_condition_dextrocordia_suspect`,`b`.`baby_condition_anemia_suspect` AS `baby_condition_anemia_suspect`,`b`.`baby_condition_lbw_suspect` AS `baby_condition_lbw_suspect`,`b`.`place_of_delivery` AS `place_of_delivery`,`b`.`birth_facility` AS `birth_facility`,`b`.`baby_gestational_age` AS `baby_gestational_age`,`b`.`baby_gestational_age_unit` AS `baby_gestational_age_unit`,`b`.`baby_weight_at_birth` AS `baby_weight_at_birth`,`b`.`baby_condition_suspect` AS `baby_condition_suspect`,`b`.`baby_day_of_event` AS `baby_day_of_event`,`b`.`baby_weight_at_admission` AS `baby_weight_at_admission`,`b`.`baby_condition_other_if_suspect` AS `baby_condition_other_if_suspect`,`b`.`prelim_diagnosis_perinatal` AS `prelim_diagnosis_perinatal`,`b`.`prelim_diagnosis_hypoglycemia` AS `prelim_diagnosis_hypoglycemia`,`b`.`prelim_diagnosis_hypocalcemia` AS `prelim_diagnosis_hypocalcemia`,`b`.`prelim_diagnosis_feeding_intolerence` AS `prelim_diagnosis_feeding_intolerence`,`b`.`prelim_diagnosis_gastroenteritis` AS `prelim_diagnosis_gastroenteritis`,`b`.`baby_weight_at_birth_unit` AS `baby_weight_at_birth_unit`,`b`.`baby_weight_at_admission_unit` AS `baby_weight_at_admission_unit`,`b`.`baby_date_of_admission` AS `baby_date_of_admission`,`c`.`mother_weight_unit` AS `mother_weight_unit`,`c`.`mother_weight` AS `mother_weight`,`c`.`mother_height` AS `mother_height`,`c`.`mother_height_unit` AS `mother_height_unit`,`c`.`mother_haemoglobin` AS `mother_haemoglobin`,`c`.`mother_bmi` AS `mother_bmi`,`c`.`maternal_blood_pressure` AS `maternal_blood_pressure`,`c`.`maternal_blood_pressure_diastolic` AS `maternal_blood_pressure_diastolic`,`c`.`maternal_diabetes` AS `maternal_diabetes`,`c`.`maternal_fever` AS `maternal_fever`,`c`.`maternal_fever_unit` AS `maternal_fever_unit`,`c`.`maternal_fever_basic` AS `maternal_fever_basic`,`c`.`maternal_thyroid_function` AS `maternal_thyroid_function`,`c`.`maternal_thyroid_function_basic` AS `maternal_thyroid_function_basic`,`c`.`maternal_thyroid_function_unit_basic` AS `maternal_thyroid_function_unit_basic`,`c`.`maternal_thyroid_function_unit_basic_unit` AS `maternal_thyroid_function_unit_basic_unit`,`c`.`more_than_3_vaginal_examinations_during_labor` AS `more_than_3_vaginal_examinations_during_labor`,`c`.`rupture_of_membranes_rom_one` AS `rupture_of_membranes_rom_one`,`c`.`leaking_pv` AS `leaking_pv`,`c`.`rupture_of_membranes_rom` AS `rupture_of_membranes_rom`,`c`.`smelly_amniotic_fluid` AS `smelly_amniotic_fluid`,`c`.`chorioamnionitis` AS `chorioamnionitis`,`c`.`gbs_infection` AS `gbs_infection`,`c`.`colonisation_or_urinary_tract_infection` AS `colonisation_or_urinary_tract_infection`,`c`.`torch_infections` AS `torch_infections`,`c`.`type_of_delivery` AS `type_of_delivery`,`c`.`delayed_cord_clamping` AS `delayed_cord_clamping`,`c`.`vaginal_swab_culture_two` AS `vaginal_swab_culture_two`,`c`.`vaginal_swab_culture_three` AS `vaginal_swab_culture_three`,`c`.`amniotic_fluid_culture` AS `amniotic_fluid_culture`,`c`.`amniotic_fluid_culture_three` AS `amniotic_fluid_culture_three`,`c`.`amniotic_fluid_culture_two` AS `amniotic_fluid_culture_two`,`c`.`rupture_of_membranes_rom_two` AS `rupture_of_membranes_rom_two`,`c`.`vaginal_swab_culture` AS `vaginal_swab_culture`,`c`.`mother_age` AS `mother_age`,`d`.`baby_appearance` AS `baby_appearance`,`d`.`baby_skin_colour` AS `baby_skin_colour`,`d`.`baby_cry_sound` AS `baby_cry_sound`,`d`.`baby_cry_sound_status` AS `baby_cry_sound_status`,`d`.`hypotonia_muscular_response_one_min_after_birth` AS `hypotonia_muscular_response_one_min_after_birth`,`d`.`hypotonia_muscular_response_five_min_after_birth` AS `hypotonia_muscular_response_five_min_after_birth`,`d`.`excessive_sleeping` AS `excessive_sleeping`,`d`.`hypothermia` AS `hypothermia`,`d`.`hypothermia_status_value` AS `hypothermia_status_value`,`d`.`baby_feeding_status` AS `baby_feeding_status`,`d`.`baby_presence_of_convulsions` AS `baby_presence_of_convulsions`,`d`.`baby_jaundice` AS `baby_jaundice`,`d`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`d`.`kangaroo_mother_care` AS `kangaroo_mother_care`,`d`.`hypothermia_status` AS `hypothermia_status`,`d`.`baby_weight_at_birth` AS `baby_weight_at_birth_baby_appearance`,`d`.`baby_weight_at_birth_unit` AS `baby_weight_at_birth_unit_baby_appearance`,`d`.`umbilical_discharge` AS `umbilical_discharge`,`e`.`groaning` AS `groaning`,`e`.`grunting` AS `grunting`,`e`.`stridor` AS `stridor`,`e`.`retraction` AS `retraction`,`e`.`fast_breathing` AS `fast_breathing`,`e`.`oxygen_saturation` AS `oxygen_saturation`,`e`.`breathing_rate` AS `breathing_rate`,`e`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`e`.`x_ray_status_done` AS `x_ray_status_done`,`e`.`x_ray_result` AS `x_ray_result`,`e`.`x_ray_diagnosis_any_other` AS `x_ray_diagnosis_any_other`,`e`.`x_ray_status` AS `x_ray_status`,`e`.`apnea_status` AS `apnea_status`,`e`.`apnea_diagnosis` AS `apnea_diagnosis`,`e`.`baby_respiratory_support` AS `baby_respiratory_support`,`e`.`baby_respiratory_support_if_yes` AS `baby_respiratory_support_if_yes`,`f`.`heart_rate` AS `heart_rate`,`f`.`urine_output` AS `urine_output`,`f`.`baby_blood_pressure_mean_arterial_bp` AS `baby_blood_pressure_mean_arterial_bp`,`f`.`baby_blood_pressure_upper_limb` AS `baby_blood_pressure_upper_limb`,`f`.`baby_blood_pressure_lower_limb` AS `baby_blood_pressure_lower_limb`,`f`.`capillary_refill_unit` AS `capillary_refill_unit`,`f`.`low_peripheral_pulse_volume` AS `low_peripheral_pulse_volume`,`f`.`cool_peripheries` AS `cool_peripheries`,`f`.`two_d_echo_done` AS `two_d_echo_done`,`f`.`two_d_echo_done_if_yes` AS `two_d_echo_done_if_yes`,`f`.`baby_on_ionotropes` AS `baby_on_ionotropes`,`f`.`central_line` AS `central_line`,`f`.`skin_pustules` AS `skin_pustules`,`f`.`infusion_of_blood_products` AS `infusion_of_blood_products`,`g`.`features_of_encephalopathy` AS `features_of_encephalopathy`,`g`.`seizures` AS `seizures`,`g`.`abnormal_movements_like_tonic_posturing` AS `abnormal_movements_like_tonic_posturing`,`g`.`af_bulge` AS `af_bulge`,`h`.`abdominal_dystension` AS `abdominal_dystension`,`h`.`frequency_of_stools` AS `frequency_of_stools`,`h`.`diarrhea` AS `diarrhea`,`h`.`vomiting` AS `vomiting`,`h`.`feeding_intolerance` AS `feeding_intolerance`,`h`.`baby_movement` AS `baby_movement`,`i`.`baby_thyroid_status` AS `baby_thyroid_status`,`i`.`baby_thyroid_result` AS `baby_thyroid_result`,`i`.`baby_blood_glucose` AS `baby_blood_glucose`,`i`.`baby_haemoglobin_levels` AS `baby_haemoglobin_levels`,`i`.`baby_c_reactive_protien_levels` AS `baby_c_reactive_protien_levels`,`i`.`micro_esr` AS `micro_esr`,`i`.`baby_procalcitonin_levels` AS `baby_procalcitonin_levels`,`i`.`total_leucocute_count_unit` AS `total_leucocute_count_unit`,`i`.`total_leucocute_count` AS `total_leucocute_count`,`i`.`absolute_neutrophil_count` AS `absolute_neutrophil_count`,`i`.`absolute_neutrophil_count_unit` AS `absolute_neutrophil_count_unit`,`i`.`immature_to_mature_neutrophil_ratios` AS `immature_to_mature_neutrophil_ratios`,`i`.`thrombocytopenia_unit` AS `thrombocytopenia_unit`,`i`.`thrombocytopenia` AS `thrombocytopenia`,`i`.`urine_rest_for_pus_cells` AS `urine_rest_for_pus_cells`,`i`.`urine_culture_test` AS `urine_culture_test`,`i`.`blood_culture_report` AS `blood_culture_report`,`i`.`gram_positive_bacteria` AS `gram_positive_bacteria`,`i`.`gram_positive_bacteria_if_other` AS `gram_positive_bacteria_if_other`,`i`.`gram_negative_bacteria` AS `gram_negative_bacteria`,`i`.`gram_negative_bacteria_if_other` AS `gram_negative_bacteria_if_other`,`i`.`fungi` AS `fungi`,`i`.`other_organism` AS `other_organism`,`i`.`antibiotic_status_resisitant` AS `antibiotic_status_resisitant`,`i`.`antibiotic_status_intermediate` AS `antibiotic_status_intermediate`,`i`.`sodium` AS `sodium`,`i`.`potassium` AS `potassium`,`i`.`chlorine` AS `chlorine`,`i`.`calcium` AS `calcium`,`i`.`phosphate` AS `phosphate`,`i`.`magnesium` AS `magnesium`,`i`.`urea` AS `urea`,`i`.`creatinine` AS `creatinine`,`i`.`lactate_levels` AS `lactate_levels`,`i`.`bilirubin_levels` AS `bilirubin_levels`,`i`.`cord_ph` AS `cord_ph`,`i`.`arrhythmia` AS `arrhythmia`,`i`.`csf_culture` AS `csf_culture`,`i`.`csf_culture_tsb_value` AS `csf_culture_tsb_value`,`i`.`antibiotic_status_value` AS `antibiotic_status_value`,`j`.`antibiotic_given` AS `antibiotic_given`,`j`.`date_of_administration_of_antiobiotic` AS `date_of_administration_of_antiobiotic`,`j`.`time_of_administration_of_antiobiotic_hours` AS `time_of_administration_of_antiobiotic_hours`,`j`.`time_of_administration_of_antiobiotic_minute` AS `time_of_administration_of_antiobiotic_minute`,`j`.`antibiotic_name` AS `antibiotic_name`,`j`.`antibiotic_name_if_other` AS `antibiotic_name_if_other`,`j`.`grade_of_antibiotic` AS `grade_of_antibiotic`,`j`.`date_of_blood_samples_sent_for_culture_test` AS `date_of_blood_samples_sent_for_culture_test`,`j`.`time_of_blood_samples_sent_for_culture_test_hours` AS `time_of_blood_samples_sent_for_culture_test_hours`,`j`.`time_of_blood_samples_sent_for_culture_test_minute` AS `time_of_blood_samples_sent_for_culture_test_minute`,`j`.`blood_sample_taken_prior_to_antiobiotic_administration` AS `blood_sample_taken_prior_to_antiobiotic_administration`,`k`.`days_of_stay_in_hospital` AS `days_of_stay_in_hospital`,`k`.`final_diagnosis_sepsis` AS `final_diagnosis_sepsis`,`k`.`final_diagnosis_rds` AS `final_diagnosis_rds`,`k`.`final_diagnosis_ttnb` AS `final_diagnosis_ttnb`,`k`.`final_diagnosis_jaundice` AS `final_diagnosis_jaundice`,`k`.`final_diagnosis_lbw` AS `final_diagnosis_lbw`,`k`.`final_diagnosis_lga` AS `final_diagnosis_lga`,`k`.`final_diagnosis_aga` AS `final_diagnosis_aga`,`k`.`final_diagnosis_sga` AS `final_diagnosis_sga`,`k`.`final_diagnosis_anemia` AS `final_diagnosis_anemia`,`k`.`final_diagnosis_dextochordia` AS `final_diagnosis_dextochordia`,`k`.`final_diagnosis_hypoglycemia` AS `final_diagnosis_hypoglycemia`,`k`.`final_diagnosis_hypocalcemia` AS `final_diagnosis_hypocalcemia`,`k`.`final_diagnosis_gastroenteritis` AS `final_diagnosis_gastroenteritis`,`k`.`final_diagnosis_perinatal_respiratory_depression` AS `final_diagnosis_perinatal_respiratory_depression`,`k`.`final_diagnosis_shock` AS `final_diagnosis_shock`,`k`.`final_diagnosis_feeding_intolerence` AS `final_diagnosis_feeding_intolerence`,`k`.`baby_discharge_date` AS `baby_discharge_date`,`k`.`final_diagnosis_eos_los` AS `final_diagnosis_eos_los`,`k`.`final_diagnosis_other` AS `final_diagnosis_other`,`d`.`reading` AS `reading`,`d`.`reading_date` AS `reading_date`,`d`.`createdAt` AS `createdAt`,`d`.`time_of_reading_hours` AS `time_of_reading_hours`,`d`.`time_of_reading_minute` AS `time_of_reading_minute` from ((((((((((`patient_basic_infos` `a` join `patient_general_infos` `b` on((`a`.`id` = `b`.`study_id`))) join `patient_maternal_infos` `c` on((`a`.`id` = `c`.`study_id`))) join `patient_baby_appears_infos` `d` on((`a`.`id` = `d`.`study_id`))) join `patient_baby_resp_infos` `e` on(((`a`.`id` = `e`.`study_id`) and (`d`.`reading` = `e`.`reading`)))) join `patient_baby_cv_infos` `f` on(((`a`.`id` = `f`.`study_id`) and (`d`.`reading` = `f`.`reading`)))) join `patient_baby_cns_infos` `g` on(((`a`.`id` = `g`.`study_id`) and (`d`.`reading` = `g`.`reading`)))) join `patient_baby_git_infos` `h` on(((`a`.`id` = `h`.`study_id`) and (`d`.`reading` = `h`.`reading`)))) join `patient_baby_investigations` `i` on(((`a`.`id` = `i`.`study_id`) and (`d`.`reading` = `i`.`reading`)))) join `patient_baby_antibiotics` `j` on(((`a`.`id` = `j`.`study_id`) and (`d`.`reading` = `j`.`reading`)))) join `patient_baby_finals` `k` on(((`a`.`id` = `k`.`study_id`) and (`d`.`reading` = `k`.`reading`)))) order by `a`.`hospital_name`,`a`.`hospital_branch_name`,`a`.`baby_medical_record_number`,`d`.`createdAt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_all_data_1`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_all_data_1`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_all_data_1` AS select `vw_get_all_data`.`id` AS `id`,`vw_get_all_data`.`hospital_name` AS `hospital_name`,`vw_get_all_data`.`hospital_branch_name` AS `hospital_branch_name`,`vw_get_all_data`.`study_id` AS `study_id`,`vw_get_all_data`.`baby_medical_record_number` AS `baby_medical_record_number`,`vw_get_all_data`.`baby_mother_medical_record_number` AS `baby_mother_medical_record_number`,`vw_get_all_data`.`record_type` AS `record_type`,`vw_get_all_data`.`baby_admission_type` AS `baby_admission_type`,`vw_get_all_data`.`baby_birth_date` AS `baby_birth_date`,`vw_get_all_data`.`baby_place_of_birth_pin_code` AS `baby_place_of_birth_pin_code`,`vw_get_all_data`.`baby_place_of_birth_name` AS `baby_place_of_birth_name`,`vw_get_all_data`.`baby_birth_time_hours` AS `baby_birth_time_hours`,`vw_get_all_data`.`baby_birth_time_minit` AS `baby_birth_time_minit`,`vw_get_all_data`.`baby_age_of_admission` AS `baby_age_of_admission`,`vw_get_all_data`.`baby_apgar_score_one_min` AS `baby_apgar_score_one_min`,`vw_get_all_data`.`baby_apgar_score_five_min` AS `baby_apgar_score_five_min`,`vw_get_all_data`.`baby_apgar_score_ten_min` AS `baby_apgar_score_ten_min`,`vw_get_all_data`.`baby_preterm` AS `baby_preterm`,`vw_get_all_data`.`baby_condition_yes_eos_los` AS `baby_condition_yes_eos_los`,`vw_get_all_data`.`baby_condition_rds_yes_no` AS `baby_condition_rds_yes_no`,`vw_get_all_data`.`baby_gender` AS `baby_gender`,`vw_get_all_data`.`baby_condition_jaundice_suspect` AS `baby_condition_jaundice_suspect`,`vw_get_all_data`.`baby_condition_ttnb_suspect` AS `baby_condition_ttnb_suspect`,`vw_get_all_data`.`baby_condition_lga_suspect` AS `baby_condition_lga_suspect`,`vw_get_all_data`.`baby_condition_aga_suspect` AS `baby_condition_aga_suspect`,`vw_get_all_data`.`baby_condition_sga_suspect` AS `baby_condition_sga_suspect`,`vw_get_all_data`.`baby_shock_aga_suspect` AS `baby_shock_aga_suspect`,`vw_get_all_data`.`baby_condition_dextrocordia_suspect` AS `baby_condition_dextrocordia_suspect`,`vw_get_all_data`.`baby_condition_anemia_suspect` AS `baby_condition_anemia_suspect`,`vw_get_all_data`.`baby_condition_lbw_suspect` AS `baby_condition_lbw_suspect`,`vw_get_all_data`.`place_of_delivery` AS `place_of_delivery`,`vw_get_all_data`.`birth_facility` AS `birth_facility`,`vw_get_all_data`.`baby_gestational_age` AS `baby_gestational_age`,`vw_get_all_data`.`baby_gestational_age_unit` AS `baby_gestational_age_unit`,`vw_get_all_data`.`baby_weight_at_birth` AS `baby_weight_at_birth`,`vw_get_all_data`.`baby_condition_suspect` AS `baby_condition_suspect`,`vw_get_all_data`.`baby_day_of_event` AS `baby_day_of_event`,`vw_get_all_data`.`baby_weight_at_admission` AS `baby_weight_at_admission`,`vw_get_all_data`.`baby_condition_other_if_suspect` AS `baby_condition_other_if_suspect`,`vw_get_all_data`.`prelim_diagnosis_perinatal` AS `prelim_diagnosis_perinatal`,`vw_get_all_data`.`prelim_diagnosis_hypoglycemia` AS `prelim_diagnosis_hypoglycemia`,`vw_get_all_data`.`prelim_diagnosis_hypocalcemia` AS `prelim_diagnosis_hypocalcemia`,`vw_get_all_data`.`prelim_diagnosis_feeding_intolerence` AS `prelim_diagnosis_feeding_intolerence`,`vw_get_all_data`.`prelim_diagnosis_gastroenteritis` AS `prelim_diagnosis_gastroenteritis`,`vw_get_all_data`.`baby_weight_at_birth_unit` AS `baby_weight_at_birth_unit`,`vw_get_all_data`.`baby_weight_at_admission_unit` AS `baby_weight_at_admission_unit`,`vw_get_all_data`.`baby_date_of_admission` AS `baby_date_of_admission`,`vw_get_all_data`.`mother_weight_unit` AS `mother_weight_unit`,`vw_get_all_data`.`mother_weight` AS `mother_weight`,`vw_get_all_data`.`mother_height` AS `mother_height`,`vw_get_all_data`.`mother_height_unit` AS `mother_height_unit`,`vw_get_all_data`.`mother_haemoglobin` AS `mother_haemoglobin`,`vw_get_all_data`.`mother_bmi` AS `mother_bmi`,`vw_get_all_data`.`maternal_blood_pressure` AS `maternal_blood_pressure`,`vw_get_all_data`.`maternal_blood_pressure_diastolic` AS `maternal_blood_pressure_diastolic`,`vw_get_all_data`.`maternal_diabetes` AS `maternal_diabetes`,`vw_get_all_data`.`maternal_fever` AS `maternal_fever`,`vw_get_all_data`.`maternal_fever_unit` AS `maternal_fever_unit`,`vw_get_all_data`.`maternal_fever_basic` AS `maternal_fever_basic`,`vw_get_all_data`.`maternal_thyroid_function` AS `maternal_thyroid_function`,`vw_get_all_data`.`maternal_thyroid_function_basic` AS `maternal_thyroid_function_basic`,`vw_get_all_data`.`maternal_thyroid_function_unit_basic` AS `maternal_thyroid_function_unit_basic`,`vw_get_all_data`.`maternal_thyroid_function_unit_basic_unit` AS `maternal_thyroid_function_unit_basic_unit`,`vw_get_all_data`.`more_than_3_vaginal_examinations_during_labor` AS `more_than_3_vaginal_examinations_during_labor`,`vw_get_all_data`.`rupture_of_membranes_rom_one` AS `rupture_of_membranes_rom_one`,`vw_get_all_data`.`leaking_pv` AS `leaking_pv`,`vw_get_all_data`.`rupture_of_membranes_rom` AS `rupture_of_membranes_rom`,`vw_get_all_data`.`smelly_amniotic_fluid` AS `smelly_amniotic_fluid`,`vw_get_all_data`.`chorioamnionitis` AS `chorioamnionitis`,`vw_get_all_data`.`gbs_infection` AS `gbs_infection`,`vw_get_all_data`.`colonisation_or_urinary_tract_infection` AS `colonisation_or_urinary_tract_infection`,`vw_get_all_data`.`torch_infections` AS `torch_infections`,`vw_get_all_data`.`type_of_delivery` AS `type_of_delivery`,`vw_get_all_data`.`delayed_cord_clamping` AS `delayed_cord_clamping`,`vw_get_all_data`.`vaginal_swab_culture_two` AS `vaginal_swab_culture_two`,`vw_get_all_data`.`vaginal_swab_culture_three` AS `vaginal_swab_culture_three`,`vw_get_all_data`.`amniotic_fluid_culture` AS `amniotic_fluid_culture`,`vw_get_all_data`.`amniotic_fluid_culture_three` AS `amniotic_fluid_culture_three`,`vw_get_all_data`.`amniotic_fluid_culture_two` AS `amniotic_fluid_culture_two`,`vw_get_all_data`.`rupture_of_membranes_rom_two` AS `rupture_of_membranes_rom_two`,`vw_get_all_data`.`vaginal_swab_culture` AS `vaginal_swab_culture`,`vw_get_all_data`.`mother_age` AS `mother_age`,`vw_get_all_data`.`baby_appearance` AS `baby_appearance`,`vw_get_all_data`.`baby_skin_colour` AS `baby_skin_colour`,`vw_get_all_data`.`baby_cry_sound` AS `baby_cry_sound`,`vw_get_all_data`.`baby_cry_sound_status` AS `baby_cry_sound_status`,`vw_get_all_data`.`hypotonia_muscular_response_one_min_after_birth` AS `hypotonia_muscular_response_one_min_after_birth`,`vw_get_all_data`.`hypotonia_muscular_response_five_min_after_birth` AS `hypotonia_muscular_response_five_min_after_birth`,`vw_get_all_data`.`excessive_sleeping` AS `excessive_sleeping`,`vw_get_all_data`.`hypothermia` AS `hypothermia`,`vw_get_all_data`.`hypothermia_status_value` AS `hypothermia_status_value`,`vw_get_all_data`.`baby_feeding_status` AS `baby_feeding_status`,`vw_get_all_data`.`baby_presence_of_convulsions` AS `baby_presence_of_convulsions`,`vw_get_all_data`.`baby_jaundice` AS `baby_jaundice`,`vw_get_all_data`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`vw_get_all_data`.`kangaroo_mother_care` AS `kangaroo_mother_care`,`vw_get_all_data`.`hypothermia_status` AS `hypothermia_status`,`vw_get_all_data`.`baby_weight_at_birth_baby_appearance` AS `baby_weight_at_birth_baby_appearance`,`vw_get_all_data`.`baby_weight_at_birth_unit_baby_appearance` AS `baby_weight_at_birth_unit_baby_appearance`,`vw_get_all_data`.`umbilical_discharge` AS `umbilical_discharge`,`vw_get_all_data`.`groaning` AS `groaning`,`vw_get_all_data`.`grunting` AS `grunting`,`vw_get_all_data`.`stridor` AS `stridor`,`vw_get_all_data`.`retraction` AS `retraction`,`vw_get_all_data`.`fast_breathing` AS `fast_breathing`,`vw_get_all_data`.`oxygen_saturation` AS `oxygen_saturation`,`vw_get_all_data`.`breathing_rate` AS `breathing_rate`,`vw_get_all_data`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`vw_get_all_data`.`x_ray_status_done` AS `x_ray_status_done`,`vw_get_all_data`.`x_ray_result` AS `x_ray_result`,`vw_get_all_data`.`x_ray_diagnosis_any_other` AS `x_ray_diagnosis_any_other`,`vw_get_all_data`.`x_ray_status` AS `x_ray_status`,`vw_get_all_data`.`apnea_status` AS `apnea_status`,`vw_get_all_data`.`apnea_diagnosis` AS `apnea_diagnosis`,`vw_get_all_data`.`baby_respiratory_support` AS `baby_respiratory_support`,`vw_get_all_data`.`baby_respiratory_support_if_yes` AS `baby_respiratory_support_if_yes`,`vw_get_all_data`.`heart_rate` AS `heart_rate`,`vw_get_all_data`.`urine_output` AS `urine_output`,`vw_get_all_data`.`baby_blood_pressure_mean_arterial_bp` AS `baby_blood_pressure_mean_arterial_bp`,`vw_get_all_data`.`baby_blood_pressure_upper_limb` AS `baby_blood_pressure_upper_limb`,`vw_get_all_data`.`baby_blood_pressure_lower_limb` AS `baby_blood_pressure_lower_limb`,`vw_get_all_data`.`capillary_refill_unit` AS `capillary_refill_unit`,`vw_get_all_data`.`low_peripheral_pulse_volume` AS `low_peripheral_pulse_volume`,`vw_get_all_data`.`cool_peripheries` AS `cool_peripheries`,`vw_get_all_data`.`two_d_echo_done` AS `two_d_echo_done`,`vw_get_all_data`.`two_d_echo_done_if_yes` AS `two_d_echo_done_if_yes`,`vw_get_all_data`.`baby_on_ionotropes` AS `baby_on_ionotropes`,`vw_get_all_data`.`central_line` AS `central_line`,`vw_get_all_data`.`skin_pustules` AS `skin_pustules`,`vw_get_all_data`.`infusion_of_blood_products` AS `infusion_of_blood_products`,`vw_get_all_data`.`features_of_encephalopathy` AS `features_of_encephalopathy`,`vw_get_all_data`.`seizures` AS `seizures`,`vw_get_all_data`.`abnormal_movements_like_tonic_posturing` AS `abnormal_movements_like_tonic_posturing`,`vw_get_all_data`.`af_bulge` AS `af_bulge`,`vw_get_all_data`.`abdominal_dystension` AS `abdominal_dystension`,`vw_get_all_data`.`frequency_of_stools` AS `frequency_of_stools`,`vw_get_all_data`.`diarrhea` AS `diarrhea`,`vw_get_all_data`.`vomiting` AS `vomiting`,`vw_get_all_data`.`feeding_intolerance` AS `feeding_intolerance`,`vw_get_all_data`.`baby_movement` AS `baby_movement`,`vw_get_all_data`.`baby_thyroid_status` AS `baby_thyroid_status`,`vw_get_all_data`.`baby_thyroid_result` AS `baby_thyroid_result`,`vw_get_all_data`.`baby_blood_glucose` AS `baby_blood_glucose`,`vw_get_all_data`.`baby_haemoglobin_levels` AS `baby_haemoglobin_levels`,`vw_get_all_data`.`baby_c_reactive_protien_levels` AS `baby_c_reactive_protien_levels`,`vw_get_all_data`.`micro_esr` AS `micro_esr`,`vw_get_all_data`.`baby_procalcitonin_levels` AS `baby_procalcitonin_levels`,`vw_get_all_data`.`total_leucocute_count_unit` AS `total_leucocute_count_unit`,`vw_get_all_data`.`total_leucocute_count` AS `total_leucocute_count`,`vw_get_all_data`.`absolute_neutrophil_count` AS `absolute_neutrophil_count`,`vw_get_all_data`.`absolute_neutrophil_count_unit` AS `absolute_neutrophil_count_unit`,`vw_get_all_data`.`immature_to_mature_neutrophil_ratios` AS `immature_to_mature_neutrophil_ratios`,`vw_get_all_data`.`thrombocytopenia_unit` AS `thrombocytopenia_unit`,`vw_get_all_data`.`thrombocytopenia` AS `thrombocytopenia`,`vw_get_all_data`.`urine_rest_for_pus_cells` AS `urine_rest_for_pus_cells`,`vw_get_all_data`.`urine_culture_test` AS `urine_culture_test`,`vw_get_all_data`.`blood_culture_report` AS `blood_culture_report`,`vw_get_all_data`.`gram_positive_bacteria` AS `gram_positive_bacteria`,`vw_get_all_data`.`gram_positive_bacteria_if_other` AS `gram_positive_bacteria_if_other`,`vw_get_all_data`.`gram_negative_bacteria` AS `gram_negative_bacteria`,`vw_get_all_data`.`gram_negative_bacteria_if_other` AS `gram_negative_bacteria_if_other`,`vw_get_all_data`.`fungi` AS `fungi`,`vw_get_all_data`.`other_organism` AS `other_organism`,`vw_get_all_data`.`antibiotic_status_resisitant` AS `antibiotic_status_resisitant`,`vw_get_all_data`.`antibiotic_status_intermediate` AS `antibiotic_status_intermediate`,`vw_get_all_data`.`sodium` AS `sodium`,`vw_get_all_data`.`potassium` AS `potassium`,`vw_get_all_data`.`chlorine` AS `chlorine`,`vw_get_all_data`.`calcium` AS `calcium`,`vw_get_all_data`.`phosphate` AS `phosphate`,`vw_get_all_data`.`magnesium` AS `magnesium`,`vw_get_all_data`.`urea` AS `urea`,`vw_get_all_data`.`creatinine` AS `creatinine`,`vw_get_all_data`.`lactate_levels` AS `lactate_levels`,`vw_get_all_data`.`bilirubin_levels` AS `bilirubin_levels`,`vw_get_all_data`.`cord_ph` AS `cord_ph`,`vw_get_all_data`.`arrhythmia` AS `arrhythmia`,`vw_get_all_data`.`csf_culture` AS `csf_culture`,`vw_get_all_data`.`csf_culture_tsb_value` AS `csf_culture_tsb_value`,`vw_get_all_data`.`antibiotic_status_value` AS `antibiotic_status_value`,`vw_get_all_data`.`antibiotic_given` AS `antibiotic_given`,`vw_get_all_data`.`date_of_administration_of_antiobiotic` AS `date_of_administration_of_antiobiotic`,`vw_get_all_data`.`time_of_administration_of_antiobiotic_hours` AS `time_of_administration_of_antiobiotic_hours`,`vw_get_all_data`.`time_of_administration_of_antiobiotic_minute` AS `time_of_administration_of_antiobiotic_minute`,`vw_get_all_data`.`antibiotic_name` AS `antibiotic_name`,`vw_get_all_data`.`antibiotic_name_if_other` AS `antibiotic_name_if_other`,`vw_get_all_data`.`grade_of_antibiotic` AS `grade_of_antibiotic`,`vw_get_all_data`.`date_of_blood_samples_sent_for_culture_test` AS `date_of_blood_samples_sent_for_culture_test`,`vw_get_all_data`.`time_of_blood_samples_sent_for_culture_test_hours` AS `time_of_blood_samples_sent_for_culture_test_hours`,`vw_get_all_data`.`time_of_blood_samples_sent_for_culture_test_minute` AS `time_of_blood_samples_sent_for_culture_test_minute`,`vw_get_all_data`.`blood_sample_taken_prior_to_antiobiotic_administration` AS `blood_sample_taken_prior_to_antiobiotic_administration`,`vw_get_all_data`.`days_of_stay_in_hospital` AS `days_of_stay_in_hospital`,`vw_get_all_data`.`final_diagnosis_sepsis` AS `final_diagnosis_sepsis`,`vw_get_all_data`.`final_diagnosis_rds` AS `final_diagnosis_rds`,`vw_get_all_data`.`final_diagnosis_ttnb` AS `final_diagnosis_ttnb`,`vw_get_all_data`.`final_diagnosis_jaundice` AS `final_diagnosis_jaundice`,`vw_get_all_data`.`final_diagnosis_lbw` AS `final_diagnosis_lbw`,`vw_get_all_data`.`final_diagnosis_lga` AS `final_diagnosis_lga`,`vw_get_all_data`.`final_diagnosis_aga` AS `final_diagnosis_aga`,`vw_get_all_data`.`final_diagnosis_sga` AS `final_diagnosis_sga`,`vw_get_all_data`.`final_diagnosis_anemia` AS `final_diagnosis_anemia`,`vw_get_all_data`.`final_diagnosis_dextochordia` AS `final_diagnosis_dextochordia`,`vw_get_all_data`.`final_diagnosis_hypoglycemia` AS `final_diagnosis_hypoglycemia`,`vw_get_all_data`.`final_diagnosis_hypocalcemia` AS `final_diagnosis_hypocalcemia`,`vw_get_all_data`.`final_diagnosis_gastroenteritis` AS `final_diagnosis_gastroenteritis`,`vw_get_all_data`.`final_diagnosis_perinatal_respiratory_depression` AS `final_diagnosis_perinatal_respiratory_depression`,`vw_get_all_data`.`final_diagnosis_shock` AS `final_diagnosis_shock`,`vw_get_all_data`.`final_diagnosis_feeding_intolerence` AS `final_diagnosis_feeding_intolerence`,`vw_get_all_data`.`baby_discharge_date` AS `baby_discharge_date`,`vw_get_all_data`.`final_diagnosis_eos_los` AS `final_diagnosis_eos_los`,`vw_get_all_data`.`final_diagnosis_other` AS `final_diagnosis_other`,`vw_get_all_data`.`reading` AS `reading`,`vw_get_all_data`.`reading_date` AS `reading_date`,`vw_get_all_data`.`createdAt` AS `createdAt`,`vw_get_all_data`.`time_of_reading_hours` AS `time_of_reading_hours`,`vw_get_all_data`.`time_of_reading_minute` AS `time_of_reading_minute` from `avyantra_prod`.`vw_get_all_data` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_generated_score`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_generated_score`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_generated_score` AS select `sepsis_score_full_params`.`id` AS `study_id`,`sepsis_score_full_params`.`reading` AS `reading`,(`sepsis_score_full_params`.`sepsis_score` * 10) AS `sepsis_score`,1 AS `record_flag` from `sepsis_score_full_params` union all select `sepsis_score_asha`.`id` AS `study_id`,'R1' AS `reading`,(`sepsis_score_asha`.`sepsis_score` * 10) AS `sepsis_score`,2 AS `record_flag` from `sepsis_score_asha` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_ml_data`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_ml_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_ml_data` AS select distinct `d`.`study_id` AS `study_id`,`a`.`baby_medical_record_number` AS `baby_medical_record_number`,`d`.`reading` AS `reading`,`d`.`baby_appearance` AS `baby_appearance`,`d`.`baby_skin_colour` AS `baby_skin_colour`,`d`.`baby_cry_sound` AS `baby_cry_sound`,cast(replace(`d`.`baby_cry_sound_status`,'NA',99999) as unsigned) AS `baby_cry_sound_status`,`d`.`hypotonia_muscular_response_one_min_after_birth` AS `hypotonia_muscular_response_one_min_after_birth`,`d`.`hypotonia_muscular_response_five_min_after_birth` AS `hypotonia_muscular_response_five_min_after_birth`,`d`.`excessive_sleeping` AS `excessive_sleeping`,`d`.`hypothermia` AS `hypothermia`,cast(replace(`d`.`hypothermia_status_value`,'NA',99999) as unsigned) AS `hypothermia_status_value`,`d`.`baby_feeding_status` AS `baby_feeding_status`,`d`.`baby_presence_of_convulsions` AS `baby_presence_of_convulsions`,`d`.`baby_jaundice` AS `baby_jaundice`,`d`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`d`.`kangaroo_mother_care` AS `kangaroo_mother_care`,`d`.`hypothermia_status` AS `hypothermia_status`,`e`.`groaning` AS `groaning`,`e`.`grunting` AS `grunting`,`e`.`stridor` AS `stridor`,`e`.`retraction` AS `retraction`,`e`.`fast_breathing` AS `fast_breathing`,cast(replace(`e`.`oxygen_saturation`,'NA',99999) as unsigned) AS `oxygen_saturation`,cast(replace(`e`.`breathing_rate`,'NA',99999) as unsigned) AS `breathing_rate`,`e`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`e`.`x_ray_status_done` AS `x_ray_status_done`,`e`.`x_ray_result` AS `x_ray_result`,`e`.`x_ray_diagnosis_any_other` AS `x_ray_diagnosis_any_other`,`e`.`x_ray_status` AS `x_ray_status`,`e`.`apnea_status` AS `apnea_status`,`e`.`apnea_diagnosis` AS `apnea_diagnosis`,`e`.`baby_respiratory_support` AS `baby_respiratory_support`,`e`.`baby_respiratory_support_if_yes` AS `baby_respiratory_support_if_yes`,cast(replace(`f`.`heart_rate`,'NA',99999) as unsigned) AS `heart_rate`,`f`.`urine_output` AS `urine_output`,cast(replace(`f`.`baby_blood_pressure_mean_arterial_bp`,'NA',99999) as unsigned) AS `baby_blood_pressure_mean_arterial_bp`,cast(replace(`f`.`baby_blood_pressure_upper_limb`,'NA',99999) as unsigned) AS `baby_blood_pressure_upper_limb`,cast(replace(`f`.`baby_blood_pressure_lower_limb`,'NA',99999) as unsigned) AS `baby_blood_pressure_lower_limb`,`f`.`capillary_refill` AS `capillary_refill`,`f`.`capillary_refill_unit` AS `capillary_refill_unit`,`f`.`low_peripheral_pulse_volume` AS `low_peripheral_pulse_volume`,`f`.`cool_peripheries` AS `cool_peripheries`,`f`.`two_d_echo_done` AS `two_d_echo_done`,`f`.`two_d_echo_done_if_yes` AS `two_d_echo_done_if_yes`,`f`.`baby_on_ionotropes` AS `baby_on_ionotropes`,`f`.`central_line` AS `central_line`,`f`.`skin_pustules` AS `skin_pustules`,`f`.`infusion_of_blood_products` AS `infusion_of_blood_products`,`g`.`features_of_encephalopathy` AS `features_of_encephalopathy`,`g`.`seizures` AS `seizures`,`g`.`abnormal_movements_like_tonic_posturing` AS `abnormal_movements_like_tonic_posturing`,`g`.`af_bulge` AS `af_bulge`,`g`.`patient_id` AS `patient_id`,`h`.`abdominal_dystension` AS `abdominal_dystension`,cast(replace(`h`.`frequency_of_stools`,'NA',99999) as unsigned) AS `frequency_of_stools`,`h`.`diarrhea` AS `diarrhea`,`h`.`vomiting` AS `vomiting`,`h`.`feeding_intolerance` AS `feeding_intolerance`,`h`.`baby_movement` AS `baby_movement`,`i`.`baby_thyroid_status` AS `baby_thyroid_status`,cast(replace(`i`.`baby_thyroid_result`,'NA',99999) as unsigned) AS `baby_thyroid_result`,cast(replace(`i`.`baby_blood_glucose`,'NA',99999) as unsigned) AS `baby_blood_glucose`,cast(replace(`i`.`baby_haemoglobin_levels`,'NA',99999) as unsigned) AS `baby_haemoglobin_levels`,cast(replace(`i`.`baby_c_reactive_protien_levels`,'NA',99999) as unsigned) AS `baby_c_reactive_protien_levels`,cast(replace(`i`.`micro_esr`,'NA',99999) as unsigned) AS `micro_esr`,cast(replace(`i`.`baby_procalcitonin_levels`,'NA',99999) as unsigned) AS `baby_procalcitonin_levels`,`i`.`total_leucocute_count_unit` AS `total_leucocute_count_unit`,cast(replace(`i`.`total_leucocute_count`,'NA',99999) as unsigned) AS `total_leucocute_count`,cast(replace(`i`.`absolute_neutrophil_count`,'NA',99999) as unsigned) AS `absolute_neutrophil_count`,`i`.`absolute_neutrophil_count_unit` AS `absolute_neutrophil_count_unit`,`i`.`immature_to_mature_neutrophil_ratios` AS `immature_to_mature_neutrophil_ratios`,`i`.`thrombocytopenia_unit` AS `thrombocytopenia_unit`,cast(replace(`i`.`thrombocytopenia`,'NA',99999) as unsigned) AS `thrombocytopenia`,`i`.`urine_rest_for_pus_cells` AS `urine_rest_for_pus_cells`,`i`.`urine_culture_test` AS `urine_culture_test`,`i`.`blood_culture_report` AS `blood_culture_report`,`i`.`gram_positive_bacteria` AS `gram_positive_bacteria`,`i`.`gram_positive_bacteria_if_other` AS `gram_positive_bacteria_if_other`,`i`.`gram_negative_bacteria` AS `gram_negative_bacteria`,`i`.`gram_negative_bacteria_if_other` AS `gram_negative_bacteria_if_other`,`i`.`fungi` AS `fungi`,`i`.`other_organism` AS `other_organism`,`i`.`antibiotic_status` AS `antibiotic_status`,`i`.`antibiotic_status_resisitant` AS `antibiotic_status_resisitant`,`i`.`antibiotic_status_intermediate` AS `antibiotic_status_intermediate`,cast(replace(`i`.`sodium`,'NA',99999) as unsigned) AS `sodium`,cast(replace(`i`.`potassium`,'NA',99999) as unsigned) AS `potassium`,cast(replace(`i`.`chlorine`,'NA',99999) as unsigned) AS `chlorine`,cast(replace(`i`.`calcium`,'NA',99999) as unsigned) AS `calcium`,cast(replace(`i`.`phosphate`,'NA',99999) as unsigned) AS `phosphate`,cast(replace(`i`.`magnesium`,'NA',99999) as unsigned) AS `magnesium`,cast(replace(`i`.`urea`,'NA',99999) as unsigned) AS `urea`,cast(replace(`i`.`creatinine`,'NA',99999) as unsigned) AS `creatinine`,cast(replace(`i`.`lactate_levels`,'NA',99999) as unsigned) AS `lactate_levels`,cast(replace(`i`.`bilirubin_levels`,'NA',99999) as unsigned) AS `bilirubin_levels`,cast(replace(`i`.`cord_ph`,'NA',99999) as unsigned) AS `cord_ph`,`i`.`arrhythmia` AS `arrhythmia`,`i`.`csf_culture` AS `csf_culture`,cast(replace(`i`.`csf_culture_tsb_value`,'NA',99999) as unsigned) AS `csf_culture_tsb_value`,`i`.`antibiotic_status_value` AS `antibiotic_status_value`,`j`.`antibiotic_given` AS `antibiotic_given`,`j`.`date_of_administration_of_antiobiotic` AS `date_of_administration_of_antiobiotic`,cast(replace(`j`.`time_of_administration_of_antiobiotic_hours`,'NA',99999) as unsigned) AS `time_of_administration_of_antiobiotic_hours`,cast(replace(`j`.`time_of_administration_of_antiobiotic_minute`,'NA',99999) as unsigned) AS `time_of_administration_of_antiobiotic_minute`,`j`.`antibiotic_name` AS `antibiotic_name`,`j`.`antibiotic_name_if_other` AS `antibiotic_name_if_other`,`j`.`grade_of_antibiotic` AS `grade_of_antibiotic`,`j`.`date_of_blood_samples_sent_for_culture_test` AS `date_of_blood_samples_sent_for_culture_test`,cast(replace(`j`.`time_of_blood_samples_sent_for_culture_test_hours`,'NA',99999) as unsigned) AS `time_of_blood_samples_sent_for_culture_test_hours`,cast(replace(`j`.`time_of_blood_samples_sent_for_culture_test_minute`,'NA',99999) as unsigned) AS `time_of_blood_samples_sent_for_culture_test_minute`,`j`.`blood_sample_taken_prior_to_antiobiotic_administration` AS `blood_sample_taken_prior_to_antiobiotic_administration`,cast(replace(`k`.`days_of_stay_in_hospital`,'NA',99999) as unsigned) AS `days_of_stay_in_hospital`,`k`.`final_diagnosis_sepsis` AS `final_diagnosis_sepsis`,`k`.`final_diagnosis_rds` AS `final_diagnosis_rds`,`k`.`final_diagnosis_ttnb` AS `final_diagnosis_ttnb`,`k`.`final_diagnosis_jaundice` AS `final_diagnosis_jaundice`,`k`.`final_diagnosis_lbw` AS `final_diagnosis_lbw`,`k`.`final_diagnosis_lga` AS `final_diagnosis_lga`,`k`.`final_diagnosis_aga` AS `final_diagnosis_aga`,`k`.`final_diagnosis_sga` AS `final_diagnosis_sga`,`k`.`final_diagnosis_anemia` AS `final_diagnosis_anemia`,`k`.`final_diagnosis_dextochordia` AS `final_diagnosis_dextochordia`,`k`.`final_diagnosis_hypoglycemia` AS `final_diagnosis_hypoglycemia`,`k`.`final_diagnosis_hypocalcemia` AS `final_diagnosis_hypocalcemia`,`k`.`final_diagnosis_gastroenteritis` AS `final_diagnosis_gastroenteritis`,`k`.`final_diagnosis_perinatal_respiratory_depression` AS `final_diagnosis_perinatal_respiratory_depression`,`k`.`final_diagnosis_shock` AS `final_diagnosis_shock`,`k`.`final_diagnosis_feeding_intolerence` AS `final_diagnosis_feeding_intolerence`,`k`.`baby_discharge_date` AS `baby_discharge_date`,`k`.`final_diagnosis_pulmonary_hemerrage` AS `final_diagnosis_pulmonary_hemerrage`,`k`.`final_diagnosis_thrombocytopenia` AS `final_diagnosis_thrombocytopenia`,`k`.`final_diagnosis_eos_los` AS `final_diagnosis_eos_los`,`k`.`final_diagnosis_other` AS `final_diagnosis_other` from ((((((((`patient_basic_infos` `a` join `patient_baby_appears_infos` `d` on((`a`.`id` = `d`.`study_id`))) join `patient_baby_resp_infos` `e` on(((`a`.`id` = `e`.`study_id`) and (`d`.`reading` = `e`.`reading`)))) join `patient_baby_cv_infos` `f` on(((`a`.`id` = `f`.`study_id`) and (`d`.`reading` = `f`.`reading`)))) join `patient_baby_cns_infos` `g` on(((`a`.`id` = `g`.`study_id`) and (`d`.`reading` = `g`.`reading`)))) join `patient_baby_git_infos` `h` on(((`a`.`id` = `h`.`study_id`) and (`d`.`reading` = `h`.`reading`)))) join `patient_baby_investigations` `i` on(((`a`.`id` = `i`.`study_id`) and (`d`.`reading` = `i`.`reading`)))) join `patient_baby_antibiotics` `j` on(((`a`.`id` = `j`.`study_id`) and (`d`.`reading` = `j`.`reading`)))) join `patient_baby_finals` `k` on(((`a`.`id` = `k`.`study_id`) and (`d`.`reading` = `k`.`reading`)))) where (`a`.`hospital_type` <> 7) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_ml_data_old`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_ml_data_old`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_ml_data_old` AS select `vw_get_ml_data`.`study_id` AS `study_id`,`vw_get_ml_data`.`baby_medical_record_number` AS `baby_medical_record_number`,`vw_get_ml_data`.`reading` AS `reading`,`vw_get_ml_data`.`baby_appearance` AS `baby_appearance`,`vw_get_ml_data`.`baby_skin_colour` AS `baby_skin_colour`,`vw_get_ml_data`.`baby_cry_sound` AS `baby_cry_sound`,`vw_get_ml_data`.`baby_cry_sound_status` AS `baby_cry_sound_status`,`vw_get_ml_data`.`hypotonia_muscular_response_one_min_after_birth` AS `hypotonia_muscular_response_one_min_after_birth`,`vw_get_ml_data`.`hypotonia_muscular_response_five_min_after_birth` AS `hypotonia_muscular_response_five_min_after_birth`,`vw_get_ml_data`.`excessive_sleeping` AS `excessive_sleeping`,`vw_get_ml_data`.`hypothermia` AS `hypothermia`,`vw_get_ml_data`.`hypothermia_status_value` AS `hypothermia_status_value`,`vw_get_ml_data`.`baby_feeding_status` AS `baby_feeding_status`,`vw_get_ml_data`.`baby_presence_of_convulsions` AS `baby_presence_of_convulsions`,`vw_get_ml_data`.`baby_jaundice` AS `baby_jaundice`,`vw_get_ml_data`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`vw_get_ml_data`.`kangaroo_mother_care` AS `kangaroo_mother_care`,`vw_get_ml_data`.`hypothermia_status` AS `hypothermia_status`,`vw_get_ml_data`.`groaning` AS `groaning`,`vw_get_ml_data`.`grunting` AS `grunting`,`vw_get_ml_data`.`stridor` AS `stridor`,`vw_get_ml_data`.`retraction` AS `retraction`,`vw_get_ml_data`.`fast_breathing` AS `fast_breathing`,`vw_get_ml_data`.`oxygen_saturation` AS `oxygen_saturation`,`vw_get_ml_data`.`breathing_rate` AS `breathing_rate`,`vw_get_ml_data`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`vw_get_ml_data`.`x_ray_status_done` AS `x_ray_status_done`,`vw_get_ml_data`.`x_ray_result` AS `x_ray_result`,`vw_get_ml_data`.`x_ray_diagnosis_any_other` AS `x_ray_diagnosis_any_other`,`vw_get_ml_data`.`x_ray_status` AS `x_ray_status`,`vw_get_ml_data`.`apnea_status` AS `apnea_status`,`vw_get_ml_data`.`apnea_diagnosis` AS `apnea_diagnosis`,`vw_get_ml_data`.`baby_respiratory_support` AS `baby_respiratory_support`,`vw_get_ml_data`.`baby_respiratory_support_if_yes` AS `baby_respiratory_support_if_yes`,`vw_get_ml_data`.`heart_rate` AS `heart_rate`,`vw_get_ml_data`.`urine_output` AS `urine_output`,`vw_get_ml_data`.`baby_blood_pressure_mean_arterial_bp` AS `baby_blood_pressure_mean_arterial_bp`,`vw_get_ml_data`.`baby_blood_pressure_upper_limb` AS `baby_blood_pressure_upper_limb`,`vw_get_ml_data`.`baby_blood_pressure_lower_limb` AS `baby_blood_pressure_lower_limb`,`vw_get_ml_data`.`capillary_refill` AS `capillary_refill`,`vw_get_ml_data`.`capillary_refill_unit` AS `capillary_refill_unit`,`vw_get_ml_data`.`low_peripheral_pulse_volume` AS `low_peripheral_pulse_volume`,`vw_get_ml_data`.`cool_peripheries` AS `cool_peripheries`,`vw_get_ml_data`.`two_d_echo_done` AS `two_d_echo_done`,`vw_get_ml_data`.`two_d_echo_done_if_yes` AS `two_d_echo_done_if_yes`,`vw_get_ml_data`.`baby_on_ionotropes` AS `baby_on_ionotropes`,`vw_get_ml_data`.`central_line` AS `central_line`,`vw_get_ml_data`.`skin_pustules` AS `skin_pustules`,`vw_get_ml_data`.`infusion_of_blood_products` AS `infusion_of_blood_products`,`vw_get_ml_data`.`features_of_encephalopathy` AS `features_of_encephalopathy`,`vw_get_ml_data`.`seizures` AS `seizures`,`vw_get_ml_data`.`abnormal_movements_like_tonic_posturing` AS `abnormal_movements_like_tonic_posturing`,`vw_get_ml_data`.`af_bulge` AS `af_bulge`,`vw_get_ml_data`.`patient_id` AS `patient_id`,`vw_get_ml_data`.`abdominal_dystension` AS `abdominal_dystension`,`vw_get_ml_data`.`frequency_of_stools` AS `frequency_of_stools`,`vw_get_ml_data`.`diarrhea` AS `diarrhea`,`vw_get_ml_data`.`vomiting` AS `vomiting`,`vw_get_ml_data`.`feeding_intolerance` AS `feeding_intolerance`,`vw_get_ml_data`.`baby_movement` AS `baby_movement`,`vw_get_ml_data`.`baby_thyroid_status` AS `baby_thyroid_status`,`vw_get_ml_data`.`baby_thyroid_result` AS `baby_thyroid_result`,`vw_get_ml_data`.`baby_blood_glucose` AS `baby_blood_glucose`,`vw_get_ml_data`.`baby_haemoglobin_levels` AS `baby_haemoglobin_levels`,`vw_get_ml_data`.`baby_c_reactive_protien_levels` AS `baby_c_reactive_protien_levels`,`vw_get_ml_data`.`micro_esr` AS `micro_esr`,`vw_get_ml_data`.`baby_procalcitonin_levels` AS `baby_procalcitonin_levels`,`vw_get_ml_data`.`total_leucocute_count_unit` AS `total_leucocute_count_unit`,`vw_get_ml_data`.`total_leucocute_count` AS `total_leucocute_count`,`vw_get_ml_data`.`absolute_neutrophil_count` AS `absolute_neutrophil_count`,`vw_get_ml_data`.`absolute_neutrophil_count_unit` AS `absolute_neutrophil_count_unit`,`vw_get_ml_data`.`immature_to_mature_neutrophil_ratios` AS `immature_to_mature_neutrophil_ratios`,`vw_get_ml_data`.`thrombocytopenia_unit` AS `thrombocytopenia_unit`,`vw_get_ml_data`.`thrombocytopenia` AS `thrombocytopenia`,`vw_get_ml_data`.`urine_rest_for_pus_cells` AS `urine_rest_for_pus_cells`,`vw_get_ml_data`.`urine_culture_test` AS `urine_culture_test`,`vw_get_ml_data`.`blood_culture_report` AS `blood_culture_report`,`vw_get_ml_data`.`gram_positive_bacteria` AS `gram_positive_bacteria`,`vw_get_ml_data`.`gram_positive_bacteria_if_other` AS `gram_positive_bacteria_if_other`,`vw_get_ml_data`.`gram_negative_bacteria` AS `gram_negative_bacteria`,`vw_get_ml_data`.`gram_negative_bacteria_if_other` AS `gram_negative_bacteria_if_other`,`vw_get_ml_data`.`fungi` AS `fungi`,`vw_get_ml_data`.`other_organism` AS `other_organism`,`vw_get_ml_data`.`antibiotic_status` AS `antibiotic_status`,`vw_get_ml_data`.`antibiotic_status_resisitant` AS `antibiotic_status_resisitant`,`vw_get_ml_data`.`antibiotic_status_intermediate` AS `antibiotic_status_intermediate`,`vw_get_ml_data`.`sodium` AS `sodium`,`vw_get_ml_data`.`potassium` AS `potassium`,`vw_get_ml_data`.`chlorine` AS `chlorine`,`vw_get_ml_data`.`calcium` AS `calcium`,`vw_get_ml_data`.`phosphate` AS `phosphate`,`vw_get_ml_data`.`magnesium` AS `magnesium`,`vw_get_ml_data`.`urea` AS `urea`,`vw_get_ml_data`.`creatinine` AS `creatinine`,`vw_get_ml_data`.`lactate_levels` AS `lactate_levels`,`vw_get_ml_data`.`bilirubin_levels` AS `bilirubin_levels`,`vw_get_ml_data`.`cord_ph` AS `cord_ph`,`vw_get_ml_data`.`arrhythmia` AS `arrhythmia`,`vw_get_ml_data`.`csf_culture` AS `csf_culture`,`vw_get_ml_data`.`csf_culture_tsb_value` AS `csf_culture_tsb_value`,`vw_get_ml_data`.`antibiotic_status_value` AS `antibiotic_status_value`,`vw_get_ml_data`.`antibiotic_given` AS `antibiotic_given`,`vw_get_ml_data`.`date_of_administration_of_antiobiotic` AS `date_of_administration_of_antiobiotic`,`vw_get_ml_data`.`time_of_administration_of_antiobiotic_hours` AS `time_of_administration_of_antiobiotic_hours`,`vw_get_ml_data`.`time_of_administration_of_antiobiotic_minute` AS `time_of_administration_of_antiobiotic_minute`,`vw_get_ml_data`.`antibiotic_name` AS `antibiotic_name`,`vw_get_ml_data`.`antibiotic_name_if_other` AS `antibiotic_name_if_other`,`vw_get_ml_data`.`grade_of_antibiotic` AS `grade_of_antibiotic`,`vw_get_ml_data`.`date_of_blood_samples_sent_for_culture_test` AS `date_of_blood_samples_sent_for_culture_test`,`vw_get_ml_data`.`time_of_blood_samples_sent_for_culture_test_hours` AS `time_of_blood_samples_sent_for_culture_test_hours`,`vw_get_ml_data`.`time_of_blood_samples_sent_for_culture_test_minute` AS `time_of_blood_samples_sent_for_culture_test_minute`,`vw_get_ml_data`.`blood_sample_taken_prior_to_antiobiotic_administration` AS `blood_sample_taken_prior_to_antiobiotic_administration`,`vw_get_ml_data`.`days_of_stay_in_hospital` AS `days_of_stay_in_hospital`,`vw_get_ml_data`.`final_diagnosis_sepsis` AS `final_diagnosis_sepsis`,`vw_get_ml_data`.`final_diagnosis_rds` AS `final_diagnosis_rds`,`vw_get_ml_data`.`final_diagnosis_ttnb` AS `final_diagnosis_ttnb`,`vw_get_ml_data`.`final_diagnosis_jaundice` AS `final_diagnosis_jaundice`,`vw_get_ml_data`.`final_diagnosis_lbw` AS `final_diagnosis_lbw`,`vw_get_ml_data`.`final_diagnosis_lga` AS `final_diagnosis_lga`,`vw_get_ml_data`.`final_diagnosis_aga` AS `final_diagnosis_aga`,`vw_get_ml_data`.`final_diagnosis_sga` AS `final_diagnosis_sga`,`vw_get_ml_data`.`final_diagnosis_anemia` AS `final_diagnosis_anemia`,`vw_get_ml_data`.`final_diagnosis_dextochordia` AS `final_diagnosis_dextochordia`,`vw_get_ml_data`.`final_diagnosis_hypoglycemia` AS `final_diagnosis_hypoglycemia`,`vw_get_ml_data`.`final_diagnosis_hypocalcemia` AS `final_diagnosis_hypocalcemia`,`vw_get_ml_data`.`final_diagnosis_gastroenteritis` AS `final_diagnosis_gastroenteritis`,`vw_get_ml_data`.`final_diagnosis_perinatal_respiratory_depression` AS `final_diagnosis_perinatal_respiratory_depression`,`vw_get_ml_data`.`final_diagnosis_shock` AS `final_diagnosis_shock`,`vw_get_ml_data`.`final_diagnosis_feeding_intolerence` AS `final_diagnosis_feeding_intolerence`,`vw_get_ml_data`.`baby_discharge_date` AS `baby_discharge_date`,`vw_get_ml_data`.`final_diagnosis_pulmonary_hemerrage` AS `final_diagnosis_pulmonary_hemerrage`,`vw_get_ml_data`.`final_diagnosis_thrombocytopenia` AS `final_diagnosis_thrombocytopenia`,`vw_get_ml_data`.`final_diagnosis_eos_los` AS `final_diagnosis_eos_los`,`vw_get_ml_data`.`final_diagnosis_other` AS `final_diagnosis_other` from `vw_get_ml_data` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_ml_data_ritesh`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_ml_data_ritesh`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_ml_data_ritesh` AS select `vw_get_ml_data`.`study_id` AS `study_id`,`vw_get_ml_data`.`baby_medical_record_number` AS `baby_medical_record_number`,`vw_get_ml_data`.`reading` AS `reading`,`vw_get_ml_data`.`baby_appearance` AS `baby_appearance`,`vw_get_ml_data`.`baby_skin_colour` AS `baby_skin_colour`,`vw_get_ml_data`.`baby_cry_sound` AS `baby_cry_sound`,`vw_get_ml_data`.`baby_cry_sound_status` AS `baby_cry_sound_status`,`vw_get_ml_data`.`hypotonia_muscular_response_one_min_after_birth` AS `hypotonia_muscular_response_one_min_after_birth`,`vw_get_ml_data`.`hypotonia_muscular_response_five_min_after_birth` AS `hypotonia_muscular_response_five_min_after_birth`,`vw_get_ml_data`.`excessive_sleeping` AS `excessive_sleeping`,`vw_get_ml_data`.`hypothermia` AS `hypothermia`,`vw_get_ml_data`.`hypothermia_status_value` AS `hypothermia_status_value`,`vw_get_ml_data`.`baby_feeding_status` AS `baby_feeding_status`,`vw_get_ml_data`.`baby_presence_of_convulsions` AS `baby_presence_of_convulsions`,`vw_get_ml_data`.`baby_jaundice` AS `baby_jaundice`,`vw_get_ml_data`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`vw_get_ml_data`.`kangaroo_mother_care` AS `kangaroo_mother_care`,`vw_get_ml_data`.`hypothermia_status` AS `hypothermia_status`,`vw_get_ml_data`.`groaning` AS `groaning`,`vw_get_ml_data`.`grunting` AS `grunting`,`vw_get_ml_data`.`stridor` AS `stridor`,`vw_get_ml_data`.`retraction` AS `retraction`,`vw_get_ml_data`.`fast_breathing` AS `fast_breathing`,`vw_get_ml_data`.`oxygen_saturation` AS `oxygen_saturation`,`vw_get_ml_data`.`breathing_rate` AS `breathing_rate`,`vw_get_ml_data`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`vw_get_ml_data`.`x_ray_status_done` AS `x_ray_status_done`,`vw_get_ml_data`.`x_ray_result` AS `x_ray_result`,`vw_get_ml_data`.`x_ray_diagnosis_any_other` AS `x_ray_diagnosis_any_other`,`vw_get_ml_data`.`x_ray_status` AS `x_ray_status`,`vw_get_ml_data`.`apnea_status` AS `apnea_status`,`vw_get_ml_data`.`apnea_diagnosis` AS `apnea_diagnosis`,`vw_get_ml_data`.`baby_respiratory_support` AS `baby_respiratory_support`,`vw_get_ml_data`.`baby_respiratory_support_if_yes` AS `baby_respiratory_support_if_yes`,`vw_get_ml_data`.`heart_rate` AS `heart_rate`,`vw_get_ml_data`.`urine_output` AS `urine_output`,`vw_get_ml_data`.`baby_blood_pressure_mean_arterial_bp` AS `baby_blood_pressure_mean_arterial_bp`,`vw_get_ml_data`.`baby_blood_pressure_upper_limb` AS `baby_blood_pressure_upper_limb`,`vw_get_ml_data`.`baby_blood_pressure_lower_limb` AS `baby_blood_pressure_lower_limb`,`vw_get_ml_data`.`capillary_refill` AS `capillary_refill`,`vw_get_ml_data`.`capillary_refill_unit` AS `capillary_refill_unit`,`vw_get_ml_data`.`low_peripheral_pulse_volume` AS `low_peripheral_pulse_volume`,`vw_get_ml_data`.`cool_peripheries` AS `cool_peripheries`,`vw_get_ml_data`.`two_d_echo_done` AS `two_d_echo_done`,`vw_get_ml_data`.`two_d_echo_done_if_yes` AS `two_d_echo_done_if_yes`,`vw_get_ml_data`.`baby_on_ionotropes` AS `baby_on_ionotropes`,`vw_get_ml_data`.`central_line` AS `central_line`,`vw_get_ml_data`.`skin_pustules` AS `skin_pustules`,`vw_get_ml_data`.`infusion_of_blood_products` AS `infusion_of_blood_products`,`vw_get_ml_data`.`features_of_encephalopathy` AS `features_of_encephalopathy`,`vw_get_ml_data`.`seizures` AS `seizures`,`vw_get_ml_data`.`abnormal_movements_like_tonic_posturing` AS `abnormal_movements_like_tonic_posturing`,`vw_get_ml_data`.`af_bulge` AS `af_bulge`,`vw_get_ml_data`.`patient_id` AS `patient_id`,`vw_get_ml_data`.`abdominal_dystension` AS `abdominal_dystension`,`vw_get_ml_data`.`frequency_of_stools` AS `frequency_of_stools`,`vw_get_ml_data`.`diarrhea` AS `diarrhea`,`vw_get_ml_data`.`vomiting` AS `vomiting`,`vw_get_ml_data`.`feeding_intolerance` AS `feeding_intolerance`,`vw_get_ml_data`.`baby_movement` AS `baby_movement`,`vw_get_ml_data`.`baby_thyroid_status` AS `baby_thyroid_status`,`vw_get_ml_data`.`baby_thyroid_result` AS `baby_thyroid_result`,`vw_get_ml_data`.`baby_blood_glucose` AS `baby_blood_glucose`,`vw_get_ml_data`.`baby_haemoglobin_levels` AS `baby_haemoglobin_levels`,`vw_get_ml_data`.`baby_c_reactive_protien_levels` AS `baby_c_reactive_protien_levels`,`vw_get_ml_data`.`micro_esr` AS `micro_esr`,`vw_get_ml_data`.`baby_procalcitonin_levels` AS `baby_procalcitonin_levels`,`vw_get_ml_data`.`total_leucocute_count_unit` AS `total_leucocute_count_unit`,`vw_get_ml_data`.`total_leucocute_count` AS `total_leucocute_count`,`vw_get_ml_data`.`absolute_neutrophil_count` AS `absolute_neutrophil_count`,`vw_get_ml_data`.`absolute_neutrophil_count_unit` AS `absolute_neutrophil_count_unit`,`vw_get_ml_data`.`immature_to_mature_neutrophil_ratios` AS `immature_to_mature_neutrophil_ratios`,`vw_get_ml_data`.`thrombocytopenia_unit` AS `thrombocytopenia_unit`,`vw_get_ml_data`.`thrombocytopenia` AS `thrombocytopenia`,`vw_get_ml_data`.`urine_rest_for_pus_cells` AS `urine_rest_for_pus_cells`,`vw_get_ml_data`.`urine_culture_test` AS `urine_culture_test`,`vw_get_ml_data`.`blood_culture_report` AS `blood_culture_report`,`vw_get_ml_data`.`gram_positive_bacteria` AS `gram_positive_bacteria`,`vw_get_ml_data`.`gram_positive_bacteria_if_other` AS `gram_positive_bacteria_if_other`,`vw_get_ml_data`.`gram_negative_bacteria` AS `gram_negative_bacteria`,`vw_get_ml_data`.`gram_negative_bacteria_if_other` AS `gram_negative_bacteria_if_other`,`vw_get_ml_data`.`fungi` AS `fungi`,`vw_get_ml_data`.`other_organism` AS `other_organism`,`vw_get_ml_data`.`antibiotic_status` AS `antibiotic_status`,`vw_get_ml_data`.`antibiotic_status_resisitant` AS `antibiotic_status_resisitant`,`vw_get_ml_data`.`antibiotic_status_intermediate` AS `antibiotic_status_intermediate`,`vw_get_ml_data`.`sodium` AS `sodium`,`vw_get_ml_data`.`potassium` AS `potassium`,`vw_get_ml_data`.`chlorine` AS `chlorine`,`vw_get_ml_data`.`calcium` AS `calcium`,`vw_get_ml_data`.`phosphate` AS `phosphate`,`vw_get_ml_data`.`magnesium` AS `magnesium`,`vw_get_ml_data`.`urea` AS `urea`,`vw_get_ml_data`.`creatinine` AS `creatinine`,`vw_get_ml_data`.`lactate_levels` AS `lactate_levels`,`vw_get_ml_data`.`bilirubin_levels` AS `bilirubin_levels`,`vw_get_ml_data`.`cord_ph` AS `cord_ph`,`vw_get_ml_data`.`arrhythmia` AS `arrhythmia`,`vw_get_ml_data`.`csf_culture` AS `csf_culture`,`vw_get_ml_data`.`csf_culture_tsb_value` AS `csf_culture_tsb_value`,`vw_get_ml_data`.`antibiotic_status_value` AS `antibiotic_status_value`,`vw_get_ml_data`.`antibiotic_given` AS `antibiotic_given`,`vw_get_ml_data`.`date_of_administration_of_antiobiotic` AS `date_of_administration_of_antiobiotic`,`vw_get_ml_data`.`time_of_administration_of_antiobiotic_hours` AS `time_of_administration_of_antiobiotic_hours`,`vw_get_ml_data`.`time_of_administration_of_antiobiotic_minute` AS `time_of_administration_of_antiobiotic_minute`,`vw_get_ml_data`.`antibiotic_name` AS `antibiotic_name`,`vw_get_ml_data`.`antibiotic_name_if_other` AS `antibiotic_name_if_other`,`vw_get_ml_data`.`grade_of_antibiotic` AS `grade_of_antibiotic`,`vw_get_ml_data`.`date_of_blood_samples_sent_for_culture_test` AS `date_of_blood_samples_sent_for_culture_test`,`vw_get_ml_data`.`time_of_blood_samples_sent_for_culture_test_hours` AS `time_of_blood_samples_sent_for_culture_test_hours`,`vw_get_ml_data`.`time_of_blood_samples_sent_for_culture_test_minute` AS `time_of_blood_samples_sent_for_culture_test_minute`,`vw_get_ml_data`.`blood_sample_taken_prior_to_antiobiotic_administration` AS `blood_sample_taken_prior_to_antiobiotic_administration`,`vw_get_ml_data`.`days_of_stay_in_hospital` AS `days_of_stay_in_hospital`,`vw_get_ml_data`.`final_diagnosis_sepsis` AS `final_diagnosis_sepsis`,`vw_get_ml_data`.`final_diagnosis_rds` AS `final_diagnosis_rds`,`vw_get_ml_data`.`final_diagnosis_ttnb` AS `final_diagnosis_ttnb`,`vw_get_ml_data`.`final_diagnosis_jaundice` AS `final_diagnosis_jaundice`,`vw_get_ml_data`.`final_diagnosis_lbw` AS `final_diagnosis_lbw`,`vw_get_ml_data`.`final_diagnosis_lga` AS `final_diagnosis_lga`,`vw_get_ml_data`.`final_diagnosis_aga` AS `final_diagnosis_aga`,`vw_get_ml_data`.`final_diagnosis_sga` AS `final_diagnosis_sga`,`vw_get_ml_data`.`final_diagnosis_anemia` AS `final_diagnosis_anemia`,`vw_get_ml_data`.`final_diagnosis_dextochordia` AS `final_diagnosis_dextochordia`,`vw_get_ml_data`.`final_diagnosis_hypoglycemia` AS `final_diagnosis_hypoglycemia`,`vw_get_ml_data`.`final_diagnosis_hypocalcemia` AS `final_diagnosis_hypocalcemia`,`vw_get_ml_data`.`final_diagnosis_gastroenteritis` AS `final_diagnosis_gastroenteritis`,`vw_get_ml_data`.`final_diagnosis_perinatal_respiratory_depression` AS `final_diagnosis_perinatal_respiratory_depression`,`vw_get_ml_data`.`final_diagnosis_shock` AS `final_diagnosis_shock`,`vw_get_ml_data`.`final_diagnosis_feeding_intolerence` AS `final_diagnosis_feeding_intolerence`,`vw_get_ml_data`.`baby_discharge_date` AS `baby_discharge_date`,`vw_get_ml_data`.`final_diagnosis_pulmonary_hemerrage` AS `final_diagnosis_pulmonary_hemerrage`,`vw_get_ml_data`.`final_diagnosis_thrombocytopenia` AS `final_diagnosis_thrombocytopenia`,`vw_get_ml_data`.`final_diagnosis_eos_los` AS `final_diagnosis_eos_los`,`vw_get_ml_data`.`final_diagnosis_other` AS `final_diagnosis_other` from `avyantra_staging`.`vw_get_ml_data` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_get_staffs`
--

/*!50001 DROP VIEW IF EXISTS `vw_get_staffs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_get_staffs` AS select `map_staff_hospitals`.`hospital_id` AS `hospital_id`,`map_staff_hospitals`.`hospital_branch_id` AS `hospital_branch_id`,`map_staff_hospitals`.`staff_id` AS `staff_id`,`m_staffs`.`first_name` AS `first_name`,`m_staffs`.`last_name` AS `last_name`,`m_staffs`.`hospital_branch_speciality_id` AS `hospital_branch_speciality_id`,`m_staffs`.`user_id` AS `user_id`,`m_staffs`.`hospital_branch_role_id` AS `hospital_branch_role_id`,`m_users`.`contact_number` AS `contact_number`,`m_users`.`email_address` AS `email_address`,`m_hospital_branch_specialities`.`speciality_id` AS `speciality_id`,`m_specialities`.`speciality` AS `speciality`,`m_hospital_branch_roles`.`role_id` AS `role_id`,`m_roles`.`role` AS `role`,`m_staffs`.`active_flag` AS `status`,`m_users`.`user_name` AS `user_name`,`m_staffs`.`reporting_user_id` AS `reporting_user_id`,`m_users`.`password` AS `password`,`map_staff_hospitals`.`deleted_flag` AS `deleted_flag`,`m_hospitals_branches`.`branch_name` AS `branch_name` from (((((((`map_staff_hospitals` join `m_hospitals_branches` on((`map_staff_hospitals`.`hospital_branch_id` = `m_hospitals_branches`.`hospital_branch_id`))) join `m_staffs` on((`map_staff_hospitals`.`staff_id` = `m_staffs`.`staff_id`))) join `m_users` on((`m_users`.`user_id` = `m_staffs`.`user_id`))) join `m_hospital_branch_specialities` on((`m_hospital_branch_specialities`.`id` = `m_staffs`.`hospital_branch_speciality_id`))) join `m_hospital_branch_roles` on((`m_hospital_branch_roles`.`id` = `m_staffs`.`hospital_branch_role_id`))) join `m_roles` on((`m_roles`.`role_id` = `m_hospital_branch_roles`.`role_id`))) join `m_specialities` on((`m_specialities`.`speciality_id` = `m_hospital_branch_specialities`.`speciality_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_ml`
--

/*!50001 DROP VIEW IF EXISTS `vw_ml`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`avyantradb`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_ml` AS select `vw_get_ml_data`.`baby_medical_record_number` AS `baby_medical_record_number`,`vw_get_ml_data`.`reading` AS `reading`,`vw_get_ml_data`.`baby_appearance` AS `baby_appearance`,`vw_get_ml_data`.`baby_skin_colour` AS `baby_skin_colour`,`vw_get_ml_data`.`baby_cry_sound` AS `baby_cry_sound`,`vw_get_ml_data`.`baby_cry_sound_status` AS `baby_cry_sound_status`,`vw_get_ml_data`.`hypotonia_muscular_response_one_min_after_birth` AS `hypotonia_muscular_response_one_min_after_birth`,`vw_get_ml_data`.`hypotonia_muscular_response_five_min_after_birth` AS `hypotonia_muscular_response_five_min_after_birth`,`vw_get_ml_data`.`excessive_sleeping` AS `excessive_sleeping`,`vw_get_ml_data`.`hypothermia` AS `hypothermia`,`vw_get_ml_data`.`hypothermia_status_value` AS `hypothermia_status_value`,`vw_get_ml_data`.`baby_feeding_status` AS `baby_feeding_status`,`vw_get_ml_data`.`baby_presence_of_convulsions` AS `baby_presence_of_convulsions`,`vw_get_ml_data`.`baby_jaundice` AS `baby_jaundice`,`vw_get_ml_data`.`breast_feeding_initiation` AS `breast_feeding_initiation`,`vw_get_ml_data`.`kangaroo_mother_care` AS `kangaroo_mother_care`,`vw_get_ml_data`.`hypothermia_status` AS `hypothermia_status`,`vw_get_ml_data`.`groaning` AS `groaning`,`vw_get_ml_data`.`grunting` AS `grunting`,`vw_get_ml_data`.`stridor` AS `stridor`,`vw_get_ml_data`.`retraction` AS `retraction`,`vw_get_ml_data`.`fast_breathing` AS `fast_breathing`,`vw_get_ml_data`.`oxygen_saturation` AS `oxygen_saturation`,`vw_get_ml_data`.`breathing_rate` AS `breathing_rate`,`vw_get_ml_data`.`baby_chest_indrawing` AS `baby_chest_indrawing`,`vw_get_ml_data`.`x_ray_status_done` AS `x_ray_status_done`,`vw_get_ml_data`.`x_ray_result` AS `x_ray_result`,`vw_get_ml_data`.`x_ray_diagnosis_any_other` AS `x_ray_diagnosis_any_other`,`vw_get_ml_data`.`x_ray_status` AS `x_ray_status`,`vw_get_ml_data`.`apnea_status` AS `apnea_status`,`vw_get_ml_data`.`apnea_diagnosis` AS `apnea_diagnosis`,`vw_get_ml_data`.`baby_respiratory_support` AS `baby_respiratory_support`,`vw_get_ml_data`.`baby_respiratory_support_if_yes` AS `baby_respiratory_support_if_yes`,`vw_get_ml_data`.`heart_rate` AS `heart_rate`,`vw_get_ml_data`.`urine_output` AS `urine_output`,`vw_get_ml_data`.`baby_blood_pressure_mean_arterial_bp` AS `baby_blood_pressure_mean_arterial_bp`,`vw_get_ml_data`.`baby_blood_pressure_upper_limb` AS `baby_blood_pressure_upper_limb`,`vw_get_ml_data`.`baby_blood_pressure_lower_limb` AS `baby_blood_pressure_lower_limb`,`vw_get_ml_data`.`capillary_refill` AS `capillary_refill`,`vw_get_ml_data`.`capillary_refill_unit` AS `capillary_refill_unit`,`vw_get_ml_data`.`low_peripheral_pulse_volume` AS `low_peripheral_pulse_volume`,`vw_get_ml_data`.`cool_peripheries` AS `cool_peripheries`,`vw_get_ml_data`.`two_d_echo_done` AS `two_d_echo_done`,`vw_get_ml_data`.`two_d_echo_done_if_yes` AS `two_d_echo_done_if_yes`,`vw_get_ml_data`.`baby_on_ionotropes` AS `baby_on_ionotropes`,`vw_get_ml_data`.`central_line` AS `central_line`,`vw_get_ml_data`.`skin_pustules` AS `skin_pustules`,`vw_get_ml_data`.`infusion_of_blood_products` AS `infusion_of_blood_products`,`vw_get_ml_data`.`features_of_encephalopathy` AS `features_of_encephalopathy`,`vw_get_ml_data`.`seizures` AS `seizures`,`vw_get_ml_data`.`abnormal_movements_like_tonic_posturing` AS `abnormal_movements_like_tonic_posturing`,`vw_get_ml_data`.`af_bulge` AS `af_bulge`,`vw_get_ml_data`.`patient_id` AS `patient_id`,`vw_get_ml_data`.`abdominal_dystension` AS `abdominal_dystension`,`vw_get_ml_data`.`frequency_of_stools` AS `frequency_of_stools`,`vw_get_ml_data`.`diarrhea` AS `diarrhea`,`vw_get_ml_data`.`vomiting` AS `vomiting`,`vw_get_ml_data`.`feeding_intolerance` AS `feeding_intolerance`,`vw_get_ml_data`.`baby_movement` AS `baby_movement`,`vw_get_ml_data`.`baby_thyroid_status` AS `baby_thyroid_status`,`vw_get_ml_data`.`baby_thyroid_result` AS `baby_thyroid_result`,`vw_get_ml_data`.`baby_blood_glucose` AS `baby_blood_glucose`,`vw_get_ml_data`.`baby_haemoglobin_levels` AS `baby_haemoglobin_levels`,`vw_get_ml_data`.`baby_c_reactive_protien_levels` AS `baby_c_reactive_protien_levels`,`vw_get_ml_data`.`micro_esr` AS `micro_esr`,`vw_get_ml_data`.`baby_procalcitonin_levels` AS `baby_procalcitonin_levels`,`vw_get_ml_data`.`total_leucocute_count_unit` AS `total_leucocute_count_unit`,`vw_get_ml_data`.`total_leucocute_count` AS `total_leucocute_count`,`vw_get_ml_data`.`absolute_neutrophil_count` AS `absolute_neutrophil_count`,`vw_get_ml_data`.`absolute_neutrophil_count_unit` AS `absolute_neutrophil_count_unit`,`vw_get_ml_data`.`immature_to_mature_neutrophil_ratios` AS `immature_to_mature_neutrophil_ratios`,`vw_get_ml_data`.`thrombocytopenia_unit` AS `thrombocytopenia_unit`,`vw_get_ml_data`.`thrombocytopenia` AS `thrombocytopenia`,`vw_get_ml_data`.`urine_rest_for_pus_cells` AS `urine_rest_for_pus_cells`,`vw_get_ml_data`.`urine_culture_test` AS `urine_culture_test`,`vw_get_ml_data`.`blood_culture_report` AS `blood_culture_report`,`vw_get_ml_data`.`gram_positive_bacteria` AS `gram_positive_bacteria`,`vw_get_ml_data`.`gram_positive_bacteria_if_other` AS `gram_positive_bacteria_if_other`,`vw_get_ml_data`.`gram_negative_bacteria` AS `gram_negative_bacteria`,`vw_get_ml_data`.`gram_negative_bacteria_if_other` AS `gram_negative_bacteria_if_other`,`vw_get_ml_data`.`fungi` AS `fungi`,`vw_get_ml_data`.`other_organism` AS `other_organism`,`vw_get_ml_data`.`antibiotic_status` AS `antibiotic_status`,`vw_get_ml_data`.`antibiotic_status_resisitant` AS `antibiotic_status_resisitant`,`vw_get_ml_data`.`antibiotic_status_intermediate` AS `antibiotic_status_intermediate`,`vw_get_ml_data`.`sodium` AS `sodium`,`vw_get_ml_data`.`potassium` AS `potassium`,`vw_get_ml_data`.`chlorine` AS `chlorine`,`vw_get_ml_data`.`calcium` AS `calcium`,`vw_get_ml_data`.`phosphate` AS `phosphate`,`vw_get_ml_data`.`magnesium` AS `magnesium`,`vw_get_ml_data`.`urea` AS `urea`,`vw_get_ml_data`.`creatinine` AS `creatinine`,`vw_get_ml_data`.`lactate_levels` AS `lactate_levels`,`vw_get_ml_data`.`bilirubin_levels` AS `bilirubin_levels`,`vw_get_ml_data`.`cord_ph` AS `cord_ph`,`vw_get_ml_data`.`arrhythmia` AS `arrhythmia`,`vw_get_ml_data`.`csf_culture` AS `csf_culture`,`vw_get_ml_data`.`csf_culture_tsb_value` AS `csf_culture_tsb_value`,`vw_get_ml_data`.`antibiotic_status_value` AS `antibiotic_status_value`,`vw_get_ml_data`.`antibiotic_given` AS `antibiotic_given`,`vw_get_ml_data`.`date_of_administration_of_antiobiotic` AS `date_of_administration_of_antiobiotic`,`vw_get_ml_data`.`time_of_administration_of_antiobiotic_hours` AS `time_of_administration_of_antiobiotic_hours`,`vw_get_ml_data`.`time_of_administration_of_antiobiotic_minute` AS `time_of_administration_of_antiobiotic_minute`,`vw_get_ml_data`.`antibiotic_name` AS `antibiotic_name`,`vw_get_ml_data`.`antibiotic_name_if_other` AS `antibiotic_name_if_other`,`vw_get_ml_data`.`grade_of_antibiotic` AS `grade_of_antibiotic`,`vw_get_ml_data`.`date_of_blood_samples_sent_for_culture_test` AS `date_of_blood_samples_sent_for_culture_test`,`vw_get_ml_data`.`time_of_blood_samples_sent_for_culture_test_hours` AS `time_of_blood_samples_sent_for_culture_test_hours`,`vw_get_ml_data`.`time_of_blood_samples_sent_for_culture_test_minute` AS `time_of_blood_samples_sent_for_culture_test_minute`,`vw_get_ml_data`.`blood_sample_taken_prior_to_antiobiotic_administration` AS `blood_sample_taken_prior_to_antiobiotic_administration`,`vw_get_ml_data`.`days_of_stay_in_hospital` AS `days_of_stay_in_hospital`,`vw_get_ml_data`.`final_diagnosis_sepsis` AS `final_diagnosis_sepsis`,`vw_get_ml_data`.`final_diagnosis_rds` AS `final_diagnosis_rds`,`vw_get_ml_data`.`final_diagnosis_ttnb` AS `final_diagnosis_ttnb`,`vw_get_ml_data`.`final_diagnosis_jaundice` AS `final_diagnosis_jaundice`,`vw_get_ml_data`.`final_diagnosis_lbw` AS `final_diagnosis_lbw`,`vw_get_ml_data`.`final_diagnosis_lga` AS `final_diagnosis_lga`,`vw_get_ml_data`.`final_diagnosis_aga` AS `final_diagnosis_aga`,`vw_get_ml_data`.`final_diagnosis_sga` AS `final_diagnosis_sga`,`vw_get_ml_data`.`final_diagnosis_anemia` AS `final_diagnosis_anemia`,`vw_get_ml_data`.`final_diagnosis_dextochordia` AS `final_diagnosis_dextochordia`,`vw_get_ml_data`.`final_diagnosis_hypoglycemia` AS `final_diagnosis_hypoglycemia`,`vw_get_ml_data`.`final_diagnosis_hypocalcemia` AS `final_diagnosis_hypocalcemia`,`vw_get_ml_data`.`final_diagnosis_gastroenteritis` AS `final_diagnosis_gastroenteritis`,`vw_get_ml_data`.`final_diagnosis_perinatal_respiratory_depression` AS `final_diagnosis_perinatal_respiratory_depression`,`vw_get_ml_data`.`final_diagnosis_shock` AS `final_diagnosis_shock`,`vw_get_ml_data`.`final_diagnosis_feeding_intolerence` AS `final_diagnosis_feeding_intolerence`,`vw_get_ml_data`.`baby_discharge_date` AS `baby_discharge_date`,`vw_get_ml_data`.`final_diagnosis_pulmonary_hemerrage` AS `final_diagnosis_pulmonary_hemerrage`,`vw_get_ml_data`.`final_diagnosis_thrombocytopenia` AS `final_diagnosis_thrombocytopenia`,`vw_get_ml_data`.`final_diagnosis_eos_los` AS `final_diagnosis_eos_los`,`vw_get_ml_data`.`final_diagnosis_other` AS `final_diagnosis_other` from `avyantra_staging`.`vw_get_ml_data` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-12 10:19:41
