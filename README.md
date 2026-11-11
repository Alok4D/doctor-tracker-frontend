# Doctor Tracker — Hospital Admin Portal (Frontend)

## 1. Description

**Doctor Tracker** is a secure, full-stack hospital administrative web application engineered to streamline physician management, patient assignment workflows, and real-time clinical analytics. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit Query (RTK Query)**, the portal empowers hospital administrators with authenticated role-based access, instant debounced search, multi-criteria & date-range filtering, paginated master tables, dedicated doctor-patient linkage profiles, and interactive Recharts visualizations—delivering clean UX and sub-second data synchronization with a standalone Express + MongoDB REST API.

---

## 2. Setup Guide

### Prerequisites
- Node.js `v18+`
- `pnpm` (recommended) or `npm`
- Running instance of `doctor-tracker-backend` (Port `5000`)

### Step-by-Step Local Installation

1. **Clone the repository:**
   ```bash
   git clone <your-frontend-repo-url>
   cd doctor-tracker-frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local` and configure your API base URL:
   ```bash
   cp .env.example .env.local
   ```
   `.env.example`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_APP_NAME="Doctor Tracker"
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Evaluation Demo Credentials:**
   - **Email:** `admin@doctor-tracker.com`
   - **Password:** `password123`

---

## 3. System Architecture

The frontend communicates over RESTful JSON endpoints with the standalone Express/MongoDB backend using a centralized RTK Query API layer (`src/lib/api/baseApi.ts`), protected by Next.js Edge Middleware and JWT Bearer authentication.

```
+-----------------------+       REST + JWT        +-----------------------+       Mongoose        +-------------------+
|   Next.js Frontend    | <=====================> |  Express REST Server  | <===================> |   MongoDB Atlas   |
|  (RTK Query + Redux)  |   /api/v1/* endpoints   |  (Zod + JWT Guards)   |  Indexed Aggregations | (doctor-tracker)  |
+-----------------------+                         +-----------------------+                       +-------------------+
          |
          +--> Route Guard: src/middleware.ts + DashboardLayout (redirects unauthenticated traffic to /login)
          +--> API Layer:   src/lib/api/baseApi.ts (auto-injects Bearer token & handles 401 expiry)
          +--> Features:    src/lib/feature/{auth,dashboard,doctor,patient}/*Api.ts
          +--> UI Modules:  src/features/{auth,dashboard,doctors,patients}/components/*
```

---

## 4. Technical Decisions

### Decision 1: Redux Toolkit Query (RTK Query) over Context API / Manual `fetch`
We selected **RTK Query** (`baseApi.injectEndpoints`) paired with a lightweight `authSlice` instead of React Context API or raw `useEffect` fetch calls.
- **Automated Cache Invalidation:** Mutations (`createDoctor`, `updatePatient`, `deletePatient`) declare `invalidatesTags: ["Doctor", "Patient", "Dashboard"]`, causing Dashboard KPI cards, Charts, and Tables to stay automatically synchronized without manual state syncing or duplicate refetch boilerplate.
- **Request Deduplication & Loading States:** Components consume generated hooks (`useGetDoctorsQuery`, `useLoginMutation`) directly with built-in loading, caching, and `.unwrap()` error handling.

### Decision 2: Component-Wise Modular Architecture with Debounced Server Filtering
Instead of loading entire database collections into client memory, search (`useDebounce` at 300ms), specialization/condition/status filters, date-range filters (`startDate` / `endDate`), and pagination (`page`, `limit`) are delegated to MongoDB-indexed server endpoints.
- **Preventing Unnecessary Re-renders:** Each feature widget (`TopDoctorsTable`, `RecentPatientsTable`, `PatientsOverviewChart`, `DoctorsBySpecialtyChart`, `PatientsPerDoctorChart`) is isolated into its own single-responsibility component subscribing only to the query slice it needs.

---

## 5. Visual Evidence

> Desktop & Mobile screenshots demonstrating the responsive layout, Split-Screen Login, Analytics Dashboard, Doctors Management, and Patients Management views:

| View | Preview |
| :--- | :--- |
| **Login Page (Desktop)** | Split-screen royal blue clinical portal with demo credential autofill |
| **Admin Dashboard (Desktop)** | 4 Sparkline KPI cards, Patients Overview Area Chart, Doctors by Specialty Donut Chart, Patients per Doctor Bar Chart, Top Doctors & New Patients tables |
| **Doctors & Patients (Desktop)** | Search, Multi-filter + Date-wise range filters, Paginated Tables, and Doctor Profile Patient-Linkage View |
| **Responsive Mobile View** | Auto-collapsing drawer sidebar (`<1280px`), stacked KPI cards, and scrollable responsive tables |
