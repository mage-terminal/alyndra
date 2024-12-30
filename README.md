<h2 align="center">Alyndra: AI Chat History Analysis Tool</h2>

<h5 align="center">An advanced tool for analyzing and managing AI conversation history</h5>

<h5 align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

</h5>

## 🌟 Overview

Alyndra is a sophisticated tool designed to help researchers and developers analyze AI chat histories. It provides powerful features for tracking citations, analyzing conversation patterns, and managing chat data effectively.

## ✨ Key Features

- 📊 Advanced Chat Analysis
  - Citation tracking and metrics
  - Conversation pattern recognition
  - Impact assessment tools
- 🔍 Smart Search Functionality
  - Full-text search
  - Context-aware filtering
  - Advanced query options
- 💾 Robust Data Management
  - Secure local storage
  - Data export/import
  - Backup capabilities
- 🎨 Modern Interface
  - Responsive design
  - Dark/Light themes
  - Intuitive navigation

## 🛠️ Technology Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: PostCSS
- **Data Storage**: Local storage with encryption
- **Development Tools**:
  - Environment configuration
  - TypeScript type definitions
  - PostCSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/mage-terminal/alyndra.git
cd alyndra
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

4. Start development server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📁 Project Structure

```
alyndra/
├── .env.local.example    # Environment configuration template
├── next-env.d.ts        # TypeScript declarations for Next.js
├── postcss.config.js    # PostCSS configuration
├── working/            # Working directory (gitignored)
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   └── types/         # TypeScript types
└── package.json
```

## ⚙️ Configuration

### Environment Variables

1. Copy the example configuration file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` with your settings. Here's a detailed explanation of each configuration option:

```env
# Core Configuration
NODE_ENV=development                  # development, production, or test
PORT=3000                            # Application port number

# Database Configuration
DB_TYPE=sqlite                       # Database type: sqlite, mysql, postgres
DB_PATH=./working/database.sqlite    # Path to SQLite database file

# API Configuration
API_ENDPOINT=your_api_endpoint       # Your API endpoint URL
API_KEY=your_api_key                # Your API authentication key
API_VERSION=v1                       # API version to use

# Feature Flags
ENABLE_ANALYTICS=true                # Enable/disable analytics features
ENABLE_CITATIONS=true                # Enable/disable citation tracking
ENABLE_EXPORT=true                   # Enable/disable data export features

# Security Settings
ENCRYPTION_KEY=your_encryption_key   # Key for local storage encryption
SESSION_SECRET=your_session_secret   # Session security key

# UI Configuration
THEME=light                          # Default theme: light or dark
LANGUAGE=en                          # Default language: en, zh, ja, etc.
ITEMS_PER_PAGE=20                    # Number of items to show per page
```

Important notes:
- Never commit `.env.local` to version control
- Keep your API keys and secrets secure
- Make sure to set appropriate values for production environment
- Some features may require specific environment variables to be set

### PostCSS Setup

The project uses PostCSS for optimal CSS processing:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 📊 Data Analysis Features

- **Citation Analysis**
  - Track reference patterns
  - Measure impact metrics
  - Generate citation reports

- **Conversation Analytics**
  - Message frequency analysis
  - Response time tracking
  - Topic clustering

- **Export Capabilities**
  - JSON data export
  - CSV reports
  - Analytics summaries

## 🔒 Security

- Local storage encryption
- Secure environment variable handling
- Data backup protection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

- GitHub Issues: [Create an issue](https://github.com/mage-terminal/alyndra/issues)


## 🙏 Acknowledgments

- Thanks to all contributors
- Built with Next.js and TypeScript
- Inspired by the need for better AI conversation analysis

---

<p align="center">If you find Alyndra useful, please consider giving it a ⭐ on GitHub!</p> 