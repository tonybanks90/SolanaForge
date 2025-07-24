import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  address: text("address").notNull().unique(),
  price: decimal("price", { precision: 18, scale: 8 }).notNull(),
  marketCap: decimal("market_cap", { precision: 18, scale: 2 }).notNull(),
  volume24h: decimal("volume_24h", { precision: 18, scale: 2 }).notNull(),
  holders: integer("holders").notNull(),
  priceChange24h: decimal("price_change_24h", { precision: 5, scale: 2 }).notNull(),
  platform: text("platform").notNull(),
  age: integer("age").notNull(), // in minutes
  lpBurned: boolean("lp_burned").notNull().default(false),
  renounced: boolean("renounced").notNull().default(false),
  honeypotCheck: boolean("honeypot_check").notNull().default(false),
  safetyScore: integer("safety_score").notNull().default(0),
  category: text("category").notNull().default("new"),
  socialLinks: text("social_links"), // JSON string
  createdAt: timestamp("created_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  tokenId: integer("token_id").references(() => tokens.id),
  type: text("type").notNull(), // 'new_token', 'price_change', 'volume_spike'
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTokenSchema = createInsertSchema(tokens).omit({
  id: true,
  createdAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
