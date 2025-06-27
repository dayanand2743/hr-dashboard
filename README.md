# 💼 HR Dashboard - Employee Performance Management

A comprehensive HR dashboard built with Next.js, TypeScript, and Tailwind CSS for tracking employee performance, managing bookmarks, and viewing detailed insights.

## 🌐 **Live Demo**

**[🚀 View Live Demo](https://hr-dashboard-demo.vercel.app)** *(Deploy your own version below)*

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

- **Framework**: Next.js 14 with App Router
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
- Git

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

## 🌍 **Deployment Guide**

### **Option 1: Vercel (Recommended) - Free & Instant**

Vercel is the easiest deployment option for Next.js projects.

#### **Step 1: Prepare Your Repository**
```bash
# Make sure your code is committed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### **Step 2: Deploy to Vercel**
1. **Visit [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository** from GitHub
5. **Configure settings:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
6. **Click "Deploy"**

#### **Step 3: Get Your Live URL**
- **Production URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: Add your own domain in Vercel dashboard
- **Automatic Deployments**: Every push to main branch auto-deploys

#### **Vercel Advantages:**
- ✅ **Zero Configuration** - Auto-detects Next.js
- ✅ **Instant Deployments** - Deploy in seconds
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Free Tier** - Unlimited deployments
- ✅ **Custom Domains** - Add your own domain
- ✅ **Preview Deployments** - Test before merging

### **Option 2: Netlify - Alternative Platform**

#### **Step 1: Build Your Project**
```bash
npm run build
npm run export  # If using static export
```

#### **Step 2: Deploy to Netlify**
1. **Visit [netlify.com](https://netlify.com)**
2. **Sign up/Login** with GitHub
3. **Drag & Drop** your `out` folder OR **Connect GitHub** repository
4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `out` (for static export)
5. **Deploy**

#### **Step 3: Get Your Live URL**
- **Production URL**: `https://your-project-name.netlify.app`

### **Option 3: Railway - Full-Stack Platform**

#### **Step 1: Prepare for Railway**
```bash
# Add Railway configuration
echo "NODE_VERSION=18" > .nvmrc
```

#### **Step 2: Deploy to Railway**
1. **Visit [railway.app](https://railway.app)**
2. **Connect GitHub** repository
3. **Auto-deploy** - Railway detects Next.js automatically
4. **Get your URL**: `https://your-project-name.railway.app`

### **Option 4: Render - Cloud Platform**

#### **Step 1: Deploy to Render**
1. **Visit [render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect GitHub** repository
4. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Deploy**

#### **Step 2: Get Your Live URL**
- **Production URL**: `https://your-project-name.onrender.com`

## 📱 **Mobile & Cross-Platform Access**

Once deployed, your HR Dashboard will be accessible from:

- **📱 Mobile Phones** - iOS Safari, Android Chrome
- **💻 Desktop Computers** - Chrome, Firefox, Safari, Edge
- **📱 Tablets** - iPad, Android tablets
- **🖥️ Smart TVs** - Web browsers on smart TVs

### **Responsive Features:**
- ✅ **Mobile-First Design** - Optimized for small screens
- ✅ **Touch-Friendly** - Large buttons and touch targets
- ✅ **Adaptive Layout** - Grid adjusts to screen size
- ✅ **Fast Loading** - Optimized for mobile networks
- ✅ **Offline Support** - Works with poor connectivity

## 🔧 **Environment Variables (Optional)**

For production deployments, you can add these environment variables:

```env
# .env.local
NEXT_PUBLIC_API_URL=https://dummyjson.com
NEXT_PUBLIC_APP_NAME=HR Dashboard
```

## 📊 **Performance Optimization**

The dashboard includes:
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Components load on demand
- **Caching** - Browser and CDN caching
- **Minification** - Automatic CSS/JS minification

## 🧪 **Testing Your Deployment**

After deployment, test these features:

1. **✅ Homepage Loading** - Dashboard displays correctly
2. **✅ Employee Cards** - All employee data loads
3. **✅ Search & Filter** - Filtering works properly
4. **✅ Employee Details** - Individual employee pages work
5. **✅ Bookmarks** - Bookmark functionality works
6. **✅ Analytics** - Charts display correctly
7. **✅ Dark Mode** - Theme toggle works
8. **✅ Mobile Responsive** - Works on mobile devices

## 🚀 **Quick Deploy Buttons**

### **Deploy to Vercel**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hr-dashboard)

### **Deploy to Netlify**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/hr-dashboard)

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
- Mobile browsers (iOS Safari, Android Chrome)

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
- [Vercel](https://vercel.com/) for deployment platform

## 📞 **Support & Questions**

If you need help with deployment or have questions:

- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check the code comments and types
- **Community**: Ask in Next.js or React communities

---

**🚀 Ready to deploy? Choose your platform above and get your live URL in minutes!**

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
