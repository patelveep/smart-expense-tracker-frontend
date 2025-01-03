# Smart Expense Tracker Frontend

## Getting Started

Before you run the development server, you need to install the necessary npm packages. Run the following command in your project directory:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

The project structure is as follows:

```
/home/rohan/smart-expense-tracker-frontend
├── public
│   ├── favicon.ico
│   └── ...
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

- **public/**: Contains static assets such as images and the favicon.
- **src/components/**: Contains React components used throughout the application.
- **src/pages/**: Contains the page components for different routes.
- **src/styles/**: Contains global and component-specific styles.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Expense Management**: Users can add, update, and delete expenses.
- **Expense Summary**: View expenses by category, date, and year.
- **Responsive Design**: The application is responsive and works on various devices.
- **Dark Mode**: Supports dark mode for better user experience.

## Dependencies

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **ApexCharts**: Modern charting library.
- **Axios**: Promise-based HTTP client.
- **date-fns**: Modern JavaScript date utility library.
- **js-cookie**: JavaScript API for handling cookies.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the production server after building the app.

### `npm run lint`

Runs ESLint to check for code quality issues.

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_API_KEY=your_api_key_here
```

## API Endpoints

- **Login**: `POST /login`
- **Register**: `POST /register`
- **Get Expenses**: `GET /expenses`
- **Add Expense**: `POST /expenses`
- **Update Expense**: `PUT /expenses/:id`
- **Delete Expense**: `DELETE /expenses/:id`
- **Get Summary**: `GET /getSummary`

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js)
