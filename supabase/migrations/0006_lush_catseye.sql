-- Custom SQL migration file, put you code below! --
-- Enable RLS on follows table
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Enable RLS on hashtags table
ALTER TABLE public.hashtags ENABLE ROW LEVEL SECURITY;

-- Enable RLS on likes table
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Enable RLS on post_hashtags table
ALTER TABLE public.post_hashtags ENABLE ROW LEVEL SECURITY;

-- Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
