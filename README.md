# Democratic Muzic App

A modern web application for collaborative music discovery and playlist creation. Built with Next.js using the App Router architecture.

## Features

- User authentication with NextAuth.js
- YouTube music search and integration
- Collaborative playlist creation
- Modern UI with Tailwind CSS and shadcn/ui components
- Real-time updates with React Hot Toast notifications
- Type-safe development with TypeScript
- Database management with Prisma

## Tech Stack

- **Framework**: Next.js 15.1.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: Prisma
- **API Integration**: YouTube Search API
- **State Management**: React Hooks
- **Form Validation**: Zod

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A YouTube API key (for music search functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/democratic-muzic-app.git
cd democratic-muzic-app
```

2. Install dependencies:
```bash
cd muzer
npm install
```

3. Set up environment variables:
Create a `.env` file in the `muzer` directory with the following variables:
```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
YOUTUBE_API_KEY="your_youtube_api_key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
