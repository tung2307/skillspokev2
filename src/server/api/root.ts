import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "./routers/project";
import { reviewRouter } from "./routers/review";
import { storeRouter } from "./routers/store";
import { userRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  stores: storeRouter,
  review: reviewRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
