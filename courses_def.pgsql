CREATE TYPE ssc AS ENUM ('MATHS', 'SCIENCE');
CREATE TYPE inter AS ENUM ('MPC', 'BiPC','CEC');
CREATE TYPE eng AS ENUM ('CSE', 'ECE','CIVIL','EEE','MECH','MME','CHEM');
CREATE TYPE diploma AS ENUM ('IT', 'ECE','EEE');
CREATE TYPE medical AS ENUM ('DENTAL','PHARMACY','HOMEOPATHY');
CREATE TYPE degree AS ENUM ('B.com','B.pharm','B.sc');

CREATE TYPE Courselevel AS ENUM('ssc','inter','diploma','eng','medical','degree'); 

drop Type if exists Courselevel;
CREATE SEQUENCE coour start 1 increment 1;
CREATE TABLE courses (
    courseId INTEGER DEFAULT nextval('coour') PRIMARY KEY,
    courselevel Courselevel, 
    courseName VARCHAR(255),
    CHECK (
        CASE
            WHEN courselevel = 'ssc' THEN courseName::ssc IS NOT NULL
            WHEN courselevel = 'inter' THEN courseName::inter IS NOT NULL
            WHEN courselevel = 'diploma' THEN courseName::diploma IS NOT NULL
            WHEN courselevel = 'eng' THEN courseName::eng IS NOT NULL
            WHEN courselevel = 'medical' THEN courseName::medical IS NOT NULL
            WHEN courselevel = 'degree' THEN courseName::degree IS NOT NULL
            ELSE FALSE
        END
    )
)


CREATE SEQUENCE requir start 1000 increment 1;
Create table Prerequisites(
    Id INTEGER DEFAULT nextval('requir') PRIMARY KEY,
    courseId integer,
    preId integer references courses(courseId),
    Foreign key(courseId) references courses(courseId)
)
