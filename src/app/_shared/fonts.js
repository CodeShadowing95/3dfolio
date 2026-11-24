import { JetBrains_Mono, Poppins } from "next/font/google";

// Police servie par le site lui-même (téléchargée au build), uniquement les graisses utilisées
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-poppins",
});

// Police secondaire de la charte : étiquettes techniques, numéros, extraits de code
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const fontClassName = `${poppins.variable} ${jetbrainsMono.variable}`;
