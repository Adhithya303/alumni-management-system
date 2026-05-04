USE alumni_db;

DELETE FROM EDUCATION WHERE alumni_id BETWEEN 7 AND 26;
DELETE FROM JOB WHERE alumni_id BETWEEN 7 AND 26;
DELETE FROM ALUMNI_SKILL WHERE alumni_id BETWEEN 7 AND 26;
DELETE FROM EVENT_PARTICIPATION WHERE alumni_id BETWEEN 7 AND 26;
DELETE FROM USER_ACCOUNT WHERE alumni_id BETWEEN 7 AND 26;

INSERT INTO EDUCATION (alumni_id, degree, department, college_name, graduation_year)
SELECT A.alumni_id, T.degree, T.department, T.college_name, T.graduation_year
FROM (
  SELECT 'alumni06@example.com' AS email,'B.Tech' AS degree,'Computer Science' AS department,'ABC Engineering College' AS college_name,2014 AS graduation_year
  UNION ALL SELECT 'alumni07@example.com','B.Sc','Information Technology','XYZ College',2015
  UNION ALL SELECT 'alumni08@example.com','BBA','Business Administration','Metro Business School',2013
  UNION ALL SELECT 'alumni09@example.com','MCA','Computer Applications','National Tech University',2016
  UNION ALL SELECT 'alumni10@example.com','MBA','Finance','Global Management Institute',2017
  UNION ALL SELECT 'alumni11@example.com','B.Tech','Electronics','State Institute of Tech',2014
  UNION ALL SELECT 'alumni12@example.com','B.Sc','Mathematics','City College',2015
  UNION ALL SELECT 'alumni13@example.com','B.Com','Accounting','Commerce Academy',2013
  UNION ALL SELECT 'alumni14@example.com','M.Tech','Data Science','Tech University',2018
  UNION ALL SELECT 'alumni15@example.com','MBA','Marketing','Business School',2017
  UNION ALL SELECT 'alumni16@example.com','BCA','Computer Applications','Regional College',2014
  UNION ALL SELECT 'alumni17@example.com','B.Tech','Mechanical','Engineering College',2015
  UNION ALL SELECT 'alumni18@example.com','B.Sc','Physics','Science College',2013
  UNION ALL SELECT 'alumni19@example.com','MBA','HR','Management Institute',2017
  UNION ALL SELECT 'alumni20@example.com','M.Sc','IT','Institute of Tech',2018
  UNION ALL SELECT 'alumni21@example.com','B.Tech','Civil','Engineering College',2014
  UNION ALL SELECT 'alumni22@example.com','B.Sc','Statistics','City College',2015
  UNION ALL SELECT 'alumni23@example.com','BBA','Operations','Business School',2013
  UNION ALL SELECT 'alumni24@example.com','MCA','Software','National Tech University',2016
  UNION ALL SELECT 'alumni25@example.com','MBA','Finance','Global Management Institute',2017
) T
JOIN ALUMNI A ON A.email = T.email;

INSERT INTO JOB (alumni_id, company_id, job_title, start_date, end_date)
SELECT A.alumni_id, T.company_id, T.job_title, T.start_date, T.end_date
FROM (
  SELECT 'alumni06@example.com' AS email,1 AS company_id,'Software Engineer' AS job_title,'2015-06-01' AS start_date,NULL AS end_date
  UNION ALL SELECT 'alumni07@example.com',2,'Financial Analyst','2016-04-15',NULL
  UNION ALL SELECT 'alumni08@example.com',4,'Operations Manager','2014-09-01','2020-12-31'
  UNION ALL SELECT 'alumni09@example.com',3,'Data Analyst','2017-01-01',NULL
  UNION ALL SELECT 'alumni10@example.com',5,'Project Manager','2018-03-01',NULL
  UNION ALL SELECT 'alumni11@example.com',1,'Frontend Developer','2015-07-10',NULL
  UNION ALL SELECT 'alumni12@example.com',2,'Risk Analyst','2016-05-20',NULL
  UNION ALL SELECT 'alumni13@example.com',5,'Account Executive','2014-11-05','2019-08-31'
  UNION ALL SELECT 'alumni14@example.com',1,'ML Engineer','2019-01-01',NULL
  UNION ALL SELECT 'alumni15@example.com',4,'Marketing Lead','2018-06-01',NULL
  UNION ALL SELECT 'alumni16@example.com',3,'System Analyst','2015-04-15',NULL
  UNION ALL SELECT 'alumni17@example.com',5,'Site Engineer','2016-02-01',NULL
  UNION ALL SELECT 'alumni18@example.com',3,'Research Analyst','2014-10-01','2019-12-31'
  UNION ALL SELECT 'alumni19@example.com',2,'HR Specialist','2018-07-01',NULL
  UNION ALL SELECT 'alumni20@example.com',1,'Backend Developer','2019-03-15',NULL
  UNION ALL SELECT 'alumni21@example.com',5,'Civil Engineer','2015-08-01',NULL
  UNION ALL SELECT 'alumni22@example.com',2,'Data Analyst','2016-06-01',NULL
  UNION ALL SELECT 'alumni23@example.com',4,'Operations Analyst','2014-12-15','2020-06-30'
  UNION ALL SELECT 'alumni24@example.com',1,'Full Stack Developer','2017-09-01',NULL
  UNION ALL SELECT 'alumni25@example.com',2,'Finance Manager','2018-04-01',NULL
) T
JOIN ALUMNI A ON A.email = T.email;

INSERT INTO ALUMNI_SKILL (alumni_id, skill_id)
SELECT A.alumni_id, T.skill_id
FROM (
  SELECT 'alumni06@example.com' AS email,1 AS skill_id
  UNION ALL SELECT 'alumni07@example.com',2
  UNION ALL SELECT 'alumni08@example.com',3
  UNION ALL SELECT 'alumni09@example.com',4
  UNION ALL SELECT 'alumni10@example.com',5
  UNION ALL SELECT 'alumni11@example.com',1
  UNION ALL SELECT 'alumni12@example.com',2
  UNION ALL SELECT 'alumni13@example.com',3
  UNION ALL SELECT 'alumni14@example.com',4
  UNION ALL SELECT 'alumni15@example.com',5
  UNION ALL SELECT 'alumni16@example.com',1
  UNION ALL SELECT 'alumni17@example.com',2
  UNION ALL SELECT 'alumni18@example.com',3
  UNION ALL SELECT 'alumni19@example.com',4
  UNION ALL SELECT 'alumni20@example.com',5
  UNION ALL SELECT 'alumni21@example.com',1
  UNION ALL SELECT 'alumni22@example.com',2
  UNION ALL SELECT 'alumni23@example.com',3
  UNION ALL SELECT 'alumni24@example.com',4
  UNION ALL SELECT 'alumni25@example.com',5
) T
JOIN ALUMNI A ON A.email = T.email;

INSERT INTO EVENT_PARTICIPATION (alumni_id, event_id, role)
SELECT A.alumni_id, T.event_id, T.role
FROM (
  SELECT 'alumni06@example.com' AS email,1 AS event_id,'Participant' AS role
  UNION ALL SELECT 'alumni07@example.com',2,'Participant'
  UNION ALL SELECT 'alumni08@example.com',3,'Participant'
  UNION ALL SELECT 'alumni09@example.com',4,'Participant'
  UNION ALL SELECT 'alumni10@example.com',5,'Participant'
  UNION ALL SELECT 'alumni11@example.com',1,'Participant'
  UNION ALL SELECT 'alumni12@example.com',2,'Participant'
  UNION ALL SELECT 'alumni13@example.com',3,'Participant'
  UNION ALL SELECT 'alumni14@example.com',4,'Participant'
  UNION ALL SELECT 'alumni15@example.com',5,'Participant'
  UNION ALL SELECT 'alumni16@example.com',1,'Participant'
  UNION ALL SELECT 'alumni17@example.com',2,'Participant'
  UNION ALL SELECT 'alumni18@example.com',3,'Participant'
  UNION ALL SELECT 'alumni19@example.com',4,'Participant'
  UNION ALL SELECT 'alumni20@example.com',5,'Participant'
  UNION ALL SELECT 'alumni21@example.com',1,'Participant'
  UNION ALL SELECT 'alumni22@example.com',2,'Participant'
  UNION ALL SELECT 'alumni23@example.com',3,'Participant'
  UNION ALL SELECT 'alumni24@example.com',4,'Participant'
  UNION ALL SELECT 'alumni25@example.com',5,'Participant'
) T
JOIN ALUMNI A ON A.email = T.email;

INSERT INTO USER_ACCOUNT (alumni_id, username, password, role)
SELECT A.alumni_id, T.username, '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'
FROM (
  SELECT 'alumni06@example.com' AS email,'alumni06' AS username
  UNION ALL SELECT 'alumni07@example.com','alumni07'
  UNION ALL SELECT 'alumni08@example.com','alumni08'
  UNION ALL SELECT 'alumni09@example.com','alumni09'
  UNION ALL SELECT 'alumni10@example.com','alumni10'
  UNION ALL SELECT 'alumni11@example.com','alumni11'
  UNION ALL SELECT 'alumni12@example.com','alumni12'
  UNION ALL SELECT 'alumni13@example.com','alumni13'
  UNION ALL SELECT 'alumni14@example.com','alumni14'
  UNION ALL SELECT 'alumni15@example.com','alumni15'
  UNION ALL SELECT 'alumni16@example.com','alumni16'
  UNION ALL SELECT 'alumni17@example.com','alumni17'
  UNION ALL SELECT 'alumni18@example.com','alumni18'
  UNION ALL SELECT 'alumni19@example.com','alumni19'
  UNION ALL SELECT 'alumni20@example.com','alumni20'
  UNION ALL SELECT 'alumni21@example.com','alumni21'
  UNION ALL SELECT 'alumni22@example.com','alumni22'
  UNION ALL SELECT 'alumni23@example.com','alumni23'
  UNION ALL SELECT 'alumni24@example.com','alumni24'
  UNION ALL SELECT 'alumni25@example.com','alumni25'
) T
JOIN ALUMNI A ON A.email = T.email;
