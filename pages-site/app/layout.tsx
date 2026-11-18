import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "../../src/app/globals.css";
import { SiteShell } from "./SiteShell";

export const metadata: Metadata = {
  title: { default: "JEE EDGE 100", template: "%s · JEE EDGE 100" },
  description: "JEE Main 2027 preparation: master notes, formula lab, interactive concept animations, chemistry lab and graded practice.",
};
export const viewport: Viewport = { themeColor: "#060a1c" };

const themeScript = `try{var t=localStorage.getItem('jee-theme');if(t!=='light'){document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen font-sans"><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
