import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTokenSchema, insertAlertSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tokens with optional filters
  app.get("/api/tokens", async (req, res) => {
    try {
      const filters = {
        search: req.query.search as string,
        platform: req.query.platform as string,
        category: req.query.category as string,
        minMarketCap: req.query.minMarketCap ? parseFloat(req.query.minMarketCap as string) : undefined,
        maxMarketCap: req.query.maxMarketCap ? parseFloat(req.query.maxMarketCap as string) : undefined,
        minAge: req.query.minAge ? parseInt(req.query.minAge as string) : undefined,
        maxAge: req.query.maxAge ? parseInt(req.query.maxAge as string) : undefined,
        safetyCheck: req.query.safetyCheck === 'true',
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters] === undefined) {
          delete filters[key as keyof typeof filters];
        }
      });

      const tokens = await storage.getTokens(filters);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tokens" });
    }
  });

  // Get token by ID
  app.get("/api/tokens/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const token = await storage.getToken(id);
      
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }
      
      res.json(token);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch token" });
    }
  });

  // Create new token
  app.post("/api/tokens", async (req, res) => {
    try {
      const validatedData = insertTokenSchema.parse(req.body);
      const token = await storage.createToken(validatedData);
      res.status(201).json(token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid token data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create token" });
    }
  });

  // Update token
  app.patch("/api/tokens/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertTokenSchema.partial().parse(req.body);
      const token = await storage.updateToken(id, updates);
      
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }
      
      res.json(token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update token" });
    }
  });

  // Get all alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  // Create new alert
  app.post("/api/alerts", async (req, res) => {
    try {
      const validatedData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  // Mark alert as read
  app.patch("/api/alerts/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.markAlertAsRead(id);
      res.json({ message: "Alert marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark alert as read" });
    }
  });

  // Get token statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const allTokens = await storage.getTokens();
      const stats = {
        totalTokens: allTokens.length,
        newTokens: allTokens.filter(t => t.category === 'new').length,
        completingTokens: allTokens.filter(t => t.category === 'completing').length,
        completedTokens: allTokens.filter(t => t.category === 'completed').length,
        trendingTokens: allTokens.filter(t => t.category === 'trending').length,
        totalVolume: allTokens.reduce((sum, token) => sum + parseFloat(token.volume24h), 0),
        totalMarketCap: allTokens.reduce((sum, token) => sum + parseFloat(token.marketCap), 0),
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
