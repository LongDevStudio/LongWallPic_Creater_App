'use client'

import Image from 'next/image'
import {Button} from "@/components/ui/button"
import {
    ArrowDown,
    Smartphone,
    ImageIcon,
    Zap,
    PenTool,
    DollarSign,
    Users,
    Tablet,
    Monitor,
    Tv,
    Glasses
} from 'lucide-react'
import {AppShowcase} from '@/components/AppShowcase'
import {Header} from '@/components/Header'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react';
import {FaAndroid, FaApple} from 'react-icons/fa6'

export default function Home() {
    const t = useTranslations()
    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const month = new Date().getMonth();
        const seasonImages = [
            '/images/spring.jpg', // Spring
            '/images/summer.jpg', // Summer
            '/images/fall.jpg',   // Fall
            '/images/winter.jpg'  // Winter
        ];
        const currentSeasonIndex = Math.floor(month / 3); // Determine the current season
        const images = [seasonImages[currentSeasonIndex], ...seasonImages]; // Set the first image to the current season
        setBackgroundImages(images);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [backgroundImages]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow">
                {/* Hero Section */}
                <section
                    className="relative h-[80vh] bg-gradient-to-b from-purple-600 to-blue-600 flex items-center justify-center px-4 text-center">
                    <div className="z-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('hero.title')}</h2>
                        <p className="text-xl text-white mb-8">{t('hero.subtitle')}</p>
                        <Button
                            size="lg"
                            className="bg-white text-purple-600 hover:bg-gray-100"
                            onClick={() => document.getElementById('download-section')?.scrollIntoView({behavior: 'smooth'})}
                        >
                            {t('hero.downloadButton')}
                            <ArrowDown className="ml-2"/>
                        </Button>
                    </div>
                    <div className="absolute inset-0 overflow-hidden">
                        <Carousel images={backgroundImages} currentIndex={currentIndex}/>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-gray-100">
                    <h3 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <FeatureCard
                            icon={<Smartphone className="w-12 h-12 text-purple-600"/>}
                            title={t('features.cards.mobile.title')}
                            description={t('features.cards.mobile.description')}
                        />
                        <FeatureCard
                            icon={<ImageIcon className="w-12 h-12 text-purple-600"/>}
                            title={t('features.cards.collection.title')}
                            description={t('features.cards.collection.description')}
                        />
                        <FeatureCard
                            icon={<Zap className="w-12 h-12 text-purple-600"/>}
                            title={t('features.cards.updates.title')}
                            description={t('features.cards.updates.description')}
                        />
                    </div>
                </section>

                {/* App Showcase Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <h3 className="text-3xl font-bold text-center mb-12">{t('showcase.title')}</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
                        <AppShowcase/>
                        <div className="md:w-1/2 space-y-4">
                            <h4 className="text-2xl font-semibold">{t('showcase.interface.title')}</h4>
                            <p className="text-gray-600">{t('showcase.interface.description')}</p>
                            <h4 className="text-2xl font-semibold">{t('showcase.oneTab.title')}</h4>
                            <p className="text-gray-600">{t('showcase.oneTab.description')}</p>
                            <h4 className="text-2xl font-semibold">{t('showcase.recommendations.title')}</h4>
                            <p className="text-gray-600">{t('showcase.recommendations.description')}</p>
                        </div>
                    </div>
                </section>

                {/* Creator Invitation Section */}
                <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-12">{t('creator.title')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <CreatorFeature
                                icon={<PenTool className="w-12 h-12"/>}
                                title={t('creator.features.showcase.title')}
                                description={t('creator.features.showcase.description')}
                            />
                            <CreatorFeature
                                icon={<DollarSign className="w-12 h-12"/>}
                                title={t('creator.features.earn.title')}
                                description={t('creator.features.earn.description')}
                            />
                            <CreatorFeature
                                icon={<Users className="w-12 h-12"/>}
                                title={t('creator.features.grow.title')}
                                description={t('creator.features.grow.description')}
                            />
                        </div>
                        <div className="text-center mt-12">
                            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                                {t('creator.button')}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Roadmap Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-12">{t('roadmap.title')}</h3>
                        <div className="space-y-12">
                            <RoadmapItem
                                icon={<Tablet className="w-12 h-12 text-purple-600"/>}
                                title={t('roadmap.items.tablet.title')}
                                description={t('roadmap.items.tablet.description')}
                                timeline="Q1 2025"
                            />
                            <RoadmapItem
                                icon={<Monitor className="w-12 h-12 text-purple-600"/>}
                                title={t('roadmap.items.desktop.title')}
                                description={t('roadmap.items.desktop.description')}
                                timeline="Q2 2025"
                            />
                            <RoadmapItem
                                icon={<Tv className="w-12 h-12 text-purple-600"/>}
                                title={t('roadmap.items.tv.title')}
                                description={t('roadmap.items.tv.description')}
                                timeline="Q3 2025"
                            />
                            <RoadmapItem
                                icon={<Glasses className="w-12 h-12 text-purple-600"/>}
                                title={t('roadmap.items.visionOS.title')}
                                description={t('roadmap.items.visionOS.description')}
                                timeline="Q4 2025"
                            />
                        </div>
                    </div>
                </section>

                {/* Download Section */}
                <section id="download-section" className="py-16 px-4 bg-white text-center">
                    <h3 className="text-3xl font-bold mb-4">{t('download.title')}</h3>
                    <p className="mb-8 text-gray-600">{t('download.subtitle')}</p>
                    <div className="flex justify-center gap-6 px-4"> {/* Changed space-x-4 to gap-6 and added px-4 */}
                        <div
                            className="bg-black text-white hover:bg-gray-900 w-44 h-16 rounded-xl cursor-pointer transition-all duration-200" // Modified width, height and added transition
                            onClick={() => window.open('https://apps.apple.com/your-app-link', '_blank')}
                        >
                            <div
                                className="flex items-center justify-center w-full h-full px-4 space-x-2"> {/* Added px-4 */}
                                <div className={'flex w-1/4 h-full items-center justify-center'}>
                                    <FaApple size={28}/> {/* Adjusted size */}
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-center leading-tight">
                                    <span className="text-xs">Download on the</span>
                                    <span className="text-lg font-semibold">App Store</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-black text-white w-44 h-16 rounded-xl cursor-not-allowed opacity-70 transition-all duration-200" // Modified width, height and added transition
                        >
                            <div
                                className="flex items-center justify-center w-full h-full px-4 space-x-2"> {/* Added px-4 */}
                                <div className={'flex w-1/4 h-full items-center justify-center'}>
                                    <FaAndroid size={28}/> {/* Adjusted size */}
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-center leading-tight">
                                    <span className="text-xs">Coming soon</span>
                                    <span className="text-lg font-semibold">Play Store</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8 px-4 text-center">
                <p>{t('footer.copyright')}</p>
            </footer>
        </div>
    )
}

function FeatureCard({icon, title, description}: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-6 text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

function CreatorFeature({icon, title, description}: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p>{description}</p>
        </div>
    )
}

function RoadmapItem({icon, title, description, timeline}: {
    icon: React.ReactNode,
    title: string,
    description: string,
    timeline: string
}) {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-grow">
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-gray-600 mb-2">{description}</p>
                <p className="text-sm font-semibold text-purple-600">{timeline}</p>
            </div>
        </div>
    )
}

function Carousel({images, currentIndex}: { images: string[], currentIndex: number }) {
    return (
        <div className="carousel">
            {images.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={''}
                    layout="fill"
                    objectFit="cover"
                    loading={'lazy'}
                    quality={75}
                    className={index === currentIndex ? 'opacity-100' : 'opacity-0'}
                />
            ))}
        </div>
    );
}
