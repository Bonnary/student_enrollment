CREATE OR REPLACE FUNCTION reset_user_password(_email text, _new_password text)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
DECLARE
    hashed_password TEXT;
BEGIN
    -- Check if the email exists
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = _email) THEN
      RAISE EXCEPTION 'Email does not exist';
    END IF;

    -- Hash the new password
    hashed_password := crypt(_new_password, gen_salt('bf'));

    -- Update the user's password
    UPDATE users SET password_hash = hashed_password WHERE email = _email;

    RETURN QUERY SELECT TRUE, 'Password reset successfully';
END;
$$ LANGUAGE plpgsql;

select * from reset_user_password('bonnarygmk2@gmail.com','11112222')

CREATE OR REPLACE FUNCTION register_user(_full_name text,_email text, _password text, _role_id int8)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
DECLARE
    hashed_password TEXT;
BEGIN
    -- Check if the username or email already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = _email) THEN
        RAISE EXCEPTION 'Username or email already exists';
    END IF;

    -- Hash the password
    hashed_password := crypt(_password, gen_salt('bf'));

    -- Insert the new user
    INSERT INTO users (full_name, email, password_hash, role_id) VALUES (_full_name ,_email, hashed_password, _role_id);

    RETURN QUERY SELECT TRUE, 'User registered successfully';
END;
$$ LANGUAGE plpgsql;



-- Create a function to generate JWT token
CREATE OR REPLACE FUNCTION generate_jwt_token(
    user_id uuid
) RETURNS text AS $$
DECLARE
    jwt_token text;
    claims json;
    secret text := '4aa2efe8a6a204955728bc61a296fe6ba98b2c2822117148ce9f1f80223ac406';
BEGIN
    -- Create claims object
    -- the token will expires in 30 days
    claims := json_build_object(
        'user_id', user_id,
        'exp', extract(epoch from now() + interval '30 day')::integer,
        'iat', extract(epoch from now())::integer
    );
    
    -- Generate token
    SELECT sign(claims, secret) INTO jwt_token;
    
    RETURN jwt_token;
END;
$$ LANGUAGE plpgsql;


-- Create a function to verify and decode JWT token
CREATE OR REPLACE FUNCTION verify_jwt_token(token text)
RETURNS json AS $$
DECLARE
    verification_result record;
    decoded_payload json;
    now_time integer;
    secret text := '4aa2efe8a6a204955728bc61a296fe6ba98b2c2822117148ce9f1f80223ac406';
BEGIN
    -- Verify token and get result as a record
    SELECT * FROM verify(token, secret) INTO verification_result;
    
    -- Check if token is valid
    IF NOT verification_result.valid THEN
        RAISE EXCEPTION 'Invalid token signature';
    END IF;
    
    -- Parse the payload string into json
    decoded_payload := verification_result.payload::json;
    
    -- Check if token is expired
    SELECT extract(epoch from now())::integer INTO now_time;
    
    IF decoded_payload->>'exp' IS NOT NULL AND (decoded_payload->>'exp')::integer < now_time THEN
        RAISE EXCEPTION 'Token has expired';
    END IF;
    
    RETURN decoded_payload;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Invalid token: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION login_user(_email text, _password text)
RETURNS TABLE(success BOOLEAN, refresh_token TEXT, message TEXT) AS $$
DECLARE
    user_id uuid;-- Replace with your actual secret key
BEGIN
    -- Verify user credentials
    SELECT id INTO user_id
    FROM users
    WHERE email = _email AND password_hash = crypt(_password, password_hash);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid credentials';
    END IF;

    -- Generate refresh token (valid for 30 days)
    refresh_token := generate_jwt_token(user_id);

    -- Store the refresh token in the database
    INSERT INTO refresh_tokens (user_id, refresh_token, expires_at)
    VALUES (user_id, refresh_token, NOW() + INTERVAL '30 days');

    RETURN QUERY SELECT TRUE,refresh_token, 'Login successful';
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_profile(_refresh_token TEXT)
RETURNS setof users AS $$
DECLARE
    payload JSON;
    token_user_id uuid;
BEGIN
    -- Verify the access token
    BEGIN
        payload := verify_jwt_token(_refresh_token);
        token_user_id := (payload->>'user_id')::uuid;
    EXCEPTION WHEN others THEN
        RAISE EXCEPTION 'Invalid or expired access token';
    END;

    -- Fetch and return the user profile if token is valid
    RETURN QUERY SELECT u.*
    FROM users u
    WHERE u.id = token_user_id;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION logout_user(_refresh_token TEXT)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
BEGIN
    DELETE FROM refresh_tokens WHERE refresh_token = _refresh_token;

    IF FOUND THEN
        RETURN QUERY SELECT TRUE, 'Logout successful';
    ELSE
        RAISE EXCEPTION 'Invalid refresh token';
    END IF;
END;
$$ LANGUAGE plpgsql;
