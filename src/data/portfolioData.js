export const initialProfileData = {
  name: "Rutuja Bairagi",
  wordmark: "Rutuja Bairagi",
  role: "Frontend Web Developer",
  experienceYears: "Frontend Intern & React Developer",
  headline: "Building responsive, component-driven web applications with ReactJS & Tailwind CSS.",
  tagline: "Specialized in creating 15+ reusable React components, integrating 20+ REST API endpoints with Axios, and optimizing cross-device performance.",
  bio: "Frontend Web Developer with proven hands-on experience building dynamic e-commerce modules and location-based web applications. Skilled in ReactJS, Tailwind CSS, JavaScript (ES6+), Axios REST API integration, and responsive web architecture.",
  secondaryBio: "Passionate about writing clean code, collaborating with cross-functional design and backend teams, and delivering fast, accessible user experiences.",
  phone: "+91-9657485194",
  location: "Nashik, Maharashtra",
  email: "rutujabairagi15@gmail.com",
  github: "https://github.com/rutuja-bairagi",
  linkedin: "https://linkedin.com/in/rutuja-bairagi",
  twitter: "https://twitter.com/rutujabairagi",
  avatarUrl: "/src/assets/images/hero_developer_portrait_1792642496546.jpg",
  status: "Available for Frontend Developer roles & opportunities",
  educations: [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "Sandip Institute of Technology and Research Center",
      score: "CGPA: 7.68",
      period: "Jul 2017 – May 2021",
      location: "Nashik, MH"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "K.V.N. Naik College",
      score: "66.77%",
      period: "2016 – 2017",
      location: "Nashik, MH"
    }
  ],
  certifications: [
    {
      title: "Front End Development",
      issuer: "I-Tech System"
    },
    {
      title: "Java Programming",
      issuer: "Great Learning"
    }
  ],
  stats: [
    {
      value: "15+",
      label: "Reusable Components",
      context: "Built for e-commerce & dashboards"
    },
    {
      value: "20+",
      label: "REST APIs Integrated",
      context: "Axios workflows, auth & orders"
    },
    {
      value: "40%",
      label: "API Request Optimization",
      context: "Via debouncing & clean rendering"
    },
    {
      value: "< 2s",
      label: "Page Load Speed",
      context: "Achieved through optimized UI"
    }
  ]
};

export const initialProjects = [
  {
    id: "kumbhmela-ecommerce",
    title: "Kumbhmela Online E-Commerce Platform",
    tagline: "Responsive cultural e-commerce platform with 15+ pages and an Admin Management Panel.",
    summary: "Designed a responsive e-commerce platform featuring 15+ modules including product listings, cart, checkout, user profile, and order-tracking. Integrated 20+ REST API endpoints using Axios for authentication, cart operations, and order workflows. Engineered a full Admin Panel for managing 50+ product listings, orders, and users with real-time CRUD operations, search, and category filtering.",
    category: "react",
    categoryLabel: "Flagship E-Commerce App",
    year: "2026",
    featured: true,
    image: "/src/assets/images/project_kumbhmela_ecommerce_1792729957433.jpg",
    demoUrl: "https://kumbhmela-store.dev",
    repoUrl: "https://github.com/rutuja-bairagi/kumbhmela-ecommerce",
    tags: ["ReactJS", "Redux", "Tailwind CSS", "REST API", "Axios", "Admin Panel"],
    metrics: [
      { label: "Components", value: "15+ Modules" },
      { label: "REST APIs", value: "20+ Endpoints" },
      { label: "Admin Listings", value: "50+ Products" }
    ],
    caseStudy: {
      overview: "Built to provide a complete online shopping experience for traditional cultural goods with a powerful back-office management dashboard.",
      whatILearned: "Mastered building scalable ReactJS component hierarchies, integrating Axios REST APIs with authentication headers, managing cart and checkout state with Redux, and implementing responsive Admin CRUD interfaces.",
      features: [
        "15+ responsive pages/components including Product Listing, Cart, Checkout, Profile, and Order Tracking",
        "Integrated 20+ REST API endpoints using Axios for auth, cart state, and order processing",
        "Admin Dashboard with full CRUD functionality for 50+ products, orders, and user accounts",
        "Live keyword search, price range filtering, and category sorting",
        "Mobile-first responsive styling powered by Tailwind CSS"
      ],
      codeSnippet: {
        title: "apiService.js",
        language: "javascript",
        code: `// Axios API integration for Kumbhmela e-commerce orders & cart
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.kumbhmela-store.dev/v1',
  headers: { 'Content-Type': 'application/json' }
});

export const getProducts = async (category = '') => {
  const response = await api.get('/products', { params: { category } });
  return response.data;
};

export const placeOrder = async (orderPayload, token) => {
  const response = await api.post('/orders/checkout', orderPayload, {
    headers: { Authorization: \`Bearer \${token}\` }
  });
  return response.data;
};`
      },
      liveSimulatorType: "ecommerce_kumbh"
    }
  },
  {
    id: "location-advertising-app",
    title: "Location-Based Mobile Advertising App",
    tagline: "Targeted geographic zone promotions using GPS and Geofencing APIs.",
    summary: "Built a location-based advertising application with 10+ responsive screens, integrating GPS and Geofencing APIs to deliver targeted advertisements across multiple predefined geographic zones. Optimized frontend performance through debounced API requests and efficient component rendering, reducing unnecessary API calls by 40% and improving page load times to under 2 seconds.",
    category: "api",
    categoryLabel: "GPS & Geofencing App",
    year: "2026",
    featured: true,
    image: "/src/assets/images/project_geofence_ads_1792729958106.jpg",
    demoUrl: "https://geo-ads-app.dev",
    repoUrl: "https://github.com/rutuja-bairagi/location-advertising-app",
    tags: ["ReactJS", "Tailwind CSS", "GPS / Geofencing API", "Performance Optimization", "Debounce"],
    metrics: [
      { label: "Screens", value: "10+ Responsive" },
      { label: "API Calls", value: "-40% Reduced" },
      { label: "Load Speed", value: "< 2.0s" }
    ],
    caseStudy: {
      overview: "Designed for localized businesses and retail outlets to deliver real-time promotional discounts to mobile users within precise GPS proximity boundaries.",
      whatILearned: "Gained in-depth expertise working with HTML5 Geolocation, calculating coordinate distances, debouncing location update streams, and optimizing React renders to conserve mobile battery and network bandwidth.",
      features: [
        "10+ responsive screens designed for seamless mobile, tablet, and desktop viewing",
        "Geofencing zone detection delivering targeted deals based on live user coordinates",
        "Debounced API requests reducing redundant network roundtrips by 40%",
        "Under 2-second load times achieved via component lazy loading and Tailwind CSS optimization",
        "Interactive promotional cards with tap-to-claim coupon flows"
      ],
      codeSnippet: {
        title: "useGeofence.js",
        language: "javascript",
        code: `// GPS Geofence zone calculation with debounced location polling
import { useState, useEffect } from 'react';

export function useGeofence(zones) {
  const [currentZone, setCurrentZone] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    let timeoutId;
    const watchId = navigator.geolocation.watchPosition((position) => {
      clearTimeout(timeoutId);
      // Debounce coordinate verification by 500ms
      timeoutId = setTimeout(() => {
        const { latitude, longitude } = position.coords;
        const matched = zones.find(z => calculateDistance(latitude, longitude, z.lat, z.lng) <= z.radiusMeters);
        setCurrentZone(matched || null);
      }, 500);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearTimeout(timeoutId);
    };
  }, [zones]);

  return currentZone;
}`
      },
      liveSimulatorType: "geofence"
    }
  },
  {
    id: "taskflow-manager",
    title: "TaskFlow – Task & Kanban Manager",
    tagline: "Organize daily tasks with clean categories, priorities, and local storage persistence.",
    summary: "A practical task management application built with ReactJS and Tailwind CSS. Users can create tasks, assign priority labels (High, Medium, Low), manage tasks across workflow stages, filter by keyword, and save all items in browser LocalStorage.",
    category: "react",
    categoryLabel: "Productivity App",
    year: "2025",
    featured: false,
    image: "/src/assets/images/project_task_tracker_1792643176774.jpg",
    demoUrl: "https://taskflow-demo.dev",
    repoUrl: "https://github.com/rutuja-bairagi/taskflow-react",
    tags: ["ReactJS", "JavaScript (ES6+)", "Tailwind CSS", "LocalStorage"],
    metrics: [
      { label: "Storage", value: "LocalStorage" },
      { label: "Filtering", value: "Real-time" },
      { label: "Design", value: "Responsive" }
    ],
    caseStudy: {
      overview: "Built to sharpen React state management fundamentals, component modularity, and LocalStorage synchronization.",
      whatILearned: "Deepened practical knowledge of React hooks (useState, useEffect), array immutability, and responsive utility-first CSS styling.",
      features: [
        "Create, toggle, and delete tasks with instant re-render",
        "Priority badge labeling (Low, Medium, High)",
        "Persistent browser storage across page reloads",
        "Responsive grid layout tested across all device sizes"
      ],
      codeSnippet: {
        title: "useLocalStorage.js",
        language: "javascript",
        code: `// Custom hook to persist state in LocalStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`
      },
      liveSimulatorType: "task"
    }
  },
  {
    id: "skyline-weather",
    title: "Skyline Weather – Live Forecast App",
    tagline: "Live weather search application consuming OpenWeatherMap REST API with 5-day forecast.",
    summary: "Responsive weather dashboard consuming REST API endpoints via modern Fetch/Axios. Allows searching global cities, toggling Celsius/Fahrenheit, and viewing real-time humidity, temperature, and wind metrics.",
    category: "api",
    categoryLabel: "REST API App",
    year: "2025",
    featured: false,
    image: "/src/assets/images/project_weather_app_1792643177839.jpg",
    demoUrl: "https://skyline-weather.dev",
    repoUrl: "https://github.com/rutuja-bairagi/skyline-weather-app",
    tags: ["ReactJS", "REST API", "Axios", "Tailwind CSS"],
    metrics: [
      { label: "API", value: "OpenWeather" },
      { label: "Units", value: "°C / °F" },
      { label: "Forecast", value: "5-Day" }
    ],
    caseStudy: {
      overview: "Created to gain expertise handling async HTTP requests, try/catch error handling, and conditional rendering for loading states.",
      whatILearned: "Learned async/await paradigms, handling API rate limits, error alerts for invalid city searches, and dynamic weather icon rendering.",
      features: [
        "Global city search with live weather stats",
        "Celsius and Fahrenheit unit toggle",
        "Clear error handling when city is not found",
        "Clean cards displaying upcoming 5-day daily forecasts"
      ],
      codeSnippet: {
        title: "fetchWeather.js",
        language: "javascript",
        code: `// Fetching weather data with error handling
export async function getCityWeather(cityName) {
  try {
    const res = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${cityName}&appid=API_KEY\`);
    if (!res.ok) throw new Error('City not found');
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}`
      },
      liveSimulatorType: "weather"
    }
  }
];

export const initialSkills = [
  {
    id: "skill-1",
    name: "ReactJS",
    level: 92,
    category: "react",
    summary: "Functional components, React Hooks (useState, useEffect, useContext), custom hooks, component reusability, Redux state management.",
    tools: ["ReactJS", "React Hooks", "Redux", "Component Lifecycle", "JSX"]
  },
  {
    id: "skill-2",
    name: "JavaScript (ES6+)",
    level: 88,
    category: "frontend",
    summary: "Arrow functions, destructuring, promises, async/await, Array methods (map, filter, reduce), DOM manipulation, OOP principles.",
    tools: ["ES6+", "Async / Await", "Promises", "Array Methods", "OOP"]
  },
  {
    id: "skill-3",
    name: "HTML5 & CSS3",
    level: 95,
    category: "frontend",
    summary: "Semantic markup, CSS Flexbox, CSS Grid, media queries, cross-browser compatibility, accessible form controls.",
    tools: ["Semantic HTML5", "CSS Flexbox", "CSS Grid", "Media Queries", "Accessibility"]
  },
  {
    id: "skill-4",
    name: "Tailwind CSS & Bootstrap",
    level: 92,
    category: "styling",
    summary: "Utility-first CSS styling, rapid responsive layout development, mobile-first design, Bootstrap grid system.",
    tools: ["Tailwind CSS", "Bootstrap", "Responsive Breakpoints", "UI Styling"]
  },
  {
    id: "skill-5",
    name: "REST API Integration & Axios",
    level: 90,
    category: "tools",
    summary: "Integrating 20+ REST API endpoints, Axios request/response interceptors, auth headers, error handling, debouncing.",
    tools: ["Axios", "REST API", "Postman", "JSON", "Debounced Requests"]
  },
  {
    id: "skill-6",
    name: "Tools & Version Control",
    level: 86,
    category: "tools",
    summary: "Git version control, GitHub repositories, branching, pull requests, VS Code development environment, npm.",
    tools: ["Git", "GitHub", "VS Code", "npm / Vite", "Chrome DevTools"]
  },
  {
    id: "skill-7",
    name: "Databases (MySQL / SQL)",
    level: 78,
    category: "tools",
    summary: "Relational database queries, basic table design, CRUD operations, joins, data normalization.",
    tools: ["MySQL", "SQL Queries", "CRUD Operations", "Table Schemas"]
  },
  {
    id: "skill-8",
    name: "Java Programming",
    level: 80,
    category: "frontend",
    summary: "Object-Oriented Programming (OOP) concepts, classes, inheritance, polymorphism, encapsulation, certified by Great Learning.",
    tools: ["Java", "OOP Principles", "Data Types", "Algorithms"]
  },
  {
    id: "skill-9",
    name: "Performance & Concepts",
    level: 88,
    category: "concepts",
    summary: "Debounced API calls, component optimization, reducing redundant renders, cross-functional collaboration, debugging.",
    tools: ["Debouncing", "Performance Optimization", "Cross-Functional Teamwork", "Debugging"]
  }
];

export const initialExperiences = [
  {
    id: "exp-1",
    role: "Frontend Web Developer Intern",
    company: "Rudhisoft Pvt. Ltd.",
    location: "Nashik, MH (Onsite)",
    period: "Mar 2026 – Present",
    type: "Internship (Onsite)",
    summary: "Developing and maintaining customer-facing e-commerce modules and integrating multi-tier REST API endpoints with Axios.",
    bulletPoints: [
      "Developed and maintained 15+ reusable ReactJS components for e-commerce modules including product listing, cart, checkout, order tracking, and user account management.",
      "Integrated 20+ REST API endpoints using Axios for authentication, product management, order processing, and payment workflows while ensuring responsive user experiences.",
      "Built and optimized responsive user interfaces using ReactJS and Tailwind CSS, ensuring seamless user experiences across desktop, tablet, and mobile devices.",
      "Collaborated with designers and backend developers to implement user-facing features and resolve integration issues across multiple application modules."
    ],
    techStack: ["ReactJS", "Tailwind CSS", "Axios", "REST API", "Git", "JavaScript (ES6+)"]
  },
  {
    id: "exp-2",
    role: "Web Development Intern",
    company: "Oasis Infobyte",
    location: "Remote",
    period: "Jun 2023 – Aug 2023",
    type: "Internship (Remote)",
    summary: "Created responsive web applications using modern web standards and layout engines.",
    bulletPoints: [
      "Created 3+ responsive web applications using HTML5, CSS3, and JavaScript, ensuring compatibility across major browsers and devices.",
      "Implemented modern layouts using CSS Flexbox, Grid, and Media Queries, achieving responsive designs across mobile, tablet, and desktop screen sizes."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "CSS Flexbox", "CSS Grid", "Media Queries"]
  }
];
