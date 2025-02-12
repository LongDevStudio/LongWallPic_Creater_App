'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowDown, DollarSign, PenTool, Users } from 'lucide-react'
import { AppShowcase } from '@/components/AppShowcase'
import { Header } from '@/components/Header'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { FaAndroid, FaApple } from 'react-icons/fa6'
import { TypewriterText } from '@/components/TypewriterText'
import { RoadmapCarousel } from '@/components/RoadmapCarousel'
import { FloatingFeedbackButton } from '@/components/FloatingFeedbackButton'

type TranslationFunction = ReturnType<typeof useTranslations>

export default function Home() {
    const t = useTranslations()
    const [backgroundImages, setBackgroundImages] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const month = new Date().getMonth()
        const seasonImages = [
            '/images/spring.jpg',
            '/images/summer.jpg',
            '/images/fall.jpg',
            '/images/winter.jpg',
        ]
        const currentSeasonIndex = Math.floor(month / 3)
        const images = [seasonImages[currentSeasonIndex], ...seasonImages]
        setBackgroundImages(images)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                prevIndex => (prevIndex + 1) % backgroundImages.length
            )
        }, 3000)

        return () => clearInterval(interval)
    }, [backgroundImages])

    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='grow'>
                <FloatingFeedbackButton />

                {/* Hero Section */}
                <section className='relative flex h-[85vh] items-center justify-center bg-linear-to-b px-4 text-center'>
                    <div className='z-10'>
                        <h2 className='mb-4 text-4xl font-bold text-slate-950 md:text-6xl dark:text-slate-50'>
                            {t('hero.title')}
                        </h2>
                        <TypewriterText
                            text={t('hero.subtitle')}
                            className='text-xl text-slate-950 dark:text-slate-50'
                        />
                        <Button
                            size='lg'
                            className='mt-8 bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
                            onClick={() =>
                                document
                                    .getElementById('download-section')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                        >
                            {t('hero.downloadButton')}
                            <ArrowDown className='ml-2' />
                        </Button>
                    </div>
                    <div className='absolute inset-0 overflow-hidden'>
                        <Carousel
                            images={backgroundImages}
                            currentIndex={currentIndex}
                        />
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
                <section className='bg-slate-50 px-4 py-16'>
                    <h3 className='mb-12 text-center text-3xl font-bold text-slate-950'>
                        {t('showcase.title')}
                    </h3>
                    <div className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 md:flex-row'>
                        <AppShowcase />
                        <div className='space-y-4 md:w-1/2'>
                            <h4 className='text-2xl font-semibold text-slate-950'>
                                {t('showcase.interface.title')}
                            </h4>
                            <p className='text-slate-950'>
                                {t('showcase.interface.description')}
                            </p>
                            <h4 className='text-2xl font-semibold text-slate-950'>
                                {t('showcase.oneTab.title')}
                            </h4>
                            <p className='text-slate-950'>
                                {t('showcase.oneTab.description')}
                            </p>
                            <h4 className='text-2xl font-semibold text-slate-950'>
                                {t('showcase.recommendations.title')}
                            </h4>
                            <p className='text-slate-950'>
                                {t('showcase.recommendations.description')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Roadmap Section */}
                <section className='bg-slate-50 px-4 py-16'>
                    <div className='mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:gap-16'>
                        <div className='flex-1'>
                            <RoadmapCarousel />
                        </div>
                        <div className='flex flex-col justify-start lg:sticky lg:top-24 lg:self-start'>
                            <h3 className='mb-4 text-3xl font-bold text-slate-950 [text-orientation:upright] [writing-mode:vertical-rl]'>
                                {t('roadmap.title')}
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Creator Invitation Section */}
                <section className='bg-linear-to-r from-amber-50 to-cyan-50 px-4 py-16 text-white dark:from-indigo-900 dark:to-fuchsia-900'>
                    <div className='mx-auto max-w-5xl'>
                        <h3 className='mb-12 text-center text-3xl font-bold text-slate-950 dark:text-slate-50'>
                            {t('creator.title')}
                        </h3>
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                            <CreatorFeature
                                icon={<PenTool className='h-12 w-12' />}
                                title={t('creator.features.showcase.title')}
                                description={t(
                                    'creator.features.showcase.description'
                                )}
                            />
                            <CreatorFeature
                                icon={<DollarSign className='h-12 w-12' />}
                                title={t('creator.features.earn.title')}
                                description={t(
                                    'creator.features.earn.description'
                                )}
                            />
                            <CreatorFeature
                                icon={<Users className='h-12 w-12' />}
                                title={t('creator.features.grow.title')}
                                description={t(
                                    'creator.features.grow.description'
                                )}
                            />
                        </div>
                        <div className='mt-12 text-center'>
                            <Button
                                size='lg'
                                radius={'lg'}
                                className='bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
                            >
                                {t('creator.button')}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Download Section */}
                <DownloadSection t={t} />
            </main>

            <footer className='bg-slate-50 px-4 py-8 text-center text-slate-950'>
                <p>{t('footer.copyright')}</p>
            </footer>
        </div>
    )
}

function CreatorFeature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className='text-center'>
            <div className='mb-4 flex justify-center text-slate-950 dark:text-slate-50'>
                {icon}
            </div>
            <h4 className='mb-2 text-xl font-semibold text-slate-950 dark:text-slate-50'>
                {title}
            </h4>
            <p className={'text-slate-950 dark:text-slate-50'}>{description}</p>
        </div>
    )
}

function DownloadSection({ t }: { t: TranslationFunction }) {
    const [showTooltip, setShowTooltip] = useState(false)
    let tooltipTimer: NodeJS.Timeout | null = null

    const handleMouseEnter = () => {
        if (tooltipTimer) clearTimeout(tooltipTimer)
        setShowTooltip(true)
    }

    const handleMouseLeave = () => {
        if (tooltipTimer) clearTimeout(tooltipTimer)
        tooltipTimer = setTimeout(() => {
            setShowTooltip(false)
        }, 5 * 1000)
    }

    return (
        <section
            id='download-section'
            className='bg-white px-4 py-16 text-center'
        >
            <h3 className='mb-4 text-3xl font-bold text-slate-950'>
                {t('download.title')}
            </h3>
            <p className='mb-8 text-slate-950'>{t('download.subtitle')}</p>
            <div className='flex flex-col items-center'>
                <div className='mb-4 flex justify-center gap-6 px-4'>
                    <div
                        className='h-16 w-44 cursor-pointer rounded-xl bg-[#0066CC] text-white transition-all duration-200 hover:bg-[#0055AA]'
                        onClick={() =>
                            window.open(
                                'https://testflight.apple.com/your-testflight-link',
                                '_blank'
                            )
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className='flex h-full w-full items-center justify-center space-x-2 px-4'>
                            <div
                                className={
                                    'flex h-full w-1/4 items-center justify-center rounded-lg'
                                }
                            >
                                <FaApple size={28} />
                            </div>
                            <div className='flex flex-1 flex-col items-start justify-center leading-tight'>
                                <span className='text-xs'>Now available</span>
                                <span className='text-lg font-semibold'>
                                    TestFlight
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='h-16 w-44 cursor-not-allowed rounded-xl bg-black text-white opacity-70 transition-all duration-200'>
                        <div className='flex h-full w-full items-center justify-center space-x-2 px-4'>
                            <div
                                className={
                                    'flex h-full w-1/4 items-center justify-center rounded-lg'
                                }
                            >
                                <FaApple size={28} />
                            </div>
                            <div className='flex flex-1 flex-col items-start justify-center leading-tight'>
                                <span className='text-xs'>Coming soon</span>
                                <span className='text-lg font-semibold'>
                                    App Store
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='h-16 w-44 cursor-not-allowed rounded-xl bg-black text-white opacity-70 transition-all duration-200'>
                        <div className='flex h-full w-full items-center justify-center space-x-2 px-4'>
                            <div
                                className={
                                    'flex h-full w-1/4 items-center justify-center rounded-lg'
                                }
                            >
                                <FaAndroid size={28} />
                            </div>
                            <div className='flex flex-1 flex-col items-start justify-center leading-tight'>
                                <span className='text-xs'>Coming soon</span>
                                <span className='text-lg font-semibold'>
                                    Play Store
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${showTooltip ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out`}
                >
                    {t('download.testflight.tooltip')}
                </div>
            </div>
        </section>
    )
}

function Carousel({
    images,
    currentIndex,
}: {
    images: string[]
    currentIndex: number
}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            className='carousel relative h-full w-full'
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
                    sizes='100vw'
                    style={{
                        objectFit: 'cover',
                    }}
                />
            ))}
            {/* 毛玻璃效果遮罩层 */}
            <div
                className='absolute inset-0 bg-slate-50/60 blur-md transition-opacity dark:bg-slate-950/60'
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maskImage: isHovering
                        ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100%, black 100%)`
                        : undefined,
                    WebkitMaskImage: isHovering
                        ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100%, black 100%)`
                        : undefined,
                }}
            />
        </div>
    )
}
