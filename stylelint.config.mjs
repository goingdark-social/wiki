/**
 * Stylelint Configuration
 * Enforces design token usage to prevent UI inconsistencies
 */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // Enforce CSS custom properties for colors (no hardcoded hex)
    'color-no-hex': true,
    
    // Enforce CSS custom properties for border-radius (no hardcoded values)
    'declaration-property-value-allowed-list': {
      'border-radius': ['/var\\(--radius/'],
      'border-top-left-radius': ['/var\\(--radius/'],
      'border-top-right-radius': ['/var\\(--radius/'],
      'border-bottom-left-radius': ['/var\\(--radius/'],
      'border-bottom-right-radius': ['/var\\(--radius/'],
    },
    
    // Enforce spacing tokens for margin/padding
    'declaration-property-value-disallowed-list': {
      'margin': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'margin-top': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'margin-right': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'margin-bottom': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'margin-left': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'padding': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'padding-top': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'padding-right': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'padding-bottom': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
      'padding-left': ['/^[0-9]+px$/', '/^[0-9]+rem$/'],
    },
    
    // Require custom properties to use --space-* or --radius-* prefix
    'custom-property-pattern': [
      '^(--space-[0-9]+|--radius-[a-z]+|--color-[a-z-]+|--font-[a-z-]+|--shadow-[a-z-]+|--transition-[a-z-]+|-.+)',
      {
        message: 'Custom properties must use design token naming (--space-*, --radius-*, --color-*, etc.)'
      }
    ],
    
    // Disable arbitrary values in Tailwind classes
    'selector-class-pattern': [
      '^(?!.*\\[.*\\]).*$',
      {
        message: 'Tailwind arbitrary values (e.g., w-[350px]) are not allowed. Use design tokens.'
      }
    ],
  },
  ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
};
