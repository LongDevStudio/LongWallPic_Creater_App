import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeSelector";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Wallpaper Website",
    description: "A beautiful collection of wallpapers"
};

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function LocaleLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <AuthProvider>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </AuthProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
