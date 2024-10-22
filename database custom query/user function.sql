CREATE OR REPLACE FUNCTION user_login_auth(p_email text,p_password text)
RETURNS setof users AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM users u
    WHERE u.email = p_email
    and u.password = hash_password(p_password)
    AND u.is_deleted = false ;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Please check email or password and try again';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_admin(p_user_id uuid)
RETURNS setof user_info AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM user_info u
    WHERE u.user_id = p_user_id
    and u.role_id = 1;
END;
$$ LANGUAGE plpgsql;

select * from check_admin('24e60123-c68f-430c-88b5-55d0986d13cc')