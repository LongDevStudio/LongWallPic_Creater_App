'use client'

import Image from "next/image"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    Glasses,
    Moon,
    Sun,
    Wine,
    LeafyGreen
} from 'lucide-react'
import {AppShowcase} from '@/components/AppShowcase'
import {Header} from '@/components/Header'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react';
import {FaAndroid, FaApple} from 'react-icons/fa6'
import { useTheme } from "next-themes"
import {TypewriterText} from '@/components/TypewriterText'
import {RoadmapCarousel} from "@/components/RoadmapCarousel";
import {FloatingFeedbackButton} from '@/components/FloatingFeedbackButton'

export default function Home() {
    const t = useTranslations()
    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { setTheme, theme } = useTheme()

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
            <Header />
            <main className="flex-grow">
                <FloatingFeedbackButton />
                {/* for test theme */}
                {/*<div className="bg-background text-foreground">*/}
                {/*    <div className="bg-card text-card-foreground">*/}
                {/*        卡片内容*/}
                {/*    </div>*/}
                {/*    <button className="bg-primary text-primary-foreground">*/}
                {/*        主要按钮*/}
                {/*    </button>*/}
                {/*    <button className="bg-secondary text-secondary-foreground">*/}
                {/*        次要按钮*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/* Hero Section */}
                <section
                    className="relative h-[80vh] bg-gradient-to-b from-primary to-secondary flex items-center justify-center px-4 text-center">
                    <div className="z-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">{t('hero.title')}</h2>
                        <TypewriterText text={t('hero.subtitle')} className="text-xl text-primary-foreground"/>
                        <Button
                            size="lg"
                            className="bg-secondary hover:bg-secondary/90 mt-8
                            text-black
                            dark:text-white"
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
                {/*<section className="py-16 px-4 bg-gray-100">*/}
                {/*    <h3 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h3>*/}
                {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">*/}
                {/*        <FeatureCard*/}
                {/*            icon={<Smartphone className="w-12 h-12 text-purple-600"/>}*/}
                {/*            title={t('features.cards.mobile.title')}*/}
                {/*            description={t('features.cards.mobile.description')}*/}
                {/*        />*/}
                {/*        <FeatureCard*/}
                {/*            icon={<ImageIcon className="w-12 h-12 text-purple-600"/>}*/}
                {/*            title={t('features.cards.collection.title')}*/}
                {/*            description={t('features.cards.collection.description')}*/}
                {/*        />*/}
                {/*        <FeatureCard*/}
                {/*            icon={<Zap className="w-12 h-12 text-purple-600"/>}*/}
                {/*            title={t('features.cards.updates.title')}*/}
                {/*            description={t('features.cards.updates.description')}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</section>*/}

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

                {/* Roadmap Section */}
                <section className="py-16 px-4 bg-gray-100">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
                        <div className="flex-1">
                            <RoadmapCarousel/>
                        </div>
                        <div className="flex flex-col justify-start lg:sticky lg:top-24 lg:self-start">
                            <h3 className="text-3xl font-bold mb-4 [writing-mode:vertical-rl] [text-orientation:upright]">{t('roadmap.title')}</h3>
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

                {/* Download Section */}
                <DownloadSection t={t} />

            </main>

            <footer className="bg-secondary text-secondary-foreground py-8 px-4 text-center">
                <p>{t('footer.copyright')}</p>
            </footer>
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

function DownloadSection({ t }: { t: any }) {
    const [showTooltip, setShowTooltip] = useState(false);
    let tooltipTimer: NodeJS.Timeout | null = null;

    const handleMouseEnter = () => {
        if (tooltipTimer) clearTimeout(tooltipTimer);
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        if (tooltipTimer) clearTimeout(tooltipTimer);
        tooltipTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 5 * 1000);
    };

    return (
        <section id="download-section" className="py-16 px-4 bg-white text-center">
            <h3 className="text-3xl font-bold mb-4">{t('download.title')}</h3>
            <p className="mb-8 text-gray-600">{t('download.subtitle')}</p>
            <div className="flex flex-col items-center">
                <div className="flex justify-center gap-6 px-4 mb-4">
                    <div
                        className="bg-[#0066CC] text-white hover:bg-[#0055AA] w-44 h-16 rounded-xl cursor-pointer transition-all duration-200"
                        onClick={() => window.open('https://testflight.apple.com/your-testflight-link', '_blank')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex items-center justify-center w-full h-full px-4 space-x-2">
                            <div className={'flex w-1/4 h-full items-center justify-center'}>
                                <FaApple size={28}/>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-center leading-tight">
                                <span className="text-xs">Now available</span>
                                <span className="text-lg font-semibold">TestFlight</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="bg-black text-white w-44 h-16 rounded-xl cursor-not-allowed opacity-70 transition-all duration-200"
                    >
                        <div className="flex items-center justify-center w-full h-full px-4 space-x-2">
                            <div className={'flex w-1/4 h-full items-center justify-center'}>
                                <FaApple size={28}/>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-center leading-tight">
                                <span className="text-xs">Coming soon</span>
                                <span className="text-lg font-semibold">App Store</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="bg-black text-white w-44 h-16 rounded-xl cursor-not-allowed opacity-70 transition-all duration-200"
                    >
                        <div className="flex items-center justify-center w-full h-full px-4 space-x-2">
                            <div className={'flex w-1/4 h-full items-center justify-center'}>
                                <FaAndroid size={28}/>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-center leading-tight">
                                <span className="text-xs">Coming soon</span>
                                <span className="text-lg font-semibold">Play Store</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${showTooltip ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'} overflow-hidden bg-gray-900 text-white text-sm rounded-md py-2 px-4 transition-all duration-200 ease-in-out`}
                >
                    {t('download.testflight.tooltip')}
                </div>
            </div>
        </section>
    )
}

function Carousel({images, currentIndex}: { images: string[], currentIndex: number }) {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            className="carousel relative w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {images.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={''}
                    loading={'lazy'}
                    quality={75}
                    className={`transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover"
                    }}
                />
            ))}
            {/* 毛玻璃效果遮罩层 */}
            <div
                className="absolute inset-0 backdrop-blur-sm bg-black/30"
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maskImage: isHovering ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100%, black 100%)` : undefined,
                    WebkitMaskImage: isHovering ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100%, black 100%)` : undefined,
                }}
            />
        </div>
    );
}
