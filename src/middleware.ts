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
    "/api/uploadthing",
    "/api/trpc/stores.create",
    "/api/trpc/stores.getStoreProfilePicture,review.getStoreReview",
    "/api/trpc/review.getStoreReview,stores.getStoreProfile",
    "/api/trpc/users.getUserbyId,stores.getStoreProfile,users.getUserStoreProfile",
    "/api/trpc/review.getStoreReview,users.getUserbyId,users.getUserStoreProfile",
    "/api/trpc/stores.getStoreProfile,users.getUserStoreProfile,review.getStoreReview,users.getUserbyId",
    "/api/trpc/stores.getStoreProfilePicture,stores.getStoreProfile",
    "/api/trpc/stores.getStoreProfilePicture,review.getStoreReview,stores.getStoreProfile,users.getUserStoreProfile,users.getUserbyId",
    "/api/trpc/stores.getStoreProfilePicture,stores.getStoreProfile,users.getUserStoreProfile,review.getStoreReview,users.getUserbyId",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
