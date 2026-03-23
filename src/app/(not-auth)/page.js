import HomePageClient from "@/components/Home/HomePageClient";

export default function Home() {
  return <HomePageClient />;
}
export async function generateMetadata() {
  return {
    title: "Home",
    description:
      "Visit SOMES ERC to explore mechanical engineering events, student messages, campus notices, academic resources, and community highlights from IOE Purwanchal Campus.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "SOMES ERC | Home",
      description:
        "Explore the official SOMES ERC home page for events, notices, testimonials, and student-led mechanical engineering initiatives.",
      url: "https://someserc.ioepc.edu.np/",
    },
    twitter: {
      title: "SOMES ERC | Home",
      description:
        "Explore the official SOMES ERC home page for events, notices, testimonials, and student-led mechanical engineering initiatives.",
    },
  };
}
