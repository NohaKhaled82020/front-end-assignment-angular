# News Management Web App

An Angular 20 web application designed for Cluster2 Airports to efficiently manage and display company news. The app offers a seamless user experience with responsive design, dark mode support, and intuitive news management features.

## 🚀 Features

- **Responsive UI:** Optimized for desktop, tablet, and mobile devices.
- **News Dashboard:** list of news articles including titles, summaries, and publish dates.
- **Archive News:** Automatically archive news articles 30 days after their publish date.
- **Detailed View:** Access full article content on a news details page.
- **Add News:** Submit new articles with fields such as title, content, tags, and publish date.
- **Search Functionality:** filter news articles by title or content keywords.
- **Dark Mode:** Toggle between light and dark themes.

## 🌐 Live Demo

Access the live application here:  
[https://news-management.netlify.app/](https://news-management.netlify.app/)

## 🛠️ Technology Stack

- Angular 20
- TailwindCSS
- ng-bootstrap
- ng-select
- ngx-spinner
- @ngx-loading-bar
- RxJS
- [MockAPI.io](https://mockapi.io/)

## 🧪 Data Source

This project uses MockAPI.io to perform a RESTful API for news data. All CRUD operations on news articles interact with this mock backend, providing a realistic API experience without requiring a full backend implementation.

## 📦 Installation and Setup

1. **Clone the repository**

   ```bash
   git clone <https://github.com/NohaKhaled82020/front-end-assignment-angular.git>
   cd <front-end-assignment-angular>

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
