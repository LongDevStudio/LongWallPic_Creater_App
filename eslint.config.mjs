import { dirname } from 'path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.config({
        ignorePatterns: ['.next/'],
        extends: [
            'next/core-web-vitals',
            'next/typescript',
            'next',
            'prettier',
        ],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@next/next/no-img-element': 'off',
            'react-hooks/exhaustive-deps': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'react/no-unescaped-entities': 'off',
        },
    }),
]

export default eslintConfig
