import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// AGENTS.md §8: o Motion só entrega à GPU opacity, filter, clipPath e transform inteiro; x, y, scale e
// rotate soltos rodam no JS a cada quadro e travam celular fraco.
const animacaoNaGpu =
  "Anime 'transform' inteiro (ex.: transform: 'translateY(16px) rotate(8deg)'), não x/y/scale/rotate soltos (AGENTS.md §8)."

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
        {
          selector:
            'JSXAttribute[name.name=/^(initial|animate|exit|whileInView|whileHover|whileTap)$/] Property[key.name=/^(x|y|scale|scaleX|scaleY|rotate)$/]',
          message: animacaoNaGpu,
        },
      ],
    },
  },
  {
    files: ['**/animacoes.constants.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'Property[key.name=/^(x|y|scale|scaleX|scaleY|rotate)$/]', message: animacaoNaGpu },
      ],
    },
  },
)
