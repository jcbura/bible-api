CREATE TYPE "public"."testament" AS ENUM('OLD', 'NEW');--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"testament" "testament" NOT NULL,
	"book_order" integer NOT NULL,
	CONSTRAINT "books_name_unique" UNIQUE("name"),
	CONSTRAINT "books_order_unique" UNIQUE("book_order")
);
--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"chapter_number" integer NOT NULL,
	CONSTRAINT "chapters_book_chapter_unique" UNIQUE("book_id","chapter_number")
);
--> statement-breakpoint
CREATE TABLE "translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "translations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "verses" (
	"id" serial PRIMARY KEY NOT NULL,
	"translation_id" integer NOT NULL,
	"chapter_id" integer NOT NULL,
	"verse_number" integer NOT NULL,
	"text" text NOT NULL,
	CONSTRAINT "verses_chapter_translation_verse_unique" UNIQUE("chapter_id","translation_id","verse_number")
);
--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verses" ADD CONSTRAINT "verses_translation_id_translations_id_fk" FOREIGN KEY ("translation_id") REFERENCES "public"."translations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verses" ADD CONSTRAINT "verses_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE no action ON UPDATE no action;