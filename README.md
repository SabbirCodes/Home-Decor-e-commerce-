# Ferrous & Field — Home Decor E-commerce

A full-stack, premium home decor e-commerce site built with Next.js (App Router), TypeScript,
MongoDB/Mongoose, NextAuth, ImageKit, and Motion.

## Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Auth**: NextAuth
- **Images**: ImageKit 
- **State**: Zustand
- **Animation**: Motion
- **Toasts**: Sonner
- **Icons**: lucide-react + react-icons
- **HTTP**: axios

## Features

- Product catalog with category filters, sorting, and text search
- Product detail pages with image gallery, reviews & ratings
- Cart (persisted client-side) and checkout with a cash-on-delivery flow
- Auth: email/password, protected routes via middleware
- Wishlist (server-persisted per user)
- Order history for customers
- Admin dashboard: stats overview, product CRUD (with ImageKit image upload), order status management
- Microinteractions throughout: hover quick-add, animated cart badge, spring buttons, toast notifications, staggered grid reveals

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```


### 3. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000`.

