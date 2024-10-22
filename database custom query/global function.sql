
-- set database time zone to cambodia
alter database postgres
set timezone to 'Asia/Phnom_Penh';

-- hash password function
CREATE OR REPLACE FUNCTION hash_password(password text)
RETURNS text AS $$
BEGIN
 RETURN ENCODE(DIGEST(password, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;


-- triggers for hash password
CREATE OR REPLACE FUNCTION hash_password_trigger()
RETURNS TRIGGER AS $$
BEGIN
 NEW.password := ENCODE(DIGEST(NEW.password, 'sha256'), 'hex');
 RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hash_password_before_insert
BEFORE INSERT ON public.users
FOR EACH ROW EXECUTE PROCEDURE hash_password_trigger();
