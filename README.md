# HiepPortfolio

A modern, responsive personal portfolio website built with **React + Vite**.  
It showcases projects, blogs, contact information, and supports multiple languages with dark mode.  
🌐 Built by Thanh Hiep Nguyen.

## ✨ Features

### 🎨 **Design & UX**
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI** - Clean, professional design with Tailwind CSS
- **Smooth Animations** - Hover effects, transitions, and loading states
- **Interactive Elements** - Dynamic project cards, form validation

### 🌍 **Multilingual Support**
- **Vietnamese & English** - Complete language switching
- **Dynamic Content** - All text content supports both languages
- **Persistent Language** - Remembers user's language preference

### 📱 **Pages & Sections**
- **Home** - Hero section with animated titles and call-to-action
- **About** - Personal information, skills, education timeline
- **Projects** - Portfolio showcase with filtering and tech stack badges
- **Blog** - Article previews with categories and dates
- **Collection** - Design and development work showcase
- **Contact** - Contact form with validation and social links

### 🛠 **Technical Features**
- **React 19** - Latest React with modern hooks and patterns
- **Vite** - Fast development and optimized builds
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Comprehensive icon library
- **Form Validation** - Real-time form validation with error handling
- **Loading States** - Custom loading animations

## 🚀 **Getting Started**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/hiepportfolio.git

# Navigate to the project directory
cd hiepportfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation with theme toggle
│   ├── Footer.jsx      # Site footer
│   └── LoadingScreen.jsx # Custom loading animation
├── hooks/              # Custom React hooks
│   ├── useLanguage.jsx # Language management
│   └── useTheme.jsx    # Dark/light mode management
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── Projects.jsx    # Projects showcase
│   ├── Blog.jsx        # Blog articles
│   ├── Collection.jsx  # Design collection
│   └── Contact.jsx     # Contact form
├── locales/            # Language files
│   ├── en.json         # English translations
│   └── vi.json         # Vietnamese translations
└── assets/             # Static assets
    ├── images/         # Images and icons
    └── styles/         # CSS files
```

## 🎯 **Key Improvements Made**

### ✅ **Completed Features**
1. **Dark Mode Implementation** - Complete theme system with context
2. **Projects Page Redesign** - Interactive project cards with filtering
3. **Contact Form Enhancement** - Form validation and better UX
4. **Responsive Design** - Mobile-first approach with dark mode support
5. **Blog & Collection Pages** - Redesigned with modern layouts
6. **Loading States** - Custom loading animations
7. **Form Validation** - Real-time validation with error handling

### 🔄 **In Progress**
- SEO optimization
- Performance improvements
- Additional animations
- Blog content creation

### 📋 **Future Enhancements**
- PWA features
- Analytics integration
- Blog post detail pages
- Project case studies
- Testimonials section
- Downloadable resume

## 🎨 **Customization**

### Adding New Projects
Edit `src/pages/Projects.jsx` and add new project objects to the `projects` array:

```javascript
{
  id: 4,
  title: "Your Project",
  description: "Project description",
  image: "project-image-url",
  category: "frontend", // or "fullstack"
  tech: ["React", "Node.js"],
  github: "github-url",
  live: "live-demo-url",
  features: ["Feature 1", "Feature 2"]
}
```

### Adding New Languages
1. Create new language file in `src/locales/`
2. Add language option to language switcher
3. Update `useLanguage` hook

### Customizing Theme Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      dark: {
        // Custom dark mode colors
      }
    }
  }
}
```

## 📱 **Browser Support**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

- **Email**: nhiep3445@gmail.com
- **Phone**: (+84) 393048626
- **Location**: Ho Chi Minh City, Vietnam
- **GitHub**: [ThanhHiepNguyen](https://github.com/ThanhHiepNguyen)

---

⭐ **Star this repository if you found it helpful!**
