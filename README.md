# 💼 HR Dashboard - Employee Performance Management

A comprehensive HR dashboard built with Next.js, TypeScript, and Tailwind CSS for tracking employee performance, managing bookmarks, and viewing detailed insights.

## 🚀 Features

### ✅ Core Features Implemented

- **🏠 Dashboard Homepage** - Display employee cards with performance ratings, search, and filtering
- **🔍 Search & Filter** - Search by name, email, department with multi-select filters
- **👤 Employee Details** - Dynamic pages with tabs for Overview, Projects, and Feedback
- **📌 Bookmark Manager** - Save and manage favorite employees with promote/assign actions
- **📊 Analytics Dashboard** - Charts showing department performance and bookmark trends
- **🌙 Dark/Light Mode** - Toggle between themes with persistent state
- **📱 Responsive Design** - Mobile-first approach with responsive layouts

### 🎯 Advanced Features

- **State Management** - Zustand for global state with persistence
- **Custom Hooks** - `useEmployees`, `useSearch` for data management
- **Reusable Components** - Button, Badge, RatingStars, EmployeeCard, etc.
- **TypeScript** - Full type safety throughout the application
- **Chart.js Integration** - Interactive charts for analytics
- **Loading States** - Proper loading and error handling
- **Keyboard Accessibility** - Focus management and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Data**: DummyJSON API + Mock data

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hr-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
hr-dashboard/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── RatingStars.tsx
│   │   ├── EmployeeCard.tsx
│   │   ├── SearchAndFilter.tsx
│   │   └── Navigation.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useEmployees.ts
│   │   └── useSearch.ts
│   ├── lib/                # Utilities and types
│   │   ├── types.ts
│   │   └── store.ts
│   ├── employee/           # Employee details pages
│   │   └── [id]/
│   │       └── page.tsx
│   ├── bookmarks/          # Bookmarks page
│   │   └── page.tsx
│   ├── analytics/          # Analytics page
│   │   └── page.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Dashboard homepage
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

### EmployeeCard
- Displays employee information in a card format
- Performance rating with star visualization
- Bookmark and promote functionality
- Responsive design with hover effects

### SearchAndFilter
- Real-time search functionality
- Multi-select department filter
- Performance range filter
- Clear all filters option

### Analytics Dashboard
- Department performance bar chart
- Bookmark trends line chart
- Performance distribution doughnut chart
- Top performing departments list

## 🔧 Customization

### Adding New Features

1. **New Employee Fields**: Update `types.ts` and `useEmployees.ts`
2. **Additional Filters**: Extend `useSearch.ts` hook
3. **New Charts**: Add Chart.js components in analytics page
4. **Custom Components**: Create in `components/` directory

### Styling

- Uses Tailwind CSS for styling
- Dark mode support with CSS variables
- Custom scrollbar styling
- Responsive breakpoints

## 📊 Data Sources

- **Employee Data**: Fetched from [DummyJSON API](https://dummyjson.com/users)
- **Mock Data**: Performance history, projects, feedback
- **Local Storage**: Bookmarks and user preferences

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for API data
- [Chart.js](https://www.chartjs.org/) for charts
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
