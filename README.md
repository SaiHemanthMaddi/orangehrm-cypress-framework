# OrangeHRM Cypress Enterprise Framework

A comprehensive, production-ready Cypress automation framework for testing the [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/) application.

## 🚀 Features

- **Page Object Model (POM)**: Maintainable and scalable test architecture
- **Multi-Module Testing**: Admin, PIM, Leave, Time, Recruitment, Performance, and Dashboard modules
- **Allure Reporting**: Rich, interactive test reports with screenshots and detailed logs
- **Custom Commands**: Reusable Cypress commands for common operations
- **Data-Driven Testing**: Fixtures for test data management
- **CI/CD Ready**: GitHub Actions workflow with scheduled and manual runs
- **Code Quality**: Prettier formatting for consistent code style

## 📁 Project Structure

```
orangehrm-cypress-framework/
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   ├── admin/              # Admin module tests
│   │   ├── pim/                # PIM module tests
│   │   ├── leave/              # Leave module tests
│   │   ├── time/               # Time module tests
│   │   ├── recruitment/        # Recruitment module tests
│   │   ├── performance/        # Performance module tests
│   │   └── dashboard/          # Dashboard tests
│   ├── fixtures/               # Test data files
│   ├── pages/                  # Page Object Models
│   ├── support/                # Custom commands and utilities
│   │   ├── commands.js         # Custom Cypress commands
│   │   └── e2e.js              # Global configuration
│   ├── screenshots/            # Test failure screenshots
│   └── videos/                 # Test execution videos
├── allure-results/             # Allure test results
├── allure-report/              # Generated Allure reports
├── .github/
│   └── workflows/              # GitHub Actions workflows
├── cypress.config.js           # Cypress configuration
├── package.json                # Project dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🛠️ Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Git**: Latest version

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SaiHemanthMaddi/orangehrm-cypress-framework.git
   cd orangehrm-cypress-framework
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
npm run cypress:open
```

### Headless Mode
```bash
npm run test:run
```

### Headed Mode (Browser Visible)
```bash
npm run test:headed
```

## 📊 Test Reports

### Generate Allure Report
```bash
npm run allure:generate
```

### Open Allure Report
```bash
npm run allure:open
```

## 🎯 Test Modules

### Admin Module
- User management (Add, Edit, Delete, Search)
- Job management
- Organization structure
- Qualifications

### PIM Module
- Employee management
- Employee list operations
- Personal details

### Leave Module
- Leave requests
- Leave types
- Leave balance

### Time Module
- Timesheets
- Project time tracking
- Attendance

### Recruitment Module
- Candidate management
- Vacancies
- Job applications

### Performance Module
- Performance reviews
- KPIs
- Trackers

### Dashboard
- Dashboard widgets
- Quick launch
- Employee distribution

## 🔧 Configuration

### Cypress Configuration
The main configuration is in `cypress.config.js`:
- Base URL: `https://opensource-demo.orangehrmlive.com`
- Viewport: 1920x1080
- Video recording: Enabled on failure
- Screenshot: Enabled on failure
- Allure reporting: Enabled

### Environment Variables
Create a `.env` file for sensitive data:
```env
CYPRESS_USERNAME=Admin
CYPRESS_PASSWORD=admin123
```

## 🤖 CI/CD

### GitHub Actions
The framework includes a GitHub Actions workflow (`.github/workflows/cypress-tests.yml`) that:
- Runs tests on a nightly schedule (configurable)
- Supports manual workflow dispatch
- Generates and archives Allure reports
- Uploads test artifacts

### Workflow Triggers
- **Scheduled**: Runs nightly at a specified time
- **Manual**: Can be triggered from GitHub Actions UI
- **Push**: Runs on push to main branch (optional)

## 📝 Code Quality

### Format Code
```bash
npm run format
```

### Check Formatting
```bash
npm run lint:prettier
```

## 🧩 Custom Commands

The framework includes custom commands in `cypress/support/commands.js`:
- `cy.login()`: Login to OrangeHRM
- `cy.logout()`: Logout from application
- Navigation helpers
- Common UI interactions

## 📚 Writing Tests

### Example Test Structure
```javascript
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('Feature Name', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');
  });

  it('should perform action', () => {
    // Test implementation
  });

  afterEach(() => {
    cy.logout();
  });
});
```

## 🐛 Debugging

### Debug Configuration
A debug configuration is available in `cypress.config.debug.js` for troubleshooting.

### Execution Trace
Execution traces are logged to `execution_trace.txt` for debugging test flows.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [OrangeHRM](https://www.orangehrm.com/) for the demo application
- [Cypress](https://www.cypress.io/) for the testing framework
- [Allure](https://docs.qameta.io/allure/) for reporting

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Happy Testing! 🎉**
