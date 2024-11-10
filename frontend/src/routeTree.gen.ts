/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StudentImport } from './routes/student'
import { Route as ForgotPasswordImport } from './routes/forgot-password'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AdminImport } from './routes/admin'
import { Route as IndexImport } from './routes/index'
import { Route as ResetPasswordEmailImport } from './routes/reset-password/$email'
import { Route as CertificateStudentIdImport } from './routes/certificate/$studentId'

// Create/Update Routes

const StudentRoute = StudentImport.update({
  path: '/student',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordRoute = ForgotPasswordImport.update({
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordEmailRoute = ResetPasswordEmailImport.update({
  path: '/reset-password/$email',
  getParentRoute: () => rootRoute,
} as any)

const CertificateStudentIdRoute = CertificateStudentIdImport.update({
  path: '/certificate/$studentId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/student': {
      id: '/student'
      path: '/student'
      fullPath: '/student'
      preLoaderRoute: typeof StudentImport
      parentRoute: typeof rootRoute
    }
    '/certificate/$studentId': {
      id: '/certificate/$studentId'
      path: '/certificate/$studentId'
      fullPath: '/certificate/$studentId'
      preLoaderRoute: typeof CertificateStudentIdImport
      parentRoute: typeof rootRoute
    }
    '/reset-password/$email': {
      id: '/reset-password/$email'
      path: '/reset-password/$email'
      fullPath: '/reset-password/$email'
      preLoaderRoute: typeof ResetPasswordEmailImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/dashboard': typeof DashboardRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/student': typeof StudentRoute
  '/certificate/$studentId': typeof CertificateStudentIdRoute
  '/reset-password/$email': typeof ResetPasswordEmailRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/dashboard': typeof DashboardRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/student': typeof StudentRoute
  '/certificate/$studentId': typeof CertificateStudentIdRoute
  '/reset-password/$email': typeof ResetPasswordEmailRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/dashboard': typeof DashboardRoute
  '/forgot-password': typeof ForgotPasswordRoute
  '/student': typeof StudentRoute
  '/certificate/$studentId': typeof CertificateStudentIdRoute
  '/reset-password/$email': typeof ResetPasswordEmailRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/dashboard'
    | '/forgot-password'
    | '/student'
    | '/certificate/$studentId'
    | '/reset-password/$email'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin'
    | '/dashboard'
    | '/forgot-password'
    | '/student'
    | '/certificate/$studentId'
    | '/reset-password/$email'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/dashboard'
    | '/forgot-password'
    | '/student'
    | '/certificate/$studentId'
    | '/reset-password/$email'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRoute
  DashboardRoute: typeof DashboardRoute
  ForgotPasswordRoute: typeof ForgotPasswordRoute
  StudentRoute: typeof StudentRoute
  CertificateStudentIdRoute: typeof CertificateStudentIdRoute
  ResetPasswordEmailRoute: typeof ResetPasswordEmailRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRoute,
  DashboardRoute: DashboardRoute,
  ForgotPasswordRoute: ForgotPasswordRoute,
  StudentRoute: StudentRoute,
  CertificateStudentIdRoute: CertificateStudentIdRoute,
  ResetPasswordEmailRoute: ResetPasswordEmailRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/admin",
        "/dashboard",
        "/forgot-password",
        "/student",
        "/certificate/$studentId",
        "/reset-password/$email"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/admin": {
      "filePath": "admin.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/forgot-password": {
      "filePath": "forgot-password.tsx"
    },
    "/student": {
      "filePath": "student.tsx"
    },
    "/certificate/$studentId": {
      "filePath": "certificate/$studentId.tsx"
    },
    "/reset-password/$email": {
      "filePath": "reset-password/$email.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
