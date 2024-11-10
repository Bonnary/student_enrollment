CREATE OR REPLACE FUNCTION get_student()
RETURNS table(
  id int8,
  generation int8,
  khmer_name text,
  english_name text,
  date_of_birth date,
  sex varchar,
  nationality text,
  address text,
  phone_number text,
  facebook_or_email text,
  father_name text,
  father_nationality text,
  father_occupation text,
  father_phone_number text,
  mother_name text,
  mother_nationality text,
  mother_occupation text,
  mother_phone_number text,
  session text,
  session_id int8,
  subject text,
  subject_id int8,
  college text,
  college_id int8,
  grade text,
  grade_id int8,
  family_situation text,
  family_situation_id int8,
  student_job text,
  student_job_id int8
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.generation,
    s.khmer_name,
    s.english_name,
    s.date_of_birth,
    s.sex,
    s.nationality,
    s.address,
    s.phone_number,
    s.facebook_or_email,
    s.father_name,
    s.father_nationality,
    s.father_occupation,
    s.father_phone_number,
    s.mother_name,
    s.mother_nationality,
    s.mother_occupation,
    s.mother_phone_number,
    ses.session_name,
    s.session_id,
    sub.subject_name,
    s.subject_id,
    col.college_name,
    s.college_id,
    gra.grade_name,
    s.grade_id,
    fam.family_situation_name,
    s.family_situation_id,
    stu.student_job_name,
    s.student_job_id
  from students s
  join sessions ses on ses.id = s.session_id
  join subjects sub on sub.id = s.subject_id
  join colleges col on col.id = s.college_id
  join grades gra on gra.id = s.grade_id
  join family_situations fam on fam.id = s.family_situation_id
  join student_jobs stu on stu.id = s.student_job_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_student_by_id(p_id int8)
RETURNS table(
  id int8,
  generation int8,
  khmer_name text,
  english_name text,
  date_of_birth date,
  sex varchar,
  nationality text,
  address text,
  phone_number text,
  facebook_or_email text,
  father_name text,
  father_nationality text,
  father_occupation text,
  father_phone_number text,
  mother_name text,
  mother_nationality text,
  mother_occupation text,
  mother_phone_number text,
  session text,
  session_id int8,
  subject text,
  subject_id int8,
  college text,
  college_id int8,
  grade text,
  grade_id int8,
  family_situation text,
  family_situation_id int8,
  student_job text,
  student_job_id int8
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.generation,
    s.khmer_name,
    s.english_name,
    s.date_of_birth,
    s.sex,
    s.nationality,
    s.address,
    s.phone_number,
    s.facebook_or_email,
    s.father_name,
    s.father_nationality,
    s.father_occupation,
    s.father_phone_number,
    s.mother_name,
    s.mother_nationality,
    s.mother_occupation,
    s.mother_phone_number,
    ses.session_name,
    s.session_id,
    sub.subject_name,
    s.subject_id,
    col.college_name,
    s.college_id,
    gra.grade_name,
    s.grade_id,
    fam.family_situation_name,
    s.family_situation_id,
    stu.student_job_name,
    s.student_job_id
  from students s
  join sessions ses on ses.id = s.session_id
  join subjects sub on sub.id = s.subject_id
  join colleges col on col.id = s.college_id
  join grades gra on gra.id = s.grade_id
  join family_situations fam on fam.id = s.family_situation_id
  join student_jobs stu on stu.id = s.student_job_id
  where s.id = p_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_student (
  generation int8,
  khmer_name text,
  english_name text,
  date_of_birth date,
  sex varchar,
  nationality text,
  address text,
  phone_number text,
  facebook_or_email text,
  father_name text,
  father_nationality text,
  father_occupation text,
  father_phone_number text,
  mother_name text,
  mother_nationality text,
  mother_occupation text,
  mother_phone_number text,
  session text,
  subject text,
  college text,
  grade text,
  family_situation text,
  student_job text
) RETURNS void AS $$
DECLARE
  v_session_id int8;
  v_subject_id int8;
  v_college_id int8;
  v_grade_id int8;
  v_family_situation_id int8;
  v_student_job_id int8;
BEGIN
  SELECT id INTO v_session_id
  FROM sessions WHERE session_name = session;
  
  SELECT id INTO v_subject_id
  FROM subjects WHERE subject_name = subject;
  
  SELECT id INTO v_college_id
  FROM colleges WHERE college_name = college;
  
  SELECT id INTO v_grade_id
  FROM grades WHERE grade_name = grade;
  
  SELECT id INTO v_family_situation_id
  FROM family_situations WHERE family_situation_name = family_situation;
  
  SELECT id INTO v_student_job_id
  FROM student_jobs WHERE student_job_name = student_job;
  
  INSERT INTO students (
    generation, khmer_name, english_name, date_of_birth, sex, nationality, 
    address, phone_number, facebook_or_email, father_name, father_nationality,
    father_occupation, father_phone_number, mother_name, mother_nationality,
    mother_occupation, mother_phone_number, session_id, subject_id, college_id,
    grade_id, family_situation_id, student_job_id
  )
  VALUES (
    generation, khmer_name, english_name, date_of_birth, sex, nationality,
    address, phone_number, facebook_or_email, father_name, father_nationality,
    father_occupation, father_phone_number, mother_name, mother_nationality,
    mother_occupation, mother_phone_number, v_session_id, v_subject_id, v_college_id,
    v_grade_id, v_family_situation_id, v_student_job_id
  );
  
  EXCEPTION
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Error: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM insert_student(
  3,                   -- generation
  '3sds',             -- khmer_name
  'sdfsf',            -- english_name
  '2024-01-01'::date, -- date_of_birth
  'M',                -- sex
  'khmer',            -- nationality
  'pp',               -- address
  '0123456789',       -- phone_number
  'test',             -- facebook_or_email
  'father',           -- father_name
  'khmer',            -- father_nationality
  'teacher',          -- father_occupation
  '655548122',        -- father_phone_number
  'mother',           -- mother_name
  'khmer',            -- mother_nationality
  'tescher',          -- mother_occupation
  '54852415',         -- mother_phone_number
  'Morning',          -- session
  'ភាសាអង់គ្លេសសម្រាប់ទំនាក់ទំនង',        -- subject
  'សិល្បៈមនុស្សសាសន៍និងភាសា',           -- college
  'A+',               -- grade
  'កម្មករឬនិយោជិត',                    -- family_situation
  'សិស្សទើបជាប់សញ្ញាបត្របឋមសិក្សាតុល្យភូមិ' -- student_job
);