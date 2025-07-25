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
    // Solana Tokens
    {
      symbol: "LDRAGO",
      name: "Legendary Dragon",
      address: "7V3QjzLezFFAG5QHP1PVG3i7UC2LTjKvPEVYc1fjbonk",
      price: "0.0024",
      marketCap: "156700",
      volume24h: "45200",
      holders: 1247,
      priceChange24h: "15.6",
      chain: "solana",
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
      chain: "solana",
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
      chain: "solana",
      platform: "meteora",
      age: 180,
      lpBurned: false,
      renounced: false,
      honeypotCheck: false,
      safetyScore: 3,
      category: "completed",
      socialLinks: JSON.stringify({})
    },
    // Bitcoin Tokens
    {
      symbol: "BTCMEME",
      name: "Bitcoin Meme",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      price: "0.00045",
      marketCap: "892000",
      volume24h: "234500",
      holders: 2134,
      priceChange24h: "89.7",
      chain: "bitcoin",
      platform: "odin.fun",
      age: 15,
      lpBurned: true,
      renounced: false,
      honeypotCheck: true,
      safetyScore: 7,
      category: "trending",
      socialLinks: JSON.stringify({
        twitter: "https://x.com/btcmeme",
        website: "https://btcmeme.fun"
      })
    },
    {
      symbol: "SATOSHI",
      name: "Satoshi Token",
      address: "bc1pqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3sf2dp",
      price: "0.0012",
      marketCap: "345600",
      volume24h: "78900",
      holders: 789,
      priceChange24h: "23.4",
      chain: "bitcoin",
      platform: "tychi.fun",
      age: 45,
      lpBurned: false,
      renounced: true,
      honeypotCheck: true,
      safetyScore: 6,
      category: "new",
      socialLinks: JSON.stringify({
        telegram: "https://t.me/satoshitoken"
      })
    },
    // Ethereum Tokens
    {
      symbol: "UNIMEME",
      name: "Uniswap Meme",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      price: "0.0567",
      marketCap: "12450000",
      volume24h: "3456700",
      holders: 8934,
      priceChange24h: "156.8",
      chain: "ethereum",
      platform: "uniswap",
      age: 3,
      lpBurned: true,
      renounced: true,
      honeypotCheck: true,
      safetyScore: 9,
      category: "trending",
      socialLinks: JSON.stringify({
        twitter: "https://x.com/unimeme",
        website: "https://unimeme.io",
        discord: "https://discord.gg/unimeme"
      })
    },
    {
      symbol: "ETHBULL",
      name: "Ethereum Bull",
      address: "0xA0b86a33E6C0B7C8C1E4CaF092a7dFf0d7F95C4A",
      price: "0.0234",
      marketCap: "5670000",
      volume24h: "1234500",
      holders: 4567,
      priceChange24h: "67.3",
      chain: "ethereum",
      platform: "uniswap",
      age: 12,
      lpBurned: true,
      renounced: false,
      honeypotCheck: true,
      safetyScore: 8,
      category: "new",
      socialLinks: JSON.stringify({
        twitter: "https://x.com/ethbull",
        telegram: "https://t.me/ethbull"
      })
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