DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('pending', 'approved', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "snippets" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar(10) NOT NULL,
	"text" text NOT NULL,
	"html" text NOT NULL,
	"language" text NOT NULL,
	"quote_author" text NOT NULL,
	"quote_content" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "snippets_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "public_id_idx" ON "snippets" ("public_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "status_idx" ON "snippets" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "snippets" ("created_at");