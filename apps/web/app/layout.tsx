import { type Metadata } from 'next';
import { Poppins } from 'next/font/google';
import 'material-symbols';

export const metadata: Metadata = {
  title: {
    template: '%s | Broken LSP',
    default: 'Example',
  },
  description: 'Example of react-hook-form/zod breaking neovim LSP',
};

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
      {children}
      </body>
    </html>
  );
}
