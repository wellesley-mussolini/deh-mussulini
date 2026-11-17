import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      // AGENTS.md §2: camelCase para toda variável e constante; PascalCase só para componente e tipo.
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'forbid' },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
      'no-var': 'error',
      // AGENTS.md §1.4: só `const`, inclusive em testes.
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclaration[kind!='const']",
          message: 'Use só const (AGENTS.md §1.4): valor que muda vira nova constante, função ou reduce.',
        },
      ],
    },
  },
)
