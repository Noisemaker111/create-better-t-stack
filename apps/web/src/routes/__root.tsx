import type { ConvexQueryClient } from "@convex-dev/react-query";
import { Databuddy } from "@databuddy/sdk/react";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { ConvexProvider } from "convex/react";

import { Toaster } from "@/components/ui/sonner";
import Footer from "../components/footer";
import Header from "../components/header";
import appCss from "../index.css?url";

export interface RouterAppContext {
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "BTG Gutters | Expert Gutter Installation in Garden City, MI",
      },
      {
        name: "description",
        content:
          "Family-owned gutter company serving Garden City, MI and surrounding areas. 5-star rated, 100% insured. Seamless gutter installation, repair, leaf guards & more. Free estimates! Call (248) 561-7790",
      },
      {
        name: "keywords",
        content:
          "gutter installation, gutter repair, seamless gutters, leaf guards, gutter guards, soffit repair, fascia repair, Garden City MI, Detroit gutters, gutter company near me",
      },
      {
        property: "og:title",
        content: "BTG Gutters | Expert Gutter Installation in Garden City, MI",
      },
      {
        property: "og:description",
        content:
          "Family-owned gutter company with 22+ years experience. 5-star rated, 100% insured. Free estimates!",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        name: "geo.region",
        content: "US-MI",
      },
      {
        name: "geo.placename",
        content: "Garden City",
      },
      {
        name: "theme-color",
        content: "#1eeb00",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://btggutters.com",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/images/logo.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  const { convexQueryClient } = Route.useRouteContext();
  return (
    <ConvexProvider client={convexQueryClient.convexClient}>
      <html className="scroll-smooth" lang="en">
        <head>
          <HeadContent />
          {/* Local Business Structured Data */}
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "BTG Gutters",
                image: "https://btggutters.com/images/logo.png",
                description:
                  "Family-owned gutter installation and repair company serving Garden City, MI and surrounding areas with 22+ years of experience.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "30868 Dawson Ave",
                  addressLocality: "Garden City",
                  addressRegion: "MI",
                  postalCode: "48135",
                  addressCountry: "US",
                },
                telephone: "+1-248-561-7790",
                email: "btggutters@gmail.com",
                url: "https://btggutters.com",
                priceRange: "$$",
                paymentAccepted:
                  "Cash, Check, Credit Card, Venmo, Zelle, Apple Pay",
                currenciesAccepted: "USD",
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    opens: "08:00",
                    closes: "21:00",
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Saturday", "Sunday"],
                    opens: "09:00",
                    closes: "20:00",
                  },
                ],
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5.0",
                  reviewCount: "40",
                  bestRating: "5",
                },
                review: [
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Robert T.",
                    },
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                    },
                    reviewBody:
                      "Best gutter company I've ever worked with. They were honest about what we actually needed and saved us money. The father-son team is fantastic!",
                  },
                ],
                areaServed: [
                  {
                    "@type": "Place",
                    name: "Garden City, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Livonia, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Westland, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Dearborn, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Detroit, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Canton, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Plymouth, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Redford, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Southfield, MI",
                  },
                  {
                    "@type": "Place",
                    name: "Farmington Hills, MI",
                  },
                ],
                serviceType: [
                  "Gutter Installation",
                  "Gutter Repair",
                  "Leaf Guard Installation",
                  "Soffit and Fascia Repair",
                  "Commercial Gutter Services",
                ],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Gutter Services",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Gutter Installation & Replacement",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Gutter Repair",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Leaf Guards & Gutter Guards",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Soffit & Fascia Repairs",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Commercial Gutters",
                      },
                    },
                  ],
                },
                sameAs: [
                  "https://www.facebook.com/BTGgutters/",
                  "https://www.google.com/maps/place/BTG+Gutters/@42.32534,-83.3315,14z",
                ],
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "42.32534",
                  longitude: "-83.33150",
                },
                founder: {
                  "@type": "Person",
                  name: "Father and Son Team",
                },
                yearsEstablished: "22",
              }),
            }}
            type="application/ld+json"
          />
        </head>
        <body className="min-h-screen bg-background text-foreground antialiased">
          <Databuddy
            clientId="c8c135f7-beb6-41d5-9118-a204fd0ba204"
            trackAttributes={true}
            trackErrors={true}
            trackHashChanges={true}
            trackInteractions={true}
            trackOutgoingLinks={true}
            trackScrollDepth={true}
            trackWebVitals={true}
          />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
          <Toaster richColors />
          <Scripts />
        </body>
      </html>
    </ConvexProvider>
  );
}
