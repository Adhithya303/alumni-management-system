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
