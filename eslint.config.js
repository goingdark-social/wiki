import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintReact from '@eslint-react/eslint-plugin';
import * as astroPlugin from 'eslint-plugin-astro';
import * as mdxPlugin from 'eslint-plugin-mdx';
import tailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // ========================================
  // Global Settings
  // ========================================
  {
    settings: {
      react: {
        version: '19',
      },
      tailwindcss: {
        callees: ['clsx', 'cn'],
        config: path.join(__dirname, './tailwind.config.mjs'),
        whitelist: [
          '^lucide-.*',
          // Allow custom colors with any variant prefix (hover:, focus:, etc.)
          '.*(bg|text|border|ring)-(surface|primary|secondary|text|border|background).*'
        ],
      },
    },
  },

  // ========================================
  // Base Configuration
  // ========================================
  js.configs.recommended,
  
  // ========================================
  // TypeScript, React, JSX (JS/TS/TSX files)
  // ========================================
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': jsxA11y,
      'react': react,
      'react-hooks': reactHooks,
      '@eslint-react': eslintReact,
      'tailwindcss': tailwindcss,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules, // Use STRICT mode for maximum a11y enforcement
      ...reactHooks.configs.recommended.rules,
      
      // ========================================
      // TypeScript Rules
      // ========================================
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // ========================================
      // Accessibility Rules (WCAG 2.1 Level AA)
      // ========================================
      'jsx-a11y/label-has-associated-control': ['error', { 
        required: { some: ['nesting', 'id'] },
        assert: 'either',
      }],
      
      // Ensure anchors have content and valid hrefs
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': ['error', {
        components: ['Link'],
        aspects: ['invalidHref', 'preferButton'],
      }],
      
      // Interactive elements must be accessible
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      
      // Heading hierarchy enforcement
      'jsx-a11y/heading-has-content': 'error',
      
      // Images must have alt text
      'jsx-a11y/alt-text': ['error', {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
      }],
      
      // ARIA rules for better screen reader support
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      
      // Autofocus can be disorienting
      'jsx-a11y/no-autofocus': ['warn', { ignoreNonDOM: true }],
      
      // Media elements must have captions
      'jsx-a11y/media-has-caption': 'error',
      
      // Mouse events must have keyboard equivalents
      'jsx-a11y/mouse-events-have-key-events': 'error',
      
      // Tab index should not be positive (breaks keyboard navigation order)
      'jsx-a11y/tabindex-no-positive': 'error',
      
      // ========================================
      // React Hooks Rules (Prevents UX Bugs)
      // ========================================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // ========================================
      // React Best Practices (UX-Focused)
      // ========================================
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      
      'react/jsx-key': ['error', {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
      }],
      
      'react/no-danger': 'warn',
      'react/no-danger-with-children': 'error',
      
      'react/button-has-type': ['error', {
        button: true,
        submit: true,
        reset: true,
      }],
      
      'react/no-unused-prop-types': 'warn',
      'react/no-unused-state': 'warn',
      'react/self-closing-comp': 'warn',
      'react/no-unknown-property': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react/display-name': 'warn',
      
      'react/jsx-no-bind': ['warn', {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      }],
      
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
      
      'react/jsx-no-target-blank': ['error', {
        enforceDynamicLinks: 'always',
        links: true,
        forms: true,
      }],
      
      'react/no-unsafe': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-deprecated': 'warn',
      
      // ========================================
      // Modern React Patterns (@eslint-react)
      // ========================================
      '@eslint-react/no-array-index-key': 'warn',
      '@eslint-react/no-useless-fragment': 'warn',
      
      // ========================================
      // Tailwind CSS Rules (Design System Enforcement)
      // ========================================
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  
  // ========================================
  // Astro Components (.astro files)
  // ========================================
  ...astroPlugin.configs['flat/recommended'],
  ...astroPlugin.configs['flat/jsx-a11y-strict'], // Apply strict a11y to Astro components
  {
    files: ['**/*.astro'],
    plugins: {
      tailwindcss: tailwindcss,
    },
    rules: {
      // Tailwind enforcement in Astro
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  // ========================================
  // MDX Files (.mdx files)
  // ========================================
  {
    files: ['**/*.mdx'],
    ...mdxPlugin.flat,
    plugins: {
      'jsx-a11y': jsxA11y,
      'react': react,
      'mdx': mdxPlugin,
    },
    rules: {
      // Apply a11y rules to JSX inside MDX
      ...jsxA11y.configs.strict.rules,
      
      // MDX-specific overrides
      'react/jsx-no-undef': 'off', // MDX components can be imported implicitly
      'react/no-unescaped-entities': 'off', // Allow quotes in prose
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Key a11y rules for MDX content
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/heading-has-content': 'error',
    },
  },
  
  // ========================================
  // Ignore Patterns
  // ========================================
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      '*.config.ts',
      '*.config.js',
      '*.config.mjs',
    ],
  },
];
