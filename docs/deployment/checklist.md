# Production Deployment Checklist

**Application**: Lotería Mexicana
**Version**: 0.1.0
**Last Updated**: 2026-02-06

---

## Pre-Deployment Checklist

### 1. Code Quality & Testing ✅

#### Run Full Test Suite
```bash
# Run all tests with coverage
npm test -- --coverage --watchAll=false

# Verify minimum 80% coverage
# Check output for coverage percentages
```

**Requirements**:
- [ ] All tests passing
- [ ] Code coverage ≥ 80%
- [ ] No failing tests
- [ ] No skipped critical tests

---

#### Code Linting & Style
```bash
# Run ESLint
npx eslint src/

# Auto-fix issues if any
npx eslint src/ --fix
```

**Requirements**:
- [ ] No ESLint errors
- [ ] No ESLint warnings (or documented exceptions)
- [ ] Code follows style guidelines

---

### 2. Security Audit ✅

#### Run Security Checks
```bash
# Full security check
npm run security:check

# Production dependencies only
npm audit --production

# Fix automatically fixable issues
npm audit fix
```

**Requirements**:
- [ ] Production dependencies have no vulnerabilities
- [ ] Security audit report reviewed
- [ ] All fixable issues resolved
- [ ] Non-fixable issues documented and assessed

**Expected**: 0 vulnerabilities in production dependencies

---

#### Verify No Sensitive Data
```bash
# Check for common sensitive patterns
grep -r "API_KEY" src/
grep -r "SECRET" src/
grep -r "PASSWORD" src/
grep -r "TOKEN" src/
```

**Requirements**:
- [ ] No API keys in code
- [ ] No secrets or passwords
- [ ] No sensitive configuration
- [ ] No hardcoded credentials
- [ ] .env files not committed (if using any)

---

### 3. Production Build ✅

#### Create Optimized Build
```bash
# Create production build
npm run build

# Verify build succeeded
echo $?  # Should output: 0
```

**Requirements**:
- [ ] Build completes without errors
- [ ] Build completes without warnings (or documented)
- [ ] Build folder created successfully

---

#### Verify Build Contents
```bash
# Check build directory structure
ls -lh build/
ls -lh build/static/js/
ls -lh build/static/css/

# Check bundle sizes
du -sh build/static/js/*
du -sh build/static/css/*
```

**Requirements**:
- [ ] Main bundle < 500KB (gzipped)
- [ ] CSS bundle reasonable size
- [ ] All assets present (favicon, logos, manifest)
- [ ] index.html generated correctly

---

#### Test Production Build Locally
```bash
# Install serve if not already installed
npm install -g serve

# Serve production build
serve -s build -p 3000

# Open http://localhost:3000 in browser
```

**Manual Testing Requirements**:
- [ ] Application loads correctly
- [ ] All features work as expected
- [ ] No console errors
- [ ] No 404s in network tab
- [ ] Sounds work correctly
- [ ] Language toggle works
- [ ] Game win detection works
- [ ] Responsive design works (mobile/tablet/desktop)

---

### 4. Performance Verification ✅

#### Performance Metrics
```bash
# Build and check sizes
npm run build

# Check bundle sizes
npx source-map-explorer 'build/static/js/*.js' || echo "Install with: npm install -g source-map-explorer"
```

**Requirements**:
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB (gzipped)
- [ ] No large unnecessary dependencies

**Tools to Verify**:
- Chrome DevTools Lighthouse
- WebPageTest.org
- GTmetrix

**Target Lighthouse Scores**:
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 90
- [ ] Best Practices: ≥ 90
- [ ] SEO: ≥ 90

---

### 5. Accessibility Verification ✅

#### Automated Accessibility Check
```bash
# Install axe-core if not already
npm install -g @axe-core/cli

# Run accessibility scan on built app
# (Run after serving the build)
```

**Manual Accessibility Tests**:
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen reader compatible (test with VoiceOver/NVDA)
- [ ] All interactive elements have proper ARIA labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible
- [ ] No accessibility errors in Lighthouse

---

### 6. Browser Compatibility ✅

**Test on Required Browsers**:
- [ ] Chrome (latest 3 versions)
- [ ] Firefox (latest 3 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] iOS Safari (latest version)
- [ ] Android Chrome (latest version)

**Functionality to Verify**:
- [ ] Game loads and plays
- [ ] Sounds work (Web Audio API)
- [ ] Language toggle works
- [ ] Win detection works
- [ ] Responsive layout works

---

### 7. Content & Documentation ✅

#### Verify Content
- [ ] All text is bilingual (Spanish/English)
- [ ] Game rules are accurate
- [ ] Cultural content is authentic
- [ ] No typos or grammatical errors
- [ ] Meta descriptions accurate
- [ ] Page title appropriate

#### Documentation Review
- [ ] README.md is up-to-date
- [ ] CLAUDE.md is current
- [ ] AGENTS.md reflects current practices
- [ ] All PRDs are marked complete
- [ ] SECURITY_AUDIT_REPORT.md reviewed
- [ ] This checklist is current

---

### 8. Environment Configuration ✅

#### Production Environment Setup

**Environment Variables** (if any):
```bash
# Create .env.production if needed
# Example (this app doesn't use any currently):
# REACT_APP_API_URL=https://api.production.com
```

**Requirements**:
- [ ] All required env vars set
- [ ] No development values in production env
- [ ] Secrets managed securely (not in code)
- [ ] .env files in .gitignore

**Current Status**: ✅ No environment variables needed

---

### 9. Security Headers ✅

#### Verify Security Headers Present

**Already Added to index.html**:
- [x] Content-Security-Policy (CSP)
- [x] X-Content-Type-Options: nosniff
- [x] X-Frame-Options: DENY
- [x] X-XSS-Protection: 1; mode=block
- [x] Referrer-Policy: strict-origin-when-cross-origin

**Additional Server-Level Headers** (configure on hosting provider):
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Verify Headers**:
```bash
# After deployment, check headers
curl -I https://your-domain.com

# Or use online tool: securityheaders.com
```

---

### 10. Deployment Platform Setup ✅

#### Choose Hosting Provider

**Recommended Options**:
- [ ] Netlify (easiest)
- [ ] Vercel (excellent performance)
- [ ] GitHub Pages (free)
- [ ] Cloudflare Pages (fast CDN)
- [ ] AWS S3 + CloudFront (scalable)

#### Platform Configuration

**For Netlify/Vercel**:
```bash
# Create netlify.toml or vercel.json
# Add redirects and headers
```

**For GitHub Pages**:
```bash
# Add homepage to package.json
"homepage": "https://yourusername.github.io/loteria-game"

# Deploy
npm run build
gh-pages -d build
```

**Requirements**:
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Auto-deploy from main branch set up
- [ ] Build command: `npm run build`
- [ ] Publish directory: `build`

---

### 11. SSL/TLS Certificate ✅

**Requirements**:
- [ ] HTTPS enabled (required)
- [ ] Valid SSL certificate
- [ ] HTTP redirects to HTTPS
- [ ] Certificate auto-renewal configured

**Note**: Most modern hosting providers (Netlify, Vercel, GitHub Pages) provide free SSL automatically.

---

### 12. Pre-Launch Testing ✅

#### Staging Environment
```bash
# Deploy to staging first
# Test thoroughly before production
```

**Staging Checklist**:
- [ ] Full game playthrough works
- [ ] All features functional
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All browsers tested
- [ ] Sounds work correctly
- [ ] Language toggle works

---

### 13. Monitoring & Analytics Setup (Optional) ✅

#### Error Tracking
```bash
# Optional: Add Sentry or similar
# npm install @sentry/react
```

**Options**:
- [ ] Sentry for error tracking
- [ ] Google Analytics for usage
- [ ] Plausible Analytics (privacy-focused)
- [ ] Simple logging to console (current approach)

**Current Status**: ✅ Using console logging (acceptable for this app)

---

### 14. Backup & Rollback Plan ✅

**Before Deployment**:
- [ ] Git tag current version: `git tag v0.1.0`
- [ ] Push tag: `git push origin v0.1.0`
- [ ] Document current production state
- [ ] Have rollback plan ready

**Rollback Procedure**:
```bash
# If deployment fails, rollback to previous version
git checkout v0.1.0
npm run build
# Redeploy
```

---

### 15. Final Pre-Launch Checklist ✅

#### Technical Readiness
- [ ] All tests passing
- [ ] Security audit clean (production deps)
- [ ] Production build successful
- [ ] Performance metrics met
- [ ] Accessibility verified
- [ ] Browser compatibility confirmed
- [ ] Security headers configured
- [ ] SSL/HTTPS enabled

#### Content Readiness
- [ ] All content reviewed
- [ ] Bilingual support verified
- [ ] Cultural authenticity confirmed
- [ ] Documentation complete
- [ ] No placeholder content

#### Deployment Readiness
- [ ] Hosting platform configured
- [ ] Domain configured (if using)
- [ ] Auto-deploy set up
- [ ] Monitoring configured
- [ ] Backup plan in place
- [ ] Team notified
- [ ] Rollback plan ready

---

## Deployment Commands

### Automated Deployment

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to staging
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

#### GitHub Pages
```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
npm run build
gh-pages -d build
```

---

### Manual Deployment

#### Build and Upload
```bash
# 1. Build
npm run build

# 2. Upload build folder to your hosting provider
# Use FTP, rsync, or provider's CLI

# Example with rsync (if using own server):
rsync -avz build/ user@server:/var/www/loteria-game/
```

---

## Post-Deployment Verification

### Immediate Checks (within 5 minutes)

```bash
# 1. Verify site is live
curl -I https://your-domain.com

# 2. Check for errors
# Open browser console on production site
# Verify no errors

# 3. Verify security headers
curl -I https://your-domain.com | grep -i "content-security-policy"
curl -I https://your-domain.com | grep -i "strict-transport-security"
```

**Requirements**:
- [ ] Site loads successfully
- [ ] HTTPS working
- [ ] No console errors
- [ ] Security headers present
- [ ] Assets loading correctly

---

### Comprehensive Testing (within 1 hour)

**Manual Testing**:
- [ ] Play through complete game
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Verify sounds work
- [ ] Test language toggle
- [ ] Verify win detection
- [ ] Check all browsers

**Performance Testing**:
- [ ] Run Lighthouse audit
- [ ] Check page load time
- [ ] Verify bundle sizes
- [ ] Check network requests

**Security Testing**:
- [ ] Verify HTTPS
- [ ] Check security headers: https://securityheaders.com
- [ ] Verify CSP working
- [ ] Check SSL Labs: https://www.ssllabs.com/ssltest/

---

### Monitoring (ongoing)

**First 24 Hours**:
- [ ] Monitor for errors
- [ ] Check analytics (if configured)
- [ ] Verify performance
- [ ] Gather user feedback

**First Week**:
- [ ] Review any issues
- [ ] Monitor performance trends
- [ ] Check browser compatibility reports
- [ ] Address any bugs

**Ongoing**:
- [ ] Monthly security audits
- [ ] Quarterly dependency updates
- [ ] Regular performance checks
- [ ] User feedback review

---

## Emergency Rollback Procedure

If deployment fails or critical issues found:

```bash
# 1. Rollback to previous version
git checkout v0.1.0

# 2. Rebuild
npm run build

# 3. Redeploy
# (Use same deployment method as above)

# 4. Verify rollback successful
curl -I https://your-domain.com

# 5. Investigate issue offline
git checkout main
# Fix issues
# Test thoroughly
# Retry deployment when ready
```

---

## Success Criteria

### Deployment is Successful When:
- ✅ Site is live and accessible
- ✅ HTTPS working correctly
- ✅ All features functional
- ✅ Performance targets met
- ✅ No console errors
- ✅ Security headers present
- ✅ All tests passing
- ✅ Browser compatibility confirmed

---

## Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Announce launch
- [ ] Monitor for issues
- [ ] Respond to feedback

### Short-term (Week 1)
- [ ] Review analytics
- [ ] Address any bugs
- [ ] Gather user feedback
- [ ] Plan improvements

### Ongoing
- [ ] Monthly security audits
- [ ] Quarterly updates
- [ ] Feature enhancements
- [ ] Performance optimization

---

## Contact & Support

**Deployment Issues**: Check logs in hosting provider dashboard
**Security Issues**: Review SECURITY_AUDIT_REPORT.md
**Technical Questions**: Refer to CLAUDE.md and AGENTS.md

---

**Prepared By**: Claude Code
**Last Updated**: 2026-02-06
**Version**: 1.0

🎉 **Ready to deploy!** Follow this checklist step-by-step for a successful launch.
