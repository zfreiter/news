# News

## Overview

This project is a web application built with Next.js, Prisma, MongoDB, NextAuth.js, and Cloudinary, hosted on Vercel. It provides a platform similar to Medium, where users can read, write, and interact with stories and articles. Users can sign in using their Gmail or GitHub accounts via NextAuth.js, view stories/articles, comment, like, and bookmark them. Additionally, users have a personal dashboard displaying all their authored stories and articles.

## Technologies Used

- Next.js
- Prisma
- MongoDB
- NextAuth.js
- Cloudinary
- Vercel

## Features

- User authentication via Gmail or GitHub using NextAuth.js
- View stories/articles written by other users
- Create, edit, and delete stories/articles
- Comment on stories/articles
- Like stories/articles
- Bookmark stories/articles
- Upload and store images using Cloudinary
- Personal dashboard displaying user-authored stories/articles

## Setup

1. Clone the repository:

```bash
git clone https://github.com/zfreiter/news.git
cd news
npm install
```

2. Create accounts:

   - Sign up for a [Vercel account](https://vercel.com/signup).
   - Sign up for a [GitHub account](https://github.com/join) if you don't have one.
   - Sign up for a [Google Developer account](https://console.developers.google.com/) to set up Google OAuth authentication.
   - Sign up for a [Cloudinary account](https://cloudinary.com/users/register/free) to store and manage images.
   - Sign up for a [MongoDB account](https://www.mongodb.com/cloud/atlas) to host your MongoDB database.

3. Configure environment variables:

   - Create a `.env.local` file in the root directory and add the following environment variables:

     ```bash
     GITHUB_CLIENT_ID=your-github-client-id
     GITHUB_CLIENT_SECRET=your-github-client-secret
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     NEXTAUTH_URL=http://localhost:3000
     NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-nextauth-secret
     DATABASE_URL="your-mongodb-database-url"
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
     CLOUDINARY_URL=cloudinary://your-cloudinary-api-key:your-cloudinary-api-secret@your-cloudinary-cloud-name
     CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_SECRET=your-cloudinary-api-secret
     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-upload-preset
     ```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

6. Set up authentication providers:

   - In your Vercel dashboard, add environment variables corresponding to the ones in `.env.local`.
   - Set up OAuth applications in your GitHub and Google Developer accounts and configure the client IDs and secrets accordingly.

7. Deploy your application:

   - Deploy your application on Vercel.
   - Ensure you have set up the required environment variables in your Vercel project settings corresponding to those in the `.env.local` file.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project was inspired by Medium and GTCoding.
- Special thanks to the developers of Next.js, Prisma, MongoDB, NextAuth.js, Cloudinary, and Vercel.
- https://www.youtube.com/@GTCoding


Make sure to replace `your-github-client-id`, `your-github-client-secret`, `your-google-client-id`, `your-google-client-secret`, `your-nextauth-secret`, `your-mongodb-database-url`, `your-cloudinary-cloud-name`, `your-cloudinary-api-key`, `your-cloudinary-api-secret`, and `your-cloudinary-upload-preset` with your actual values obtained from your GitHub, Google, NextAuth.js, MongoDB, and Cloudinary configurations.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
