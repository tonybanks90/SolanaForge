import { db } from "./db";
import { tokens, alerts } from "@shared/schema";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Check if data already exists
  const existingTokens = await db.select().from(tokens).limit(1);
  if (existingTokens.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  // Sample tokens data
  const sampleTokens = [
    {
      symbol: "LDRAGO",
      name: "Legendary Dragon",
      address: "7V3QjzLezFFAG5QHP1PVG3i7UC2LTjKvPEVYc1fjbonk",
      price: "0.0024",
      marketCap: "156700",
      volume24h: "45200",
      holders: 1247,
      priceChange24h: "15.6",
      platform: "pump.fun",
      age: 2,
      lpBurned: true,
      renounced: true,
      honeypotCheck: false,
      safetyScore: 8,
      category: "new",
      socialLinks: JSON.stringify({
        twitter: "https://x.com/legendarydragon",
        telegram: "https://t.me/ldrago"
      })
    },
    {
      symbol: "CARROT",
      name: "Accucarrot",
      address: "cJcyWkNzQ8Q4mNhRWjQgqNhQjNGQqmNhQjN",
      price: "0.0078",
      marketCap: "2300000",
      volume24h: "890500",
      holders: 3456,
      priceChange24h: "245.8",
      platform: "raydium",
      age: 7,
      lpBurned: true,
      renounced: true,
      honeypotCheck: true,
      safetyScore: 10,
      category: "trending",
      socialLinks: JSON.stringify({
        twitter: "https://x.com/Accucarrot",
        website: "https://accucarrot.capital/"
      })
    },
    {
      symbol: "PEPE",
      name: "Pepe Coin",
      address: "4WpXqNhQjNGQqmNhQjNGUKH",
      price: "0.0001",
      marketCap: "45600",
      volume24h: "12300",
      holders: 567,
      priceChange24h: "-12.3",
      platform: "meteora",
      age: 180,
      lpBurned: false,
      renounced: false,
      honeypotCheck: false,
      safetyScore: 3,
      category: "completed",
      socialLinks: JSON.stringify({})
    }
  ];

  // Insert tokens
  const insertedTokens = await db.insert(tokens).values(sampleTokens).returning();
  console.log(`✅ Inserted ${insertedTokens.length} tokens`);

  // Sample alerts data
  const sampleAlerts = [
    {
      tokenId: insertedTokens[0].id,
      type: "new_token",
      title: "New Token Alert!",
      message: "$LDRAGO just launched with high volume",
      isRead: false
    },
    {
      tokenId: insertedTokens[1].id,
      type: "price_change",
      title: "Price Spike Alert!",
      message: "$CARROT gained 245% in the last hour",
      isRead: false
    }
  ];

  // Insert alerts
  const insertedAlerts = await db.insert(alerts).values(sampleAlerts).returning();
  console.log(`✅ Inserted ${insertedAlerts.length} alerts`);

  console.log("🎉 Database seeded successfully!");
}