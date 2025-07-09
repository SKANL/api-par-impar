---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug']
assignees: ''

---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## ✅ Expected Behavior
A clear and concise description of what you expected to happen.

## ❌ Actual Behavior
A clear and concise description of what actually happened.

## 📷 Screenshots
If applicable, add screenshots to help explain your problem.

## 🌍 Environment
**Desktop:**
- OS: [e.g. Windows 10, macOS Big Sur, Ubuntu 20.04]
- Browser: [e.g. Chrome 96, Firefox 95, Safari 15]
- Node.js: [e.g. 16.14.0]
- NPM: [e.g. 8.3.1]

**API:**
- Version: [e.g. 1.0.0]
- Environment: [e.g. development, production]
- SSL: [e.g. enabled/disabled]

## 📋 Request/Response Details
If applicable, include:

**Request:**
```bash
curl -k -X POST https://localhost:3443/api/parity/check \
  -H "Content-Type: application/json" \
  -d '{"number": 42}'
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## 📊 Logs
If applicable, include relevant log output:

```
[2025-07-09 20:00:00] ERROR: Error message
```

## 🔍 Additional Context
Add any other context about the problem here.

## 🆘 Workaround
If you found a temporary workaround, please describe it here.

## ✅ Checklist
- [ ] I have searched for existing issues
- [ ] I have reproduced this bug on the latest version
- [ ] I have included all relevant information
- [ ] I have provided steps to reproduce
- [ ] I have included environment details
