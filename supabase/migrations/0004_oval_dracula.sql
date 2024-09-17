ALTER TABLE "posts" DROP CONSTRAINT "post_parent_id_fkey";
--> statement-breakpoint
DROP INDEX IF EXISTS "post_created_at_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "postes_profiles_id_idx";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_profiles_id_idx" ON "posts" USING btree ("profile_id");