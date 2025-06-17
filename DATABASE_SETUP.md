# Database Setup Guide

This project has been configured to use PostgreSQL with Prisma ORM instead of the previous in-memory simulation.

## Prerequisites

1. **PostgreSQL Installation**
   - Install PostgreSQL locally on your machine
   - For macOS: `brew install postgresql`
   - For Ubuntu: `sudo apt-get install postgresql postgresql-contrib`
   - For Windows: Download from [PostgreSQL official website](https://www.postgresql.org/download/)

2. **Start PostgreSQL Service**
   - macOS: `brew services start postgresql`
   - Ubuntu: `sudo systemctl start postgresql`
   - Windows: Start via Services or pgAdmin

## Environment Setup

1. **Create Environment File**
   Create a `.env` file in the root directory with the following content:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ipodcast_search?schema=public"
   ```

   Replace `username` and `password` with your PostgreSQL credentials.

2. **Create Database**
   ```bash
   # Connect to PostgreSQL
   psql -U username -h localhost

   # Create the database
   CREATE DATABASE ipodcast_search;

   # Exit psql
   \q
   ```

## Database Commands

The project includes several convenient npm scripts for database management:

- `pnpm run db:generate` - Generate Prisma client
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:reset` - Reset database (WARNING: This will delete all data)
- `pnpm run db:studio` - Open Prisma Studio (database GUI)
- `pnpm run db:push` - Push schema changes to database

## Database Schema

The database contains two main tables:

### search_records
- `id` (TEXT, Primary Key)
- `searchTerm` (TEXT)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### podcast_results
- `id` (TEXT, Primary Key)
- `collectionId` (INTEGER)
- `trackId` (INTEGER)
- `artistName` (TEXT)
- `collectionName` (TEXT)
- `trackName` (TEXT)
- `collectionViewUrl` (TEXT)
- `feedUrl` (TEXT)
- `artworkUrl30` (TEXT)
- `artworkUrl60` (TEXT)
- `artworkUrl100` (TEXT)
- `collectionPrice` (DOUBLE PRECISION)
- `trackPrice` (DOUBLE PRECISION)
- `releaseDate` (TEXT)
- `collectionExplicitness` (TEXT)
- `trackExplicitness` (TEXT)
- `trackCount` (INTEGER)
- `trackTimeMillis` (INTEGER)
- `country` (TEXT)
- `currency` (TEXT)
- `primaryGenreName` (TEXT)
- `contentAdvisoryRating` (TEXT)
- `artworkUrl600` (TEXT)
- `genreIds` (TEXT[])
- `genres` (TEXT[])
- `searchTerm` (TEXT)
- `createdAt` (TIMESTAMP)
- `searchRecordId` (TEXT, Foreign Key)

## Migration Status

The initial migration has been created and applied. If you're setting up the project for the first time, run:

```bash
pnpm run db:migrate
```

## Viewing Data

To view and interact with your data, you can use:

1. **Prisma Studio** (Recommended)
   ```bash
   pnpm run db:studio
   ```
   This opens a web interface at `http://localhost:5555`

2. **psql Command Line**
   ```bash
   psql -U username -d ipodcast_search
   ```

3. **pgAdmin** - Download and install pgAdmin for a full-featured GUI

## Troubleshooting

1. **Connection Issues**
   - Ensure PostgreSQL is running
   - Check your credentials in the DATABASE_URL
   - Verify the database exists

2. **Migration Issues**
   - Run `pnpm run db:reset` to reset the database (WARNING: This deletes all data)
   - Then run `pnpm run db:migrate` to apply migrations

3. **Prisma Client Issues**
   - Run `pnpm run db:generate` to regenerate the Prisma client 