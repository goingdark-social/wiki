#!/bin/bash

# PR Validation Test Script
# This script performs additional validation tests for the Going Dark Wiki

set -e

echo "🧪 Running PR Validation Tests..."
echo ""

# Test 1: Verify Hugo can build the site
echo "Test 1: Hugo Development Build"
if PATH="$PWD/node_modules/.bin:$PATH" hugo > /dev/null 2>&1; then
    echo "✅ PASS: Hugo development build successful"
else
    echo "❌ FAIL: Hugo development build failed"
    exit 1
fi

# Test 2: Verify production build works
echo "Test 2: Hugo Production Build"
rm -rf public
if PATH="$PWD/node_modules/.bin:$PATH" HUGO_ENVIRONMENT=production hugo --minify > /dev/null 2>&1; then
    echo "✅ PASS: Hugo production build successful"
else
    echo "❌ FAIL: Hugo production build failed"
    exit 1
fi

# Test 3: Verify search index generation
echo "Test 3: Search Index Generation"
if npx pagefind --site "public" > /dev/null 2>&1; then
    echo "✅ PASS: Search index generation successful"
else
    echo "❌ FAIL: Search index generation failed"
    exit 1
fi

# Test 4: Verify essential files exist
echo "Test 4: Essential Files Check"
MISSING_FILES=()

if [ ! -f "public/index.html" ]; then
    MISSING_FILES+=("public/index.html")
fi

if [ ! -d "public/docs" ]; then
    MISSING_FILES+=("public/docs/")
fi

if [ ! -f "public/docs/index.html" ]; then
    MISSING_FILES+=("public/docs/index.html")
fi

if [ ! -d "public/pagefind" ]; then
    MISSING_FILES+=("public/pagefind/")
fi

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "✅ PASS: All essential files exist"
else
    echo "❌ FAIL: Missing files: ${MISSING_FILES[*]}"
    exit 1
fi

# Test 5: Verify content quality
echo "Test 5: Content Quality Check"
CONTENT_ISSUES=()

if ! grep -q "goingdark.social" public/index.html; then
    CONTENT_ISSUES+=("Homepage missing goingdark.social reference")
fi

if ! grep -q "Read the docs" public/index.html; then
    CONTENT_ISSUES+=("Homepage missing 'Read the docs' button")
fi

if ! grep -q "nav" public/docs/index.html; then
    CONTENT_ISSUES+=("Docs page missing navigation")
fi

if [ ${#CONTENT_ISSUES[@]} -eq 0 ]; then
    echo "✅ PASS: Content quality checks passed"
else
    echo "❌ FAIL: Content issues: ${CONTENT_ISSUES[*]}"
    exit 1
fi

# Test 6: Verify server can start (quick test)
echo "Test 6: Server Startup Test"
if timeout 3s hugo server --renderToMemory --bind 0.0.0.0 --port 1313 > /dev/null 2>&1 || [ $? -eq 124 ]; then
    echo "✅ PASS: Server startup test successful"
else
    echo "❌ FAIL: Server startup test failed"
    exit 1
fi

echo ""
echo "🎉 All PR validation tests passed!"
echo ""
echo "Summary:"
echo "- Hugo development build: ✅"
echo "- Hugo production build: ✅"
echo "- Search index generation: ✅"
echo "- Essential files check: ✅"
echo "- Content quality check: ✅"
echo "- Server startup test: ✅"
echo ""
echo "The site is ready for review! 🚀"