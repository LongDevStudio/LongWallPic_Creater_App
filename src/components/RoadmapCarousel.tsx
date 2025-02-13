'use client'

import React, { useState } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Compass,
    Glasses,
    Monitor,
    Rss,
    ScanFace,
    Smartphone,
    Tablet,
    Target,
    User,
    Wallet,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type work_status = 'todo' | 'working' | 'done' | 'planning'

type MileStoneStep = {
    title: string
    description: string
    milestone: number
    due_date?: string
    icon?: React.ReactNode
    remark?: string
    work_status?: work_status
}

type RoadmapItem = {
    title: string
    description: string
    icon?: React.ReactNode
    milestone: number
    step?: string
    work_status?: work_status
    milestoneStep?: MileStoneStep[]
}

type RoadmapCategory = {
    title: string
    subtitle?: string
    items: RoadmapItem[]
}

export function RoadmapCarousel() {
    const t = useTranslations('roadmap')
    const [currentCategory, setCurrentCategory] = useState(0)

    const categories: RoadmapCategory[] = [
        {
            title: t('categories.clients'),
            items: [
                {
                    title: t('clients.items.tablet.title'),
                    description: t('clients.items.tablet.description'),
                    icon: <Smartphone className='h-12 w-12 text-purple-600' />,
                    milestone: 1,
                    milestoneStep: [
                        {
                            title: t('clients.items.mobile.title'),
                            description: t('clients.items.mobile.description'),
                            milestone: 1,
                            work_status: 'working',
                        },
                        {
                            title: t('clients.items.tablet.title'),
                            description: t('clients.items.tablet.description'),
                            milestone: 2,
                        },
                    ],
                },
                {
                    title: t('clients.items.next-step.title'),
                    description: t('clients.items.next-step.description'),
                    icon: <Compass className='h-12 w-12 text-purple-600' />,
                    step: 'Milestone 2025 Q3',
                    milestone: 2,
                    milestoneStep: [
                        {
                            title: t('clients.items.browser.title'),
                            description: t('clients.items.browser.description'),
                            milestone: 1,
                        },
                    ],
                },
                {
                    title: t('clients.items.desktop.title'),
                    description: t('clients.items.desktop.description'),
                    icon: <Monitor className='h-12 w-12 text-purple-600' />,
                    milestone: 3,
                    milestoneStep: [],
                },
                {
                    title: t('clients.items.in-future.title'),
                    description: t('clients.items.tv.description'),
                    icon: <Target className='h-12 w-12 text-purple-600' />,
                    // step: 'Milestone 2025 Q3',
                    milestone: 4,
                    milestoneStep: [],
                },
            ],
        },
        {
            title: t('categories.client-feature'),
            items: [
                {
                    title: t('client-feature.items.UI/UX.title'),
                    description: t('client-feature.items.UI/UX.description'),
                    icon: <ScanFace className='h-12 w-12 text-purple-600' />,
                    milestone: 1,
                    milestoneStep: [
                        {
                            title: t('client-feature.items.darkMode.title'),
                            description: t(
                                'client-feature.items.darkMode.description'
                            ),
                            milestone: 1,
                            work_status: 'working',
                        },
                        {
                            title: t(
                                'client-feature.items.multiLanguage.title'
                            ),
                            description: t(
                                'client-feature.items.multiLanguage.description'
                            ),
                            milestone: 2,
                        },
                    ],
                },
                {
                    title: t('client-feature.items.browser.title'),
                    description: t('client-feature.items.browser.description'),
                    icon: <Glasses className='h-12 w-12 text-purple-600' />,
                    milestone: 2,
                    milestoneStep: [],
                },
                {
                    title: t('client-feature.items.composer.title'),
                    description: t('client-feature.items.composer.description'),
                    icon: <Tablet className='h-12 w-12 text-purple-600' />,
                    milestone: 3,
                    milestoneStep: [],
                },
                {
                    title: t('client-feature.items.not-only-wp.title'),
                    description: t(
                        'client-feature.items.not-only-wp.description'
                    ),
                    icon: <Target className='h-12 w-12 text-purple-600' />,
                    milestone: 4,
                    milestoneStep: [],
                },
            ],
        },
        {
            title: t('categories.creator'),
            items: [
                {
                    title: t('creator.items.channel.title'),
                    description: t('creator.items.channel.description'),
                    icon: <Rss className='h-12 w-12 text-purple-600' />,
                    // step: 'Milestone 2025 Q2',
                    milestone: 1,
                    milestoneStep: [],
                },
                {
                    title: t('creator.items.profit.title'),
                    description: t('creator.items.profit.description'),
                    icon: <Wallet className='h-12 w-12 text-purple-600' />,
                    // step: 'Milestone 2025 Q3',
                    milestone: 2,
                    milestoneStep: [],
                },
                {
                    title: t('creator.items.profile.title'),
                    description: t('creator.items.profile.description'),
                    icon: <User className='h-12 w-12 text-purple-600' />,
                    // step: 'Milestone 2025 Q3',
                    milestone: 3,
                    milestoneStep: [],
                },
            ],
        },
        // {
        //     title: t('categories.community'),
        //     items: [
        //         {
        //             title: t('community.items.creatorProfiles.title'),
        //             description: t('community.items.creatorProfiles.description'),
        //             // icon: <UserCircle className="w-12 h-12 text-purple-600"/>,
        //             step: 'Milestone 2025 Q2',
        //             milestone: 1,
        //             milestoneStep: []
        //         },
        //         // {
        //         //     title: t('community.items.communityEvents.title'),
        //         //     description: t('community.items.communityEvents.description'),
        //         //     icon: <Calendar className="w-12 h-12 text-purple-600"/>,
        //         //     step: 'Milestone 2025 Q3',
        //         //     milestone: 2
        //         // },
        //         // {
        //         //     title: t('community.items.mentorshipProgram.title'),
        //         //     description: t('community.items.mentorshipProgram.description'),
        //         //     icon: <GraduationCap className="w-12 h-12 text-purple-600"/>,
        //         //     step: 'Milestone 2025 Q4',
        //         //     milestone: 3
        //         // },
        //         // {
        //         //     title: t('community.items.challengesAndContests.title'),
        //         //     description: t('community.items.challengesAndContests.description'),
        //         //     icon: <Trophy className="w-12 h-12 text-purple-600"/>,
        //         //     step: 'Milestone 2026 Q1',
        //         //     milestone: 4
        //         // },
        //     ],
        // },
    ]

    const nextCategory = () => {
        setCurrentCategory(prev => (prev + 1) % categories.length)
    }

    const prevCategory = () => {
        setCurrentCategory(
            prev => (prev - 1 + categories.length) % categories.length
        )
    }

    const currentItems = categories[currentCategory].items.sort(
        (a, b) => a.milestone - b.milestone
    )

    return (
        <div className='relative'>
            {/* Category Navigation */}
            <div className='mb-12 flex items-center justify-between'>
                <Button
                    variant={'withoutBg'}
                    onClick={prevCategory}
                    disabled={currentCategory === 0}
                    size='icon'
                >
                    <ChevronLeft className='h-4 w-4 text-slate-950' />
                </Button>
                <div className='flex items-center gap-4'>
                    <h4 className='text-2xl font-semibold text-slate-950'>
                        {categories[currentCategory].title}
                    </h4>
                    <span className='text-sm text-slate-950'>
                        {currentCategory + 1} / {categories.length}
                    </span>
                </div>
                <Button
                    variant={'withoutBg'}
                    onClick={nextCategory}
                    disabled={currentCategory === categories.length - 1}
                    size='icon'
                >
                    <ChevronRight className='h-4 w-4 text-slate-950' />
                </Button>
            </div>

            {/* Roadmap Flow Layout */}
            <div className='relative'>
                {/* Connection Lines */}
                <svg
                    className='pointer-events-none absolute inset-0 h-full w-full'
                    style={{ zIndex: 0 }}
                >
                    {currentItems.map((_, index) => {
                        if (index === currentItems.length - 1) return null
                        const isEven = index % 2 === 0
                        return (
                            <path
                                key={index}
                                d={
                                    isEven
                                        ? `M ${280 + index * 240},180 C ${340 + index * 240},180 ${380 + index * 240},280 ${440 + index * 240},280`
                                        : `M ${280 + index * 240},280 C ${340 + index * 240},280 ${380 + index * 240},180 ${440 + index * 240},180`
                                }
                                stroke='rgba(100,100,100,0.2)'
                                strokeWidth='2'
                                fill='none'
                            />
                        )
                    })}
                </svg>

                {/* Cards */}
                <div className='relative flex flex-nowrap gap-8 overflow-x-auto px-4 pt-4 pb-8'>
                    {currentItems.map((item, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div
                                key={index}
                                className={`shrink-0 ${isEven ? 'mt-0' : 'mt-24'}`}
                                style={{
                                    transform: `translateX(${index * 20}px)`,
                                }}
                            >
                                <Card className='w-[240px] bg-white p-6 shadow-lg'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex items-start justify-between'>
                                            <div className='shrink-0'>
                                                {item.icon}
                                            </div>
                                            <span className='text-sm font-medium text-purple-600'>
                                                Milestone {item.milestone}
                                            </span>
                                        </div>
                                        {item.milestoneStep &&
                                        item.milestoneStep.length > 0 ? (
                                            item.milestoneStep.map(
                                                (ms, index) => {
                                                    // sort by milestone
                                                    return (
                                                        <div key={index}>
                                                            <h4 className='mb-2 text-lg font-semibold text-slate-950'>
                                                                {ms.title}
                                                            </h4>
                                                            <p className='mb-4 text-sm text-slate-950'>
                                                                {ms.description}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            )
                                        ) : (
                                            <div>
                                                <h4 className='mb-2 text-lg font-semibold text-slate-950'>
                                                    {item.title}
                                                </h4>
                                                <p className='mb-4 text-sm text-slate-950'>
                                                    {item.description}
                                                </p>
                                                <p className='text-xs font-medium text-slate-950'>
                                                    {item.step}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
