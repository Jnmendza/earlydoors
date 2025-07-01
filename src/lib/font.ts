import { Old_Standard_TT, Bebas_Neue, Roboto } from "next/font/google";

export const bebasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export const oldStandordFont = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-old-standard-tt",
});

export const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});
