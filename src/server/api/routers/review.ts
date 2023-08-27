import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
export const reviewRouter = createTRPCRouter({
  getClerkUserReview: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.userId);
      return user;
    }),

  getStoreReview: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findMany({
        where: {
          storeId: input.storeId,
        },
      });
      return review;
    }),

  create: privateProcedure
    .input(
      z.object({
        storeId: z.string(),
        rating: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const review = await ctx.prisma.review.create({
        data: {
          ...input,
          userId: userId,
        },
      });
      return review;
    }),
});
