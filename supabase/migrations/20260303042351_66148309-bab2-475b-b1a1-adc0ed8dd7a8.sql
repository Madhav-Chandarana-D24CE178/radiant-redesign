
-- Ensure trigger and functions are correct
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE _role public.app_role;
BEGIN
  INSERT INTO public.profiles (id, email, full_name) VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  _role := COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'requested_role', '')::public.app_role, 'user');
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role);
  IF _role = 'service_provider' THEN
    INSERT INTO public.providers (user_id, business_name, verification_status) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'My Business'), 'pending');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_providers_updated_at ON public.providers;
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON public.providers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed categories if empty
INSERT INTO public.service_categories (name, icon, description)
SELECT * FROM (VALUES
  ('Plumbing', 'wrench', 'Plumbing repairs and installations'),
  ('Electrical', 'zap', 'Electrical work and wiring'),
  ('Carpentry', 'hammer', 'Woodwork and furniture repairs'),
  ('Painting', 'paintbrush', 'Interior and exterior painting'),
  ('Cleaning', 'sparkles', 'Home and office cleaning'),
  ('HVAC', 'thermometer', 'Heating and cooling services')
) AS v(name, icon, description)
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories LIMIT 1);
