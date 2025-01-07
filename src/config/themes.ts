import { Sun, Moon, Monitor, Wine, LeafyGreen } from 'lucide-react'

export interface ThemeConfig {
  name: string;
  icon: typeof Sun;
  requiresAuth: boolean;
  visible: boolean;
  translationKey: string;
}

export const themes: Record<string, ThemeConfig> = {
  light: {
    name: 'light',
    icon: Sun,
    requiresAuth: false,
    visible: true,
    translationKey: 'theme.light'
  },
  dark: {
    name: 'dark',
    icon: Moon,
    requiresAuth: false,
    visible: true,
    translationKey: 'theme.dark'
  },
  system: {
    name: 'system',
    icon: Monitor,
    requiresAuth: true,
    visible: true,
    translationKey: 'theme.system'
  },
  wine: {
    name: 'wine',
    icon: Wine,
    requiresAuth: true,
    visible: true,
    translationKey: 'theme.wine'
  },
  leafy: {
    name: 'leafy',
    icon: LeafyGreen,
    requiresAuth: true,
    visible: false,
    translationKey: 'theme.leafy'
  }
}
