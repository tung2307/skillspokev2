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
    "/api/trpc/stores.getStoreProfilePicture,stores.getStoreProfile,users.getUserStoreProfile",
    "/api/trpc/review.getClerkUserReview,review.getStoreReview,users.getUserbyId",
    "/api/trpc/project.getProjectPicture",
    "/api/trpc/stores.getStoreProfilePicture,stores.getStoreProfile,users.getUserStoreProfile,project.getStoreProject,review.getStoreReview,users.getUserbyId,project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,review.getClerkUserReview",
    "/api/trpc/project.getStoreProject,review.getStoreReview,users.getUserbyId,users.getUserStoreProfile",
    "/api/trpc/stores.getStoreProfilePicture,stores.getStoreProfile,users.getUserStoreProfile,review.getStoreReview,users.getUserbyId,project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,review.getClerkUserReview",
    "/api/trpc/project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,review.getClerkUserReview",
    "/api/trpc/project.getStoreProject,review.getClerkUserReview,review.getStoreReview,users.getUserbyId,users.getUserStoreProfile",
    "/api/trpc/project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,project.getProjectPicture,project.getStoreProject,review.getClerkUserReview,users.getUserbyId,stores.getStoreProfile,users.getUserStoreProfile",
    "/api/trpc/stores.getStoreProfilePicture,stores.getStoreProfile,users.getUserStoreProfile,project.getStoreProject,review.getStoreReview,users.getUserbyId,review.getClerkUserReview",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
