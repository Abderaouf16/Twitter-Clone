ALTER TABLE "postes" RENAME TO "posts";--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_postes_id_fk";
--> statement-breakpoint
ALTER TABLE "post_hashtags" DROP CONSTRAINT "post_hashtags_post_id_postes_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "postes_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "post_parent_id_fkey";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_hashtags" ADD CONSTRAINT "post_hashtags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "post_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
