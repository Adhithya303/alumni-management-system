USE alumni_db;

INSERT INTO ALUMNI (name, email, phone, dob, gender) VALUES
('John Doe', 'john.doe@example.com', '9876543210', '1995-05-11', 'Male'),
('Priya Sharma', 'priya.sharma@example.com', '9898989898', '1994-08-20', 'Female'),
('Rahul Verma', 'rahul.verma@example.com', '9123456780', '1993-02-14', 'Male'),
('Meera Nair', 'meera.nair@example.com', '9000011111', '1996-12-01', 'Female'),
('Arjun Singh', 'arjun.singh@example.com', '9888877777', '1992-06-30', 'Male');

INSERT INTO EDUCATION (alumni_id, degree, department, college_name, graduation_year) VALUES
(1, 'B.Tech', 'Computer Science', 'ABC Engineering College', 2017),
(2, 'B.Sc', 'Information Technology', 'XYZ College', 2016),
(3, 'BBA', 'Business Administration', 'Metro Business School', 2015),
(4, 'MCA', 'Computer Applications', 'National Tech University', 2019),
(5, 'MBA', 'Finance', 'Global Management Institute', 2014);

INSERT INTO COMPANY (company_name, industry, location) VALUES
('TechNova', 'Software', 'Bengaluru'),
('FinEdge', 'Finance', 'Mumbai'),
('HealthCore', 'Healthcare', 'Chennai'),
('EduSpark', 'Education', 'Hyderabad'),
('BuildRight', 'Construction', 'Pune');

INSERT INTO JOB (alumni_id, company_id, job_title, start_date, end_date) VALUES
(1, 1, 'Software Engineer', '2018-06-01', NULL),
(2, 2, 'Financial Analyst', '2017-04-15', NULL),
(3, 4, 'Operations Manager', '2016-09-01', '2021-12-31'),
(4, 3, 'Data Analyst', '2020-01-01', NULL),
(5, 5, 'Project Manager', '2015-03-01', NULL);

INSERT INTO SKILL (skill_name) VALUES
('JavaScript'),
('React'),
('Node.js'),
('SQL'),
('Project Management');

INSERT INTO ALUMNI_SKILL (alumni_id, skill_id) VALUES
(1, 1),
(1, 2),
(2, 4),
(3, 5),
(4, 3),
(5, 5),
(4, 4);

INSERT INTO EVENT (event_name, event_date, location) VALUES
('Annual Alumni Meet', '2026-08-10', 'Bengaluru'),
('Career Expo', '2026-09-05', 'Mumbai'),
('Tech Talk', '2026-06-20', 'Chennai'),
('Mentorship Summit', '2026-07-15', 'Hyderabad'),
('Fundraising Gala', '2026-11-01', 'Pune');

INSERT INTO EVENT_PARTICIPATION (alumni_id, event_id, role) VALUES
(1, 1, 'Speaker'),
(2, 2, 'Participant'),
(3, 3, 'Organizer'),
(4, 4, 'Mentor'),
(5, 5, 'Participant');

INSERT INTO USER_ACCOUNT (alumni_id, username, password, role) VALUES
(1, 'john_admin', '$2b$10$9fXP28Jf6C6Eu3B1R9l6ce8jUvA7H5jv4f9QX8sPSVw3qWwS8Jf9S', 'admin'),
(2, 'priya94', '$2b$10$9fXP28Jf6C6Eu3B1R9l6ce8jUvA7H5jv4f9QX8sPSVw3qWwS8Jf9S', 'alumni'),
(3, 'rahulv', '$2b$10$9fXP28Jf6C6Eu3B1R9l6ce8jUvA7H5jv4f9QX8sPSVw3qWwS8Jf9S', 'alumni'),
(4, 'meera_n', '$2b$10$9fXP28Jf6C6Eu3B1R9l6ce8jUvA7H5jv4f9QX8sPSVw3qWwS8Jf9S', 'alumni'),
(5, 'arjuns', '$2b$10$9fXP28Jf6C6Eu3B1R9l6ce8jUvA7H5jv4f9QX8sPSVw3qWwS8Jf9S', 'alumni');

INSERT INTO ALUMNI (name, email, phone, dob, gender) VALUES
('Sample Alumni 06', 'alumni06@example.com', '9000000006', '1991-01-06', 'Male'),
('Sample Alumni 07', 'alumni07@example.com', '9000000007', '1992-02-07', 'Female'),
('Sample Alumni 08', 'alumni08@example.com', '9000000008', '1993-03-08', 'Male'),
('Sample Alumni 09', 'alumni09@example.com', '9000000009', '1994-04-09', 'Female'),
('Sample Alumni 10', 'alumni10@example.com', '9000000010', '1995-05-10', 'Male'),
('Sample Alumni 11', 'alumni11@example.com', '9000000011', '1991-06-11', 'Female'),
('Sample Alumni 12', 'alumni12@example.com', '9000000012', '1992-07-12', 'Male'),
('Sample Alumni 13', 'alumni13@example.com', '9000000013', '1993-08-13', 'Female'),
('Sample Alumni 14', 'alumni14@example.com', '9000000014', '1994-09-14', 'Male'),
('Sample Alumni 15', 'alumni15@example.com', '9000000015', '1995-10-15', 'Female'),
('Sample Alumni 16', 'alumni16@example.com', '9000000016', '1991-11-16', 'Male'),
('Sample Alumni 17', 'alumni17@example.com', '9000000017', '1992-12-17', 'Female'),
('Sample Alumni 18', 'alumni18@example.com', '9000000018', '1993-01-18', 'Male'),
('Sample Alumni 19', 'alumni19@example.com', '9000000019', '1994-02-19', 'Female'),
('Sample Alumni 20', 'alumni20@example.com', '9000000020', '1995-03-20', 'Male'),
('Sample Alumni 21', 'alumni21@example.com', '9000000021', '1991-04-21', 'Female'),
('Sample Alumni 22', 'alumni22@example.com', '9000000022', '1992-05-22', 'Male'),
('Sample Alumni 23', 'alumni23@example.com', '9000000023', '1993-06-23', 'Female'),
('Sample Alumni 24', 'alumni24@example.com', '9000000024', '1994-07-24', 'Male'),
('Sample Alumni 25', 'alumni25@example.com', '9000000025', '1995-08-25', 'Female');

INSERT INTO EDUCATION (alumni_id, degree, department, college_name, graduation_year) VALUES
(6, 'B.Tech', 'Computer Science', 'ABC Engineering College', 2014),
(7, 'B.Sc', 'Information Technology', 'XYZ College', 2015),
(8, 'BBA', 'Business Administration', 'Metro Business School', 2013),
(9, 'MCA', 'Computer Applications', 'National Tech University', 2016),
(10, 'MBA', 'Finance', 'Global Management Institute', 2017),
(11, 'B.Tech', 'Electronics', 'State Institute of Tech', 2014),
(12, 'B.Sc', 'Mathematics', 'City College', 2015),
(13, 'B.Com', 'Accounting', 'Commerce Academy', 2013),
(14, 'M.Tech', 'Data Science', 'Tech University', 2018),
(15, 'MBA', 'Marketing', 'Business School', 2017),
(16, 'BCA', 'Computer Applications', 'Regional College', 2014),
(17, 'B.Tech', 'Mechanical', 'Engineering College', 2015),
(18, 'B.Sc', 'Physics', 'Science College', 2013),
(19, 'MBA', 'HR', 'Management Institute', 2017),
(20, 'M.Sc', 'IT', 'Institute of Tech', 2018),
(21, 'B.Tech', 'Civil', 'Engineering College', 2014),
(22, 'B.Sc', 'Statistics', 'City College', 2015),
(23, 'BBA', 'Operations', 'Business School', 2013),
(24, 'MCA', 'Software', 'National Tech University', 2016),
(25, 'MBA', 'Finance', 'Global Management Institute', 2017);

INSERT INTO JOB (alumni_id, company_id, job_title, start_date, end_date) VALUES
(6, 1, 'Software Engineer', '2015-06-01', NULL),
(7, 2, 'Financial Analyst', '2016-04-15', NULL),
(8, 4, 'Operations Manager', '2014-09-01', '2020-12-31'),
(9, 3, 'Data Analyst', '2017-01-01', NULL),
(10, 5, 'Project Manager', '2018-03-01', NULL),
(11, 1, 'Frontend Developer', '2015-07-10', NULL),
(12, 2, 'Risk Analyst', '2016-05-20', NULL),
(13, 5, 'Account Executive', '2014-11-05', '2019-08-31'),
(14, 1, 'ML Engineer', '2019-01-01', NULL),
(15, 4, 'Marketing Lead', '2018-06-01', NULL),
(16, 3, 'System Analyst', '2015-04-15', NULL),
(17, 5, 'Site Engineer', '2016-02-01', NULL),
(18, 3, 'Research Analyst', '2014-10-01', '2019-12-31'),
(19, 2, 'HR Specialist', '2018-07-01', NULL),
(20, 1, 'Backend Developer', '2019-03-15', NULL),
(21, 5, 'Civil Engineer', '2015-08-01', NULL),
(22, 2, 'Data Analyst', '2016-06-01', NULL),
(23, 4, 'Operations Analyst', '2014-12-15', '2020-06-30'),
(24, 1, 'Full Stack Developer', '2017-09-01', NULL),
(25, 2, 'Finance Manager', '2018-04-01', NULL);

INSERT INTO ALUMNI_SKILL (alumni_id, skill_id) VALUES
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 5),
(11, 1),
(12, 2),
(13, 3),
(14, 4),
(15, 5),
(16, 1),
(17, 2),
(18, 3),
(19, 4),
(20, 5),
(21, 1),
(22, 2),
(23, 3),
(24, 4),
(25, 5);

INSERT INTO EVENT_PARTICIPATION (alumni_id, event_id, role) VALUES
(6, 1, 'Participant'),
(7, 2, 'Participant'),
(8, 3, 'Participant'),
(9, 4, 'Participant'),
(10, 5, 'Participant'),
(11, 1, 'Participant'),
(12, 2, 'Participant'),
(13, 3, 'Participant'),
(14, 4, 'Participant'),
(15, 5, 'Participant'),
(16, 1, 'Participant'),
(17, 2, 'Participant'),
(18, 3, 'Participant'),
(19, 4, 'Participant'),
(20, 5, 'Participant'),
(21, 1, 'Participant'),
(22, 2, 'Participant'),
(23, 3, 'Participant'),
(24, 4, 'Participant'),
(25, 5, 'Participant');

INSERT INTO USER_ACCOUNT (alumni_id, username, password, role) VALUES
(6, 'alumni06', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(7, 'alumni07', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(8, 'alumni08', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(9, 'alumni09', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(10, 'alumni10', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(11, 'alumni11', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(12, 'alumni12', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(13, 'alumni13', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(14, 'alumni14', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(15, 'alumni15', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(16, 'alumni16', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(17, 'alumni17', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(18, 'alumni18', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(19, 'alumni19', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(20, 'alumni20', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(21, 'alumni21', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(22, 'alumni22', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(23, 'alumni23', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(24, 'alumni24', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni'),
(25, 'alumni25', '$2b$10$BCNWp0HwTu30mEUR2CT0eO7c02KQ5CvFsPdK8OFuePt0km/KdD9Da', 'alumni');
