-- Fix search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop the overly permissive notification INSERT policy
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Create a more secure notification INSERT policy
-- Notifications can be created by the system (via triggers) or for the current user
CREATE POLICY "Users can create own notifications" ON public.notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create a service role policy for system notifications (created via triggers)
-- The triggers use SECURITY DEFINER so they can insert notifications