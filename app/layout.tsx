export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  );
}

// Named export for Layout
import { NavLinks } from '@/app/ui/nav-links';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavLinks />
        <main>{children}</main>
      </body>
    </html>
  );
}
export function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
