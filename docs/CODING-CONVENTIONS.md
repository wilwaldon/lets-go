# Coding Conventions

## Naming

- **Files:** kebab-case for all files (`contact-form.tsx`, `use-auth.ts`)
- **Components:** PascalCase (`ContactForm`, `BookingCalendar`)
- **Hooks:** camelCase with `use` prefix (`useAuth`, `useBooking`)
- **Types/Interfaces:** PascalCase with descriptive names (`BookingSlot`, `MenuCategory`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_BOOKING_DAYS`, `DEFAULT_CURRENCY`)
- **Database tables:** snake_case (`booking_slots`, `menu_items`)
- **Database columns:** snake_case (`created_at`, `business_name`)

## Component Pattern

Every component follows this structure:

```tsx
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BookingSlot } from "@/types";

// 2. Types (if component-specific)
interface BookingCardProps {
  slot: BookingSlot;
  onBook: (slotId: string) => void;
}

// 3. Component
export function BookingCard({ slot, onBook }: BookingCardProps) {
  // hooks first
  const [isLoading, setIsLoading] = useState(false);

  // handlers
  const handleBook = async () => {
    setIsLoading(true);
    await onBook(slot.id);
    setIsLoading(false);
  };

  // render
  return <div className="rounded-lg border p-4">{/* ... */}</div>;
}
```

## Import Aliases

- `@/` maps to `src/`
- Always use aliases, never relative paths beyond one level (`../`)

## State Management

- **Local state:** `useState` / `useReducer`
- **Server state:** TanStack Query (React Query) for all Supabase data fetching
- **Global state:** React Context only when truly needed (auth, theme, site config)
- **No Redux, no Zustand** — keep it simple

## Error Handling

- All async operations wrapped in try/catch
- User-facing errors displayed via toast notifications
- Console errors for development debugging
- Supabase errors mapped to user-friendly messages

## Accessibility

- Semantic HTML elements (`nav`, `main`, `section`, `article`)
- All images have `alt` text
- All form inputs have associated labels
- Keyboard navigation works on all interactive elements
- Focus management on modals and dialogs
- Color contrast meets WCAG AA minimum

## Testing

- No tests required for initial build
- Structure code to be testable (pure functions, separated logic)
- Tests will be added in a later phase
