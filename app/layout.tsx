import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* Add any layout-level components here */}
        {children}
      </body>
    </html>
  );
}
// Named export for Layout
// export function Template({ children }: { children: React.ReactNode }) {
//   return <div>{children}</div>
// }
