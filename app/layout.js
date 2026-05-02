import './globals.css';

export const metadata = {
  title: 'Listing Glow Up AI',
  description: 'Turn listing photos into staging prompts, listing copy, and social-ready marketing in minutes.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
