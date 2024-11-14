// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce types for commits
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'chore', // Routine tasks
        'docs', // Documentation changes
        'style', // Code style changes
        'refactor', // Refactoring code
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Changes to the build process
        'ci', // Changes to CI configuration
        'revert', // Reverting previous commits
      ],
    ],
    // Enforce subject case to be in lower case
    'subject-case': [2, 'always', 'sentence-case'],
    // Enforce a maximum line length for commit message subject
    'header-max-length': [2, 'always', 72],
    // Enforce that a body must be present for more detailed commits
    'body-max-line-length': [2, 'always', 100],
  },
};