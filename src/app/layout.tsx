import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Jcarl Juson | AI Engineer & Neuroscientist",
  description: "Portfolio of Jcarl Juson - AI Engineer, Neuroscientist, and one of the youngest pioneering inventors of EEG and EMG robotics technology.",
  keywords: [
    "Jcarl Juson",
    "Jcarl C Juson",
    "Jcarl Ciocson",
    "Jcarl Ciocson Juson",
    "Jcarl",
    "AI Engineer",
    "Neuroscientist",
    "Machine Learning Engineer",
    "Robotics Engineer",
    "AI Engineer Portfolio",
    "Robotics Engineer Portfolio",
    "EEG Robotics",
    "EMG Robotics",
    "Youngest Pioneering Inventor in EEG Robotics",
    "Youngest Pioneering Inventor in EMG Robotics",
    "NASA Space Apps Nominee",
    "Brain-Computer Interface",
    "Artificial Intelligence",
    "Neurotechnology",
    "Quantum Computing",
    "Quantum Machine Learning",
    "Portfolio",
    "Manila",
    "Philippines"
  ],
  authors: [{ name: "Jcarl Juson", url: "https://jcarljuson.com" }],
  creator: "Jcarl Juson",
  publisher: "Jcarl Juson",
  openGraph: {
    title: "Jcarl Juson | AI Engineer & Neuroscientist",
    description: "Portfolio of Jcarl Juson - AI Engineer, Neuroscientist, and one of the youngest pioneering inventors of EEG and EMG robotics technology.",
    url: "https://jcarljuson.com",
    siteName: "Jcarl Juson Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile_pixel.png",
        width: 800,
        height: 600,
        alt: "Jcarl Juson Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jcarl Juson | AI Engineer & Neuroscientist",
    description: "Portfolio of Jcarl Juson - AI Engineer, Neuroscientist, and one of the youngest pioneering inventors of EEG and EMG robotics technology.",
    images: ["/profile_pixel.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/profile_pixel.png?v=2",
    shortcut: "/profile_pixel.png?v=2",
    apple: "/profile_pixel.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data (Hidden Info for Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jcarl Juson",
    alternateName: [
      "Jcarl C Juson",
      "Jcarl Ciocson",
      "Jcarl Ciocson Juson",
      "Jcarl"
    ],
    url: "https://jcarljuson.com",
    image: "https://jcarljuson.com/profile_pixel.png",
    jobTitle: ["AI Engineer", "Neuroscientist", "Robotics Engineer", "Quantum Computing Enthusiast", "Inventor"],
    description: "One of the youngest pioneering inventors of EEG and EMG robotics technology. Specializing in BMI (Brain-Machine Interfaces) and Quantum Computing.",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Independent Researcher"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "National University"
    },
    award: [
      "NASA International Space Apps Global Nominee",
      "Dean's First Honor",
      "Utility Model Patent Pending (EMG Prosthetics)",
      "Pioneer in EEG/EMG Robotics Technology"
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Neuroscience",
      "Robotics",
      "Machine Learning",
      "Brain-Computer Interfaces",
      "Exoplanet Detection",
      "Quantum Computing",
      "EEG Robotics",
      "EMG Robotics"
    ],
    sameAs: [
      "https://www.facebook.com/jcarlciocsonjuson",
      "https://www.linkedin.com/in/jcarl-juson-565796360/",
      "https://github.com/jcarljuson",
      "https://www.researchgate.net/profile/Jcarl-Juson"
    ]
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
