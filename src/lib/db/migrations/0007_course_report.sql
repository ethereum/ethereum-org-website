CREATE TABLE "course_report" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "course_report_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"course_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"step_id" text NOT NULL,
	"locale" text NOT NULL,
	"reason" text NOT NULL,
	"answer" text,
	"note" text,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "course_report_created_idx" ON "course_report" USING btree ("created_at");