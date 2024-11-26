import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowDown, Smartphone, ImageIcon, Zap, PenTool, DollarSign, Users, Tablet, Monitor, Tv, Glasses } from 'lucide-react'
import { AppShowcase } from '@/components/AppShowcase'

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen">
        <header className="p-4 bg-gradient-to-r from-purple-600 to-blue-600">
          <h1 className="text-2xl font-bold text-white">WallpaperWizard</h1>
        </header>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative h-[80vh] bg-gradient-to-b from-purple-600 to-blue-600 flex items-center justify-center px-4 text-center">
            <div className="z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Transform Your Screen</h2>
              <p className="text-xl text-white mb-8">Discover and set stunning wallpapers with just a tap</p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Download Now
                <ArrowDown className="ml-2" />
              </Button>

            </div>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                  src="/placeholder.svg?height=1080&width=1920"
                  alt="Collage of beautiful wallpapers"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 bg-gray-100">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose WallpaperWizard?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FeatureCard
                  icon={<Smartphone className="w-12 h-12 text-purple-600" />}
                  title="Mobile Optimized"
                  description="Perfectly sized wallpapers for your device, every time."
              />
              <FeatureCard
                  icon={<ImageIcon className="w-12 h-12 text-purple-600" />}
                  title="Vast Collection"
                  description="Thousands of high-quality wallpapers across various categories."
              />
              <FeatureCard
                  icon={<Zap className="w-12 h-12 text-purple-600" />}
                  title="Daily Updates"
                  description="Fresh wallpapers added daily to keep your screen exciting."
              />
            </div>
          </section>

          {/* App Showcase Section */}
          <section className="py-16 px-4 bg-gray-50">
            <h3 className="text-3xl font-bold text-center mb-12">See WallpaperWizard in Action</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
              <AppShowcase />
              <div className="md:w-1/2 space-y-4">
                <h4 className="text-2xl font-semibold">Intuitive Interface</h4>
                <p className="text-gray-600">Browse through our vast collection of wallpapers with ease. Our app&apos;s
                  sleek design makes finding and setting your perfect wallpaper a breeze.</p>
                <h4 className="text-2xl font-semibold">One-Tap Apply</h4>
                <p className="text-gray-600">Found a wallpaper you love? Apply it to your device with just one tap.
                  It&apos;s that simple!</p>
                <h4 className="text-2xl font-semibold">Personalized Recommendations</h4>
                <p className="text-gray-600">The more you use WallpaperWizard, the better it gets at suggesting
                  wallpapers you&apos;ll love.</p>
              </div>
            </div>
          </section>

          {/* Creator Invitation Section */}
          <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12">Join Our Creator Community</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <CreatorFeature
                    icon={<PenTool className="w-12 h-12"/>}
                    title="Showcase Your Art"
                    description="Share your unique wallpaper designs with millions of users worldwide."
                />
                <CreatorFeature
                    icon={<DollarSign className="w-12 h-12" />}
                    title="Earn Revenue"
                    description="Get paid for your creativity. Earn money every time your wallpaper is downloaded."
                />
                <CreatorFeature
                    icon={<Users className="w-12 h-12" />}
                    title="Grow Your Fanbase"
                    description="Build a following and connect with other artists in our vibrant community."
                />
              </div>
              <div className="text-center mt-12">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Become a Creator
                </Button>
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12">Our Exciting Roadmap</h3>
              <div className="space-y-12">
                <RoadmapItem
                    icon={<Tablet className="w-12 h-12 text-purple-600" />}
                    title="Tablet Version"
                    description="Optimized for larger screens, bringing your favorite wallpapers to your tablet."
                    timeline="Q3 2024"
                />
                <RoadmapItem
                    icon={<Monitor className="w-12 h-12 text-purple-600" />}
                    title="Desktop Version"
                    description="WallpaperWizard for your computer, synced with your mobile experience."
                    timeline="Q4 2024"
                />
                <RoadmapItem
                    icon={<Tv className="w-12 h-12 text-purple-600" />}
                    title="Smart TV App"
                    description="Transform your living room with stunning wallpapers on your smart TV."
                    timeline="Q2 2025"
                />
                <RoadmapItem
                    icon={<Glasses className="w-12 h-12 text-purple-600" />}
                    title="VisionOS Version"
                    description="Step into the future with WallpaperWizard for Apple's VisionOS."
                    timeline="Q4 2025"
                />
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section className="py-16 px-4 bg-white text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Screen?</h3>
            <p className="mb-8 text-gray-600">Download WallpaperWizard now and give your device a fresh look!</p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                <Image src="/placeholder.svg?height=40&width=120" alt="Download on the App Store" width={120} height={40} />
              </Button>
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                <Image src="/placeholder.svg?height=40&width=135" alt="Get it on Google Play" width={135} height={40} />
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-8 px-4 text-center">
          <p>&copy; 2024 WallpaperWizard. All rights reserved.</p>
        </footer>
      </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
  )
}

function CreatorFeature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
      <div className="text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p>{description}</p>
      </div>
  )
}

function RoadmapItem({ icon, title, description, timeline }: { icon: React.ReactNode, title: string, description: string, timeline: string }) {
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

