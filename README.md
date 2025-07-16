# Cluster2 Airports News Management Web App

An Angular 20 web application designed for Cluster2 Airports to efficiently manage and display company news. The app offers a seamless user experience with responsive design, dark mode support, and intuitive news management features.

## 🚀 Features

- **Responsive UI:** Optimized for desktop, tablet, and mobile devices.
- **News Dashboard:** list of news articles including titles, summaries, and publish dates.
- **Detailed View:** Access full article content on a news details page.
- **Add News:** Submit new articles with fields such as title, content, tags, and publish date.
- **Archive News:** Automatically archive news articles 30 days after their publish date.
- **Search Functionality:** filter news articles by title or content keywords.
- **Dark Mode:** Toggle between light and dark themes.

## 🌐 Live Demo

Access the live application here:  
[https://scoot-multi-page-website-09.netlify.app/](https://scoot-multi-page-website-09.netlify.app/)

## 🛠️ Technology Stack

- **Framework:** Angular 20
- **Styling:** TailwindCSS
- **UI Components:** ng-bootstrap, ng-select
- **Loading Indicators:** ngx-spinner
- **Data Source:** [MockAPI.io](https://mockapi.io/) (REST API)
- **Reactive Programming:** RxJS

## 🧪 Notes on Data Source

This project uses MockAPI.io to simulate a RESTful API for news data. All CRUD operations on news articles interact with this mock backend, providing a realistic API experience without requiring a full backend implementation.

## 📦 Installation and Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

## 🧾 Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🏗️ Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
