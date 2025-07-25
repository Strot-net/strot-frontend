# Strot - Complete Work Operating System

A comprehensive work operating system that combines freelance gigs, verified jobs, local tasks, and AI-driven learning into one unified platform.

## 🚀 Features

### Core Platform
- **Multi-Profile Support**: Freelancer, Full-Timer, Local Gig Worker, and Employer profiles
- **Advanced Job Discovery**: AI-powered job matching and recommendations
- **Comprehensive Profile Management**: Detailed profiles with skills, experience, and portfolios
- **Social Networking**: Connect with professionals and build your network
- **Real-time Messaging**: Direct communication between users
- **AI Learning Studio**: Personalized learning paths and skill development

### User Types
- **Freelancers**: Project-based work, portfolio showcase, client management
- **Full-Time Professionals**: Career opportunities, skill verification, networking
- **Local Gig Workers**: Location-based services, quick tasks, community connections
- **Employers**: Talent discovery, team building, company profiles

### Advanced Features
- **AI-Powered Matching**: Smart job recommendations based on skills and preferences
- **Analytics Dashboard**: Comprehensive insights for all user types
- **Dark/Light Theme**: Light mode by default with theme switching (Light, Dark, System)
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Real-time Notifications**: Stay updated with opportunities and messages

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS V4, Radix UI Components
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **State Management**: React Context API

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/strot/work-operating-system.git
   cd work-operating-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

That's it! The application will start with the landing page and full functionality.

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

## 📱 Usage

### Getting Started
1. **Landing Page**: Explore features and benefits
2. **Sign Up**: Create your account with email and password
3. **Profile Selection**: Choose your work profile type
4. **Dashboard**: Access personalized dashboard with opportunities
5. **Explore**: Browse jobs, connect with professionals, learn new skills

### Profile Types
- **Freelancer**: Access project-based opportunities, showcase portfolio
- **Full-Timer**: Discover career opportunities, build professional network
- **Local Gig**: Find location-based tasks and services
- **Employer**: Post jobs, discover talent, build teams

## 🎨 Design System

The application uses a comprehensive design system with:
- **Consistent Typography**: 14px base font size with proper hierarchy
- **Color Tokens**: Light and dark mode support
- **Component Library**: Radix UI with custom styling
- **Responsive Layout**: Mobile-first design approach
- **Animation System**: Smooth transitions and micro-interactions

## 🔧 Configuration

### Theme Customization
Modify `/styles/globals.css` to customize colors, typography, and spacing.

### Environment Variables
Create a `.env.local` file for environment-specific configuration:
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Strot
```

## 📁 Project Structure

```
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── profile/         # Profile management
│   ├── ui/              # UI component library
│   └── theme/           # Theme provider
├── styles/              # Global styles
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── types/               # TypeScript definitions
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://strot.com)
- [Documentation](https://docs.strot.com)
- [API Reference](https://api.strot.com/docs)

## 💬 Support

For support and questions:
- 📧 Email: support@strot.com
- 💬 Discord: [Join our community](https://discord.gg/strot)
- 🐛 Issues: [GitHub Issues](https://github.com/strot/work-operating-system/issues)

---

**Built with ❤️ by the Strot Team**