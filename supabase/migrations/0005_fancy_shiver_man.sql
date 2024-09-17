-- Custom SQL migration file

-- Add foreign key constraint to profiles
ALTER TABLE profiles
ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Function to validate username before changes in auth.users
CREATE OR REPLACE FUNCTION public.validate_username_before_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN 
  -- Check if it's an INSERT operation
  IF TG_OP = 'INSERT' THEN
    -- Ensure username is present
    IF NEW.raw_user_meta_data->>'username' IS NULL OR NEW.raw_user_meta_data->>'username' = '' THEN
      RAISE EXCEPTION 'username must be provided when creating a new user';
    END IF; 
  END IF;

  -- Check for username uniqueness for both INSERT and UPDATE
  IF EXISTS (
    SELECT 1 
    FROM public.profiles
    WHERE username = NEW.raw_user_meta_data->>'username' 
      AND id <> NEW.id  -- exclude the current user when updating
  ) THEN
    RAISE EXCEPTION 'user with username % already exists', NEW.raw_user_meta_data->>'username';
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger for checking username before updating auth.users
CREATE TRIGGER check_username_before_update_auth_users 
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data->>'username' IS DISTINCT FROM NEW.raw_user_meta_data->>'username')
  EXECUTE FUNCTION public.validate_username_before_change();

-- Trigger for checking username before inserting into auth.users
CREATE TRIGGER check_username_before_insert_auth_users 
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_username_before_change();

-- Function to update profile username when auth.users is updated
CREATE OR REPLACE FUNCTION public.update_profile_username()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN 
  UPDATE public.profiles
  SET username = NEW.raw_user_meta_data->>'username'
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$;

-- Trigger to update profile username after auth.users is updated
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data->>'username' IS DISTINCT FROM NEW.raw_user_meta_data->>'username')
  EXECUTE FUNCTION public.update_profile_username();

-- Function to handle new user creation in profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN 
  INSERT INTO public.profiles(id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');

  RETURN NEW;
END;
$$;

-- Trigger to insert new user into profiles after insertion in auth.users
CREATE TRIGGER handle_new_user_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
