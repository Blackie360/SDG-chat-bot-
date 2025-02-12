# Modern Web Application Starter Kit

A production-ready starter kit for building modern web applications with Next.js, Tailwind CSS, ShadCN, Prisma, and NextAuth.

## Features

- 🚀 Next.js 14 with App Router
- 💅 Tailwind CSS for styling
- 🎨 ShadCN for beautiful, accessible components
- 🔒 NextAuth.js for authentication
- 🗄️ Prisma ORM with PostgreSQL
- 🌙 Dark mode support
- 📱 Responsive design
- 🔧 TypeScript support
- 🧹 ESLint & Prettier configuration
- 🪝 Husky for Git hooks

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/modern-web-starter.git
cd modern-web-starter
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Set up your environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your database credentials and NextAuth secret.

5. Set up the database:
\`\`\`bash
pnpm db:push
\`\`\`

6. Start the development server:
\`\`\`bash
pnpm dev
\`\`\`

## Database Management

- Push schema changes: `pnpm db:push`
- Open Prisma Studio: `pnpm db:studio`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   └── ...             # Other pages
├── components/          # React components
├── lib/                 # Utility functions
├── prisma/             # Prisma schema and migrations
└── public/             # Static files
```

## Deployment

This project is configured for deployment on Vercel. Simply push to your repository and import the project in Vercel.

Remember to set up your environment variables in the Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.