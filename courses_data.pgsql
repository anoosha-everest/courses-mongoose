insert into courses (courselevel,courseName) values('ssc','MATHS'),('ssc','SCIENCE'),('inter','BiPC'),('inter','MPC'),('inter','CEC'),
                                                ('diploma','EEE'),('diploma','IT'),('diploma','ECE'),('eng','ECE'),
                                                ('eng','EEE'),('eng','CSE'),('eng','CIVIL'),('eng','MECH'),('eng','CHEM'),('eng','MME'),
                                                ('medical','DENTAL'),('medical','PHARMACY'),('medical','HOMEOPATHY'),
                                                ('degree','B.com'),('degree','B.pharm'),('degree','B.sc');
-- delete from courses;
select * from courses;
insert into Prerequisites(courseId,preId) values (1,NULL),(2,NULL),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2),
                                                (6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(9,4),(9,8),(10,4),(10,6),
                                                (11,4),(11,7),(12,4),(13,4),(14,4),(15,4),(16,3),(17,3),(18,3),(19,4),
                                                (20,3),(21,4),(21,3);
select * from prerequisites;
-- delete from prerequisites;

-- courses to be taken after inter
SELECT courseId, courselevel, courseName
FROM courses
WHERE courselevel IN ('eng', 'medical', 'degree');
-- other way after ssc
SELECT courseId, courselevel, courseName
FROM courses
WHERE courselevel NOT IN ('ssc','diploma');
-- fetching the prerequisites for a given course id=3
SELECT c.courseId, c.courseName,c.courselevel
FROM Prerequisites p
JOIN courses c ON p.preId = c.courseId
WHERE p.courseId = 3;
-- fetching prerequisites with given course name=cse
SELECT c.courseId, c.courseName,c.courselevel
FROM Prerequisites p
JOIN courses c ON p.preId = c.courseId
WHERE p.courseId = (
    SELECT courseId
    FROM courses
    WHERE courseName = 'CSE'
);
-- courses in particular level
select courseid,coursename from courses where courselevel='eng';
-- count of courses in each level
select courselevel,count(*) as courses from courses group by courselevel;
-- fetching the courses which have prerequisite course 'inter'
select distinct c.courseid,c.courselevel,c.courseName 
from prerequisites p join courses c on p.courseid=c.courseid WHERE
p.preid in (select courseid from courses where courselevel='ssc');


