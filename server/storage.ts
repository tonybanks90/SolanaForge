import { tokens, alerts, users, type Token, type InsertToken, type Alert, type InsertAlert, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, and, or, gte, lte, ilike, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Token methods
  getTokens(filters?: {
    search?: string;
    platform?: string;
    category?: string;
    minMarketCap?: number;
    maxMarketCap?: number;
    minAge?: number;
    maxAge?: number;
    safetyCheck?: boolean;
  }): Promise<Token[]>;
  getToken(id: number): Promise<Token | undefined>;
  getTokenByAddress(address: string): Promise<Token | undefined>;
  createToken(token: InsertToken): Promise<Token>;
  updateToken(id: number, updates: Partial<InsertToken>): Promise<Token | undefined>;
  
  // Alert methods
  getAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tokens: Map<number, Token>;
  private alerts: Map<number, Alert>;
  private currentUserId: number;
  private currentTokenId: number;
  private currentAlertId: number;

  constructor() {
    this.users = new Map();
    this.tokens = new Map();
    this.alerts = new Map();
    this.currentUserId = 1;
    this.currentTokenId = 1;
    this.currentAlertId = 1;

    // Initialize with some sample tokens
    this.initializeSampleData();
  }

  private initializeSampleData() {
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
        address: "4WpXqNhQjNGQqmNhQjNGQqmNhQjNGUKH",
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

    sampleTokens.forEach(token => {
      const newToken: Token = {
        ...token,
        id: this.currentTokenId++,
        createdAt: new Date()
      };
      this.tokens.set(newToken.id, newToken);
    });

    // Add some sample alerts
    const sampleAlerts = [
      {
        tokenId: 1,
        type: "new_token",
        title: "New Token Alert!",
        message: "$LDRAGO just launched with high volume",
        isRead: false
      },
      {
        tokenId: 2,
        type: "price_change",
        title: "Price Spike Alert!",
        message: "$CARROT gained 245% in the last hour",
        isRead: false
      }
    ];

    sampleAlerts.forEach(alertData => {
      const newAlert: Alert = {
        id: this.currentAlertId++,
        tokenId: alertData.tokenId,
        type: alertData.type,
        title: alertData.title,
        message: alertData.message,
        isRead: alertData.isRead,
        createdAt: new Date()
      };
      this.alerts.set(newAlert.id, newAlert);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getTokens(filters?: {
    search?: string;
    platform?: string;
    category?: string;
    minMarketCap?: number;
    maxMarketCap?: number;
    minAge?: number;
    maxAge?: number;
    safetyCheck?: boolean;
  }): Promise<Token[]> {
    let tokens = Array.from(this.tokens.values());

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        tokens = tokens.filter(token => 
          token.symbol.toLowerCase().includes(searchLower) ||
          token.name.toLowerCase().includes(searchLower) ||
          token.address.toLowerCase().includes(searchLower)
        );
      }

      if (filters.platform) {
        tokens = tokens.filter(token => token.platform === filters.platform);
      }

      if (filters.category) {
        tokens = tokens.filter(token => token.category === filters.category);
      }

      if (filters.minMarketCap !== undefined) {
        tokens = tokens.filter(token => parseFloat(token.marketCap) >= filters.minMarketCap!);
      }

      if (filters.maxMarketCap !== undefined) {
        tokens = tokens.filter(token => parseFloat(token.marketCap) <= filters.maxMarketCap!);
      }

      if (filters.minAge !== undefined) {
        tokens = tokens.filter(token => token.age >= filters.minAge!);
      }

      if (filters.maxAge !== undefined) {
        tokens = tokens.filter(token => token.age <= filters.maxAge!);
      }

      if (filters.safetyCheck) {
        tokens = tokens.filter(token => token.safetyScore >= 7);
      }
    }

    // Sort by creation time (newest first)
    return tokens.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  async getToken(id: number): Promise<Token | undefined> {
    return this.tokens.get(id);
  }

  async getTokenByAddress(address: string): Promise<Token | undefined> {
    return Array.from(this.tokens.values()).find(token => token.address === address);
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = this.currentTokenId++;
    const token: Token = {
      ...insertToken,
      id,
      createdAt: new Date()
    };
    this.tokens.set(id, token);
    return token;
  }

  async updateToken(id: number, updates: Partial<InsertToken>): Promise<Token | undefined> {
    const token = this.tokens.get(id);
    if (!token) return undefined;

    const updatedToken = { ...token, ...updates };
    this.tokens.set(id, updatedToken);
    return updatedToken;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.currentAlertId++;
    const alert: Alert = {
      ...insertAlert,
      id,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async markAlertAsRead(id: number): Promise<void> {
    const alert = this.alerts.get(id);
    if (alert) {
      alert.isRead = true;
      this.alerts.set(id, alert);
    }
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getTokens(filters?: {
    search?: string;
    platform?: string;
    category?: string;
    minMarketCap?: number;
    maxMarketCap?: number;
    minAge?: number;
    maxAge?: number;
    safetyCheck?: boolean;
  }): Promise<Token[]> {
    let query = db.select().from(tokens);
    const conditions = [];

    if (filters) {
      if (filters.search) {
        const searchLower = `%${filters.search.toLowerCase()}%`;
        conditions.push(
          or(
            ilike(tokens.symbol, searchLower),
            ilike(tokens.name, searchLower),
            ilike(tokens.address, searchLower)
          )
        );
      }

      if (filters.platform) {
        conditions.push(eq(tokens.platform, filters.platform));
      }

      if (filters.category) {
        conditions.push(eq(tokens.category, filters.category));
      }

      if (filters.minMarketCap !== undefined) {
        conditions.push(gte(tokens.marketCap, filters.minMarketCap.toString()));
      }

      if (filters.maxMarketCap !== undefined) {
        conditions.push(lte(tokens.marketCap, filters.maxMarketCap.toString()));
      }

      if (filters.minAge !== undefined) {
        conditions.push(gte(tokens.age, filters.minAge));
      }

      if (filters.maxAge !== undefined) {
        conditions.push(lte(tokens.age, filters.maxAge));
      }

      if (filters.safetyCheck) {
        conditions.push(gte(tokens.safetyScore, 7));
      }
    }

    if (conditions.length > 0) {
      const result = await db.select().from(tokens)
        .where(and(...conditions))
        .orderBy(desc(tokens.createdAt));
      return result;
    }

    const result = await db.select().from(tokens).orderBy(desc(tokens.createdAt));
    return result;
  }

  async getToken(id: number): Promise<Token | undefined> {
    const [token] = await db.select().from(tokens).where(eq(tokens.id, id));
    return token || undefined;
  }

  async getTokenByAddress(address: string): Promise<Token | undefined> {
    const [token] = await db.select().from(tokens).where(eq(tokens.address, address));
    return token || undefined;
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const [token] = await db
      .insert(tokens)
      .values(insertToken)
      .returning();
    return token;
  }

  async updateToken(id: number, updates: Partial<InsertToken>): Promise<Token | undefined> {
    const [token] = await db
      .update(tokens)
      .set(updates)
      .where(eq(tokens.id, id))
      .returning();
    return token || undefined;
  }

  async getAlerts(): Promise<Alert[]> {
    const result = await db.select().from(alerts).orderBy(desc(alerts.createdAt));
    return result;
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const [alert] = await db
      .insert(alerts)
      .values(insertAlert)
      .returning();
    return alert;
  }

  async markAlertAsRead(id: number): Promise<void> {
    await db
      .update(alerts)
      .set({ isRead: true })
      .where(eq(alerts.id, id));
  }
}

export const storage = new DatabaseStorage();
