import "@/app/globals.css";
import Providers from "@/lib/providers";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
            <Providers>{children}</Providers>
        </body>
      </html>
    );
  }
  