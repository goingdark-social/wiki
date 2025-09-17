# PR Validation

This repository includes a comprehensive PR validation workflow that runs automatically on all pull requests to ensure changes work correctly before merging.

## What Gets Validated

The PR validation workflow performs the following checks:

### Build Tests
- **Hugo Development Build**: Ensures the site builds successfully in development mode
- **Hugo Production Build**: Verifies the site builds and minifies correctly for production
- **Search Index Generation**: Tests that Pagefind can successfully generate the search index
- **Server Startup Test**: Confirms Hugo's development server can start without errors

### Site Structure Tests
- **Essential Files Check**: Verifies that critical files (index.html, docs/, etc.) are generated
- **Navigation Check**: Ensures navigation elements are present in documentation pages
- **Content Quality Check**: Validates that key content (branding, CTAs) appears correctly

### Code Quality Tests
- **Vale Linting**: Runs writing style and spelling checks on all markdown content (handled by separate workflow)

## Running Tests Locally

### Prerequisites
Before running tests, ensure you have the required dependencies:

```bash
# Download Hugo extended
curl -L "https://github.com/gohugoio/hugo/releases/download/v0.150.0/hugo_extended_0.150.0_linux-amd64.tar.gz" | tar -xz hugo && chmod +x hugo

# Install Node.js dependencies
npm install
```

### Running the Full Test Suite

```bash
# Run the comprehensive test script
./scripts/test-pr.sh
```

### Running Individual Tests

```bash
# Test development build
PATH="$PWD/node_modules/.bin:$PATH" hugo

# Test production build
PATH="$PWD/node_modules/.bin:$PATH" HUGO_ENVIRONMENT=production hugo --minify

# Generate search index
npx pagefind --site "public"

# Test server startup
timeout 3s hugo server --renderToMemory --bind 0.0.0.0 --port 1313

# Run linting (separate workflow)
# Vale linting is handled by the dedicated Vale workflow
```

## Workflow Files

- `.github/workflows/pr-validation.yml` - Main PR validation workflow
- `.github/workflows/vale.yml` - Dedicated linting workflow (runs on all pushes/PRs)
- `.github/workflows/publish.yaml` - Production deployment workflow (runs on main branch)

## Test Script

The `scripts/test-pr.sh` script provides a comprehensive local testing experience that mirrors the CI validation:

1. **Hugo Development Build Test**
2. **Hugo Production Build Test** 
3. **Search Index Generation Test**
4. **Essential Files Check**
5. **Content Quality Check**
6. **Server Startup Test**

All tests must pass for a successful validation.

## Expected Behavior

- **PR Creation**: Triggers the PR validation workflow automatically
- **Push to PR**: Re-runs validation on new commits
- **Merge to Main**: Triggers the production deployment workflow
- **Linting**: Vale runs on all markdown changes and provides feedback

## Troubleshooting

### Common Issues

**Hugo build fails**:
- Ensure Hugo extended v0.150.0+ is installed
- Check that Node.js dependencies are installed (`npm install`)
- Verify go.mod is present for Hugo modules

**Search index generation fails**:
- Ensure the site was built first (`hugo` or `hugo --minify`)
- Check that the `public/` directory exists and contains HTML files

**Linting failures**:
- Run `vale sync` to download required packages
- Check `.vale.ini` configuration
- Review Vale output for specific errors

**Server startup fails**:
- Verify Hugo binary is executable
- Check for port conflicts (default: 1313)
- Review Hugo configuration files

For more help, see the [README.md](../README.md) or open a GitHub Discussion.