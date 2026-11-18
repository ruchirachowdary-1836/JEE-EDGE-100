import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "JEE EDGE 100", template: "%s · JEE EDGE 100" },
  description: "Structured, human-authored JEE Main 2027 preparation: concepts, formulas, practice, mocks and revision.",
};

export const viewport: Viewport = { themeColor: "#060a1c" };

// Applies the saved theme before paint (dark by default) to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('jee-theme');if(t!=='light'){document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
