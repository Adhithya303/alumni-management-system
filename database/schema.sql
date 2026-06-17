CREATE DATABASE IF NOT EXISTS alumni_db;
USE alumni_db;

DROP VIEW IF EXISTS alumni_event_view;
DROP VIEW IF EXISTS alumni_details;
DROP FUNCTION IF EXISTS skill_count;
DROP PROCEDURE IF EXISTS add_alumni;
DROP TRIGGER IF EXISTS check_email_before_insert;
DROP TRIGGER IF EXISTS check_username_before_insert;

DROP TABLE IF EXISTS EVENT_PARTICIPATION;
DROP TABLE IF EXISTS EVENT;
DROP TABLE IF EXISTS ALUMNI_SKILL;
DROP TABLE IF EXISTS SKILL;
DROP TABLE IF EXISTS JOB;
DROP TABLE IF EXISTS USER_ACCOUNT;
DROP TABLE IF EXISTS EDUCATION;
DROP TABLE IF EXISTS COMPANY;
DROP TABLE IF EXISTS ALUMNI;

CREATE TABLE ALUMNI (
  alumni_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  dob DATE,
  gender VARCHAR(10)
);

CREATE TABLE EDUCATION (
  edu_id INT AUTO_INCREMENT PRIMARY KEY,
  alumni_id INT,
  degree VARCHAR(50),
  department VARCHAR(50),
  college_name VARCHAR(100),
  graduation_year INT,
  FOREIGN KEY (alumni_id) REFERENCES ALUMNI(alumni_id) ON DELETE CASCADE
);

CREATE TABLE COMPANY (
  company_id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(100),
  industry VARCHAR(50),
  location VARCHAR(100)
);

CREATE TABLE JOB (
  job_id INT AUTO_INCREMENT PRIMARY KEY,
  alumni_id INT,
  company_id INT,
  job_title VARCHAR(50),
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (alumni_id) REFERENCES ALUMNI(alumni_id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES COMPANY(company_id) ON DELETE CASCADE
);

CREATE TABLE SKILL (
  skill_id INT AUTO_INCREMENT PRIMARY KEY,
  skill_name VARCHAR(50) UNIQUE
);

CREATE TABLE ALUMNI_SKILL (
  alumni_id INT,
  skill_id INT,
  PRIMARY KEY (alumni_id, skill_id),
  FOREIGN KEY (alumni_id) REFERENCES ALUMNI(alumni_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES SKILL(skill_id) ON DELETE CASCADE
);

CREATE TABLE EVENT (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(100),
  event_date DATE,
  location VARCHAR(100)
);

CREATE TABLE EVENT_PARTICIPATION (
  alumni_id INT,
  event_id INT,
  role VARCHAR(50),
  PRIMARY KEY (alumni_id, event_id),
  FOREIGN KEY (alumni_id) REFERENCES ALUMNI(alumni_id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES EVENT(event_id) ON DELETE CASCADE
);

CREATE TABLE USER_ACCOUNT (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  alumni_id INT UNIQUE,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'alumni') DEFAULT 'alumni',
  FOREIGN KEY (alumni_id) REFERENCES ALUMNI(alumni_id) ON DELETE CASCADE
);

DELIMITER $$
CREATE TRIGGER check_email_before_insert
BEFORE INSERT ON ALUMNI
FOR EACH ROW
BEGIN
  IF EXISTS (SELECT 1 FROM ALUMNI WHERE email = NEW.email) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Email already exists';
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER check_username_before_insert
BEFORE INSERT ON USER_ACCOUNT
FOR EACH ROW
BEGIN
  IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE username = NEW.username) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Username already taken';
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE add_alumni(
  IN p_name VARCHAR(100),
  IN p_email VARCHAR(100),
  IN p_phone VARCHAR(15),
  IN p_dob DATE,
  IN p_gender VARCHAR(10)
)
BEGIN
  INSERT INTO ALUMNI(name, email, phone, dob, gender)
  VALUES (p_name, p_email, p_phone, p_dob, p_gender);
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION skill_count(a_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE total INT;
  SELECT COUNT(*) INTO total FROM ALUMNI_SKILL WHERE alumni_id = a_id;
  RETURN total;
END$$
DELIMITER ;

CREATE VIEW alumni_details AS
SELECT
  A.alumni_id,
  A.name,
  A.email,
  A.phone,
  A.dob,
  A.gender,
  E.degree,
  E.department,
  E.graduation_year,
  J.job_title,
  C.company_name,
  C.industry,
  C.location
FROM ALUMNI A
LEFT JOIN EDUCATION E ON A.alumni_id = E.alumni_id
LEFT JOIN JOB J ON A.alumni_id = J.alumni_id
LEFT JOIN COMPANY C ON J.company_id = C.company_id;

CREATE VIEW alumni_event_view AS
SELECT A.name, EV.event_name, EV.event_date, EP.role
FROM ALUMNI A
JOIN EVENT_PARTICIPATION EP ON A.alumni_id = EP.alumni_id
JOIN EVENT EV ON EP.event_id = EV.event_id;
