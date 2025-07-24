# Token Tracker Dashboard

## Overview

This is a modern web application for tracking and analyzing cryptocurrency tokens, specifically focused on meme coins and new token launches. The application provides real-time token data, filtering capabilities, safety analysis, and alert systems for traders and investors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo architecture with clear separation between client, server, and shared components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Storage**: Currently using in-memory storage with interface for future database integration
- **Database ORM**: Drizzle ORM configured for PostgreSQL (ready for future integration)
- **Session Management**: Prepared for PostgreSQL sessions with connect-pg-simple

### Development Setup
- **Development Server**: Vite dev server with HMR
- **TypeScript**: Strict mode with path mapping
- **Linting/Formatting**: Modern ESM configuration
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Data Models
1. **Tokens**: Core entity with comprehensive metadata including price, market cap, safety scores, and platform information
2. **Alerts**: Notification system for token events and price changes
3. **Users**: User management system (prepared but not fully implemented)

### Frontend Components
1. **Dashboard**: Main application view with token listing and filtering
2. **Token Table**: Sortable, filterable table with real-time data
3. **Sidebar**: Advanced filtering interface with safety checks
4. **Header**: Navigation, theme switching, and controls
5. **Floating Alerts**: Real-time notification system
6. **Mobile Menu**: Responsive navigation for mobile devices

### Backend Services
1. **Token API**: RESTful endpoints for token CRUD operations
2. **Alert System**: Real-time alert generation and management
3. **Storage Layer**: Abstracted storage interface supporting both in-memory and database implementations

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query for caching and synchronization
2. **API Processing**: Express server processes requests and applies filters
3. **Data Storage**: Currently uses in-memory storage, designed to easily switch to PostgreSQL
4. **Real-time Updates**: Prepared for WebSocket integration for live data feeds
5. **Alert Generation**: System monitors token changes and generates alerts automatically

## External Dependencies

### Core Dependencies
- **UI Framework**: React ecosystem with Radix UI primitives
- **Database**: Neon Database (PostgreSQL) with Drizzle ORM
- **Styling**: Tailwind CSS with PostCSS
- **Development**: Vite, TypeScript, ESBuild for production builds

### Third-party Integrations
- **Database Provider**: Neon serverless PostgreSQL
- **Development Tools**: Replit-specific plugins for development environment
- **Icon Library**: Lucide React for consistent iconography

### Safety and Analysis Tools
- **Token Safety**: Honeypot detection, LP burn verification, contract renouncement checks
- **Market Data**: Price tracking, volume analysis, holder statistics
- **Alert System**: Multiple alert types for different market events

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Environment variable based configuration for easy switching
- **Build Process**: Separate client and server build processes

### Production Build
- **Client**: Vite builds static assets to `dist/public`
- **Server**: ESBuild bundles Node.js application with external dependencies
- **Database**: Drizzle migrations for schema management
- **Environment**: Production-ready configuration with error handling

### Scalability Considerations
- **Database**: PostgreSQL ready with connection pooling
- **Caching**: React Query provides client-side caching
- **API Design**: RESTful architecture with proper HTTP status codes
- **Mobile Support**: Responsive design with mobile-first approach

The application is designed with modularity and scalability in mind, making it easy to add new features, integrate external APIs, and scale to handle more users and data volume.