import { authMiddleware } from '@clerk/nextjs/server';

// Define a function to check for protected routes
const isProtectedRoute = (req) => {
  const protectedRoutes = ['/dashboard(.*)'];
  
};

export default authMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

// Exporting config
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
