import { authMiddleware } from "@clerk/nextjs";
function normalizeRouteOrder(...routes: string[]): string {
  return routes.sort().join(",");
}
const publicRoutes: string[] = [
  "/",
  "/api/trpc/stores.getServices",
  "/api/trpc/stores.getSearch",
  "/api/trpc/stores.getStoreProfile",
  "/api/trpc/review.getStoreReview",
  "/api/trpc/review.getClerkUserReview",
  // ... other routes ...
];
function addRouteToPublicRoutes(...routes: string[]) {
  const normalizedRoute = normalizeRouteOrder(...routes);
  if (!publicRoutes.includes(normalizedRoute)) {
    publicRoutes.push(normalizedRoute);
  }
}

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/trpc/stores.getServices",
    "/api/trpc/stores.getSearch",
    "/api/trpc/stores.getStoreProfile",
    "/api/trpc/review.getStoreReview",
    "/api/trpc/review.getClerkUserReview",
    "/api/trpc/review.getStoreReview,review.getClerkUserReview",
    "/api/trpc/stores.getStoreProfile,review.getClerkUserReview",
    "/api/trpc/stores.getStoreProfile,review.getStoreReview,review.getClerkUserReview",
    "/api/trpc/review.getClerkUserReview,stores.getStoreProfile,review.getStoreReview",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
