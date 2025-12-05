# 💻 Horizon Credit Repair — Website Coding Overview

---

## 1. Technology Stack

### 1.1 Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x (App Router) | React framework with SSR/SSG |
| **React** | 18.x | UI component library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Node.js** | 20.x LTS | Runtime environment |

### 1.2 Styling & UI

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Accessible component primitives |
| **Radix UI** | Headless UI components |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon library |

### 1.3 State & Data

| Technology | Purpose |
|------------|---------|
| **Zustand** | Client-side state management |
| **TanStack Query** | Server state & caching |
| **React Hook Form** | Form handling |
| **Zod** | Schema validation |

### 1.4 CMS & Content

| Technology | Purpose |
|------------|---------|
| **Sanity.io** | Headless CMS |
| **next-sanity** | Sanity + Next.js integration |
| **Portable Text** | Rich text rendering |

---

## 2. Project Structure

```
src/website/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages group
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Marketing layout
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── learn/
│   │   │   ├── page.tsx
│   │   │   └── [category]/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── company/
│   │   │   └── [...slug]/
│   │   │       └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # Protected dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                      # API routes
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── newsletter/
│   │   │   └── route.ts
│   │   └── analysis/
│   │       └── route.ts
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Error boundary
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   ├── mega-menu.tsx
│   │   └── mobile-nav.tsx
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── testimonials.tsx
│   │   ├── pricing-table.tsx
│   │   ├── cta-section.tsx
│   │   └── trust-badges.tsx
│   ├── forms/                    # Form components
│   │   ├── contact-form.tsx
│   │   ├── analysis-wizard.tsx
│   │   ├── newsletter-form.tsx
│   │   └── consultation-booking.tsx
│   ├── blog/                     # Blog components
│   │   ├── article-card.tsx
│   │   ├── article-content.tsx
│   │   ├── author-bio.tsx
│   │   └── related-posts.tsx
│   └── shared/                   # Shared components
│       ├── seo.tsx
│       ├── analytics.tsx
│       ├── chat-widget.tsx
│       └── social-proof.tsx
│
├── lib/                          # Utility libraries
│   ├── sanity/                   # Sanity configuration
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── schemas/
│   │       ├── post.ts
│   │       ├── author.ts
│   │       └── page.ts
│   ├── utils/                    # Helper functions
│   │   ├── cn.ts                 # Class name utility
│   │   ├── format.ts             # Formatters
│   │   └── validation.ts         # Validators
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-scroll.ts
│   │   ├── use-media-query.ts
│   │   └── use-analytics.ts
│   └── api/                      # API client functions
│       ├── contact.ts
│       └── newsletter.ts
│
├── styles/                       # Additional styles
│   └── fonts.ts                  # Font configuration
│
├── types/                        # TypeScript types
│   ├── index.ts
│   ├── sanity.ts
│   └── api.ts
│
├── config/                       # Configuration
│   ├── site.ts                   # Site metadata
│   ├── navigation.ts             # Nav structure
│   └── seo.ts                    # SEO defaults
│
└── public/                       # Static assets
    ├── images/
    ├── fonts/
    └── icons/
```

---

## 3. Key Architectural Patterns

### 3.1 Component Architecture

```typescript
// Component Structure Pattern
// components/sections/hero.tsx

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  className?: string;
}

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) {
  return (
    <section className={cn("relative py-20 lg:py-32", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h1 className="text-4xl lg:text-6xl font-bold">{title}</h1>
        <p className="mt-6 text-xl text-muted-foreground">{subtitle}</p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg">
            <a href={primaryCta.href}>{primaryCta.text}</a>
          </Button>
          {secondaryCta && (
            <Button asChild variant="outline" size="lg">
              <a href={secondaryCta.href}>{secondaryCta.text}</a>
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
```

### 3.2 Data Fetching Pattern

```typescript
// app/(marketing)/blog/page.tsx

import { sanityClient } from "@/lib/sanity/client";
import { postsQuery } from "@/lib/sanity/queries";
import { ArticleCard } from "@/components/blog/article-card";

// ISR with 60 second revalidation
export const revalidate = 60;

async function getPosts() {
  return sanityClient.fetch(postsQuery);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold">Credit Education Blog</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
```

### 3.3 Form Handling Pattern

```typescript
// components/forms/contact-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { submitContact } from "@/lib/api/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      form.reset();
      // Show success toast
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## 4. Key Libraries & Tools

### 4.1 Production Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    
    "@radix-ui/react-accordion": "^1.1.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-navigation-menu": "^1.1.0",
    "@radix-ui/react-tabs": "^1.0.0",
    
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0",
    
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.294.0",
    
    "@sanity/client": "^6.0.0",
    "next-sanity": "^7.0.0",
    "@portabletext/react": "^3.0.0",
    
    "tailwindcss": "^3.4.0",
    "tailwind-merge": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    
    "date-fns": "^2.30.0",
    "recharts": "^2.9.0"
  }
}
```

### 4.2 Development Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    
    "eslint": "^8.54.0",
    "eslint-config-next": "^14.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

---

## 5. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Pages | kebab-case folder | `app/credit-repair/page.tsx` |
| Utilities | camelCase | `formatCurrency.ts` |
| Hooks | camelCase with use prefix | `useScrollPosition.ts` |
| Types | PascalCase | `UserProfile.ts` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS.ts` |
| CSS Modules | camelCase | `heroSection.module.css` |
| Tests | Same as source + .test | `Button.test.tsx` |

---

## 6. Testing Strategy

### 6.1 Unit Testing (Vitest)

```typescript
// components/ui/button.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
```

### 6.2 Integration Testing (Playwright)

```typescript
// e2e/contact-form.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test("submits form successfully", async ({ page }) => {
    await page.goto("/contact");
    
    await page.fill('[name="name"]', "John Doe");
    await page.fill('[name="email"]', "john@example.com");
    await page.fill('[name="message"]', "I need help with my credit.");
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator(".success-message")).toBeVisible();
  });

  test("shows validation errors", async ({ page }) => {
    await page.goto("/contact");
    await page.click('button[type="submit"]');
    
    await expect(page.locator(".error-message")).toHaveCount(3);
  });
});
```

### 6.3 Testing Coverage Goals

| Area | Target Coverage |
|------|-----------------|
| Components | 80% |
| Utilities | 95% |
| Hooks | 90% |
| API Routes | 85% |
| E2E Critical Paths | 100% |

---

## 7. Code Quality Standards

### 7.1 ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
};
```

### 7.2 Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 8. Performance Optimization

### 8.1 Image Optimization

```typescript
// Using Next.js Image component
import Image from "next/image";

export function OptimizedImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Credit repair success"
      width={1200}
      height={600}
      priority // For above-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

### 8.2 Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from "next/dynamic";

const CreditCalculator = dynamic(
  () => import("@/components/tools/credit-calculator"),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false, // Client-side only
  }
);
```

### 8.3 Caching Strategy

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

---

*Document Version: 1.0*
*Last Updated: December 2024*

