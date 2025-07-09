# Pull Request Template

## 📋 Description
Brief description of the changes introduced by this PR.

### 🔄 Type of Change
What type of change does this PR introduce?

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📖 Documentation update
- [ ] 🔧 Code refactoring (no functional changes)
- [ ] ⚡ Performance improvements
- [ ] 🧪 Test improvements
- [ ] 🔒 Security improvements

### 🎯 What Does This PR Do?
- Change 1
- Change 2
- Change 3

## 🔗 Related Issues
Closes #(issue_number)
Related to #(issue_number)

## 🧪 How Has This Been Tested?
Describe the tests that you ran to verify your changes:

- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] E2E tests

### Test Configuration
- Node.js version: 
- NPM version: 
- OS: 

### Test Details
```bash
# Commands used to test
npm test
npm run test:integration
```

## 📊 Code Quality Checklist

### Code Standards
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation

### Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

### Documentation
- [ ] I have updated the documentation accordingly
- [ ] I have updated the CHANGELOG.md
- [ ] I have added/updated JSDoc comments for new functions
- [ ] API documentation has been updated (if applicable)

## 📸 Screenshots (if applicable)
Add screenshots to help explain your changes.

| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |

## 🔍 Code Review Areas
Areas that need special attention during review:

- **Security**: Check for potential security vulnerabilities
- **Performance**: Review for performance implications
- **Error Handling**: Verify proper error handling
- **Architecture**: Ensure changes follow Clean Architecture principles

## 🚀 Deployment Notes
Special instructions for deployment (if any):

- [ ] Database migrations required
- [ ] Environment variables updated
- [ ] SSL certificates need renewal
- [ ] Configuration changes needed

## 📋 Breaking Changes
If this is a breaking change, describe what breaks and how to migrate:

### What Breaks
- API endpoint changes
- Response format changes
- Configuration changes

### Migration Guide
```javascript
// Before
const oldWay = api.oldMethod();

// After
const newWay = api.newMethod();
```

## 🔄 Additional Context
Add any other context about the pull request here.

### Dependencies
- New dependencies added:
  - package@version - reason for adding
  
- Dependencies removed:
  - package@version - reason for removal

### Performance Impact
- [ ] No performance impact
- [ ] Performance improved
- [ ] Performance degraded (explain why acceptable)

### Backward Compatibility
- [ ] Fully backward compatible
- [ ] Deprecation warnings added
- [ ] Breaking changes (documented above)

## ✅ Final Checklist
- [ ] I have read the [CONTRIBUTING.md](../CONTRIBUTING.md) document
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly
- [ ] All tests pass
- [ ] Documentation has been updated
- [ ] Code has been reviewed by myself
- [ ] CHANGELOG.md has been updated
