import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Abson.dev - Artigos sobre Desenvolvimento",
  description: "Artigos e tutoriais sobre desenvolvimento Full Stack, Flutter, Angular, .NET Core, Next.js e tecnologias modernas.",
  keywords: "blog desenvolvimento, artigos programação, tutoriais flutter, next.js, .net core, angular, azure",
  openGraph: {
    title: "Blog | Abson.dev - Artigos sobre Desenvolvimento",
    description: "Artigos e tutoriais sobre desenvolvimento Full Stack, Flutter, Angular, .NET Core, Next.js e tecnologias modernas.",
    url: "https://abson.dev/blog",
    siteName: "Abson.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Abson.dev - Artigos sobre Desenvolvimento",
    description: "Artigos e tutoriais sobre desenvolvimento Full Stack, Flutter, Angular, .NET Core, Next.js e tecnologias modernas.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-20">
      {children}
    </div>
  );
}