
-- Update handle_new_user to respect the requested_role from signup metadata
-- and auto-create a provider record for service_provider signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _requested_role text;
  _role app_role;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  -- Determine requested role
  _requested_role := NEW.raw_user_meta_data->>'requested_role';
  
  IF _requested_role = 'service_provider' THEN
    _role := 'service_provider';
  ELSE
    _role := 'user';
  END IF;

  -- Assign the role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, _role);

  -- If service_provider, auto-create a provider record (pending verification)
  IF _role = 'service_provider' THEN
    INSERT INTO public.providers (user_id, business_name, verification_status)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 'pending');
  END IF;

  RETURN NEW;
END;
$$;
