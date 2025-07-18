# Replit Markdown File

## Overview

This is a fullstack digital library web application built with a modern React frontend and Express.js backend. The application allows users to browse and purchase digital books with PDF preview functionality, watch educational videos, and includes an admin dashboard for content management. It features a flipbook-style PDF viewer, Paystack payment integration, and a complete authentication system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Design**: New York style theme with neutral base colors and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication with bcryptjs for password hashing
- **File Uploads**: Multer middleware for handling PDF and image uploads
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

## Key Components

### Frontend Components
- **Navigation**: Sticky header with cart functionality
- **BookCard**: Displays book information with preview and purchase options
- **FlipBookViewer**: PDF preview component with page limitations (first 3 pages free)
- **VideoCard**: Video display with external platform integration
- **PaymentModal**: Paystack payment integration interface
- **Cart**: Shopping cart with localStorage persistence
- **AuthorSection**: About page with social media links

### Backend Components
- **Storage Layer**: In-memory storage implementation with interface for future database integration
- **Authentication Middleware**: JWT token verification
- **API Routes**: RESTful endpoints for books, videos, authentication, and purchases
- **File Upload Handling**: Multer configuration for PDF and image uploads

### Database Schema
- **Users**: Admin authentication (username, password, role)
- **Books**: Digital book metadata (title, author, description, price, cover image, PDF file)
- **Videos**: Educational video information (title, description, thumbnail, platform, URL, duration)
- **Purchases**: Transaction records (email, book reference, transaction details, timestamp)

## Data Flow

### Book Purchase Flow
1. User browses book catalog
2. User previews first 3 pages in flipbook viewer
3. Attempt to view page 4+ triggers payment modal
4. Paystack payment processing
5. Successful payment allows full PDF download
6. Purchase record stored with transaction reference

### Content Management Flow
1. Admin authenticates via JWT
2. Admin can create, read, update, delete books and videos
3. File uploads handled via Multer
4. Real-time updates reflected in public catalog

### Authentication Flow
1. Admin login with username/password
2. Password verification with bcryptjs
3. JWT token generation and storage
4. Token-based API access control

## External Dependencies

### Payment Processing
- **Paystack**: Inline payment integration for book purchases
- **Configuration**: Requires VITE_PAYSTACK_PUBLIC_KEY environment variable

### Database
- **Neon Database**: Serverless PostgreSQL via @neondatabase/serverless
- **Configuration**: Requires DATABASE_URL environment variable
- **Migration**: Drizzle Kit for schema migrations

### UI Components
- **Radix UI**: Headless component primitives
- **React Icons**: Additional icon library (TikTok icons)
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Replit Integration**: Cartographer plugin and runtime error modal
- **TypeScript**: Full type safety across the stack
- **Vite**: Development server with HMR

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized React application to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle pushes schema changes to PostgreSQL

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `VITE_PAYSTACK_PUBLIC_KEY`: Paystack public key for payments
- `NODE_ENV`: Environment flag (development/production)

### Production Considerations
- Serves static files from `dist/public` in production
- Vite middleware only enabled in development
- File uploads stored in `uploads/` directory
- Session storage requires PostgreSQL connection
- HTTPS required for Paystack payment processing

### Replit Deployment
- Configured for Replit environment with dev banner
- Cartographer integration for development mode
- Runtime error overlay for debugging
- Automatic dependency installation via package.json