'use client';

import { Navigation } from './Navigation';
import { ThemeProvider } from './ThemeProvider';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </ThemeProvider>
  );
} 