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
  getNewestReview: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: {
          store: {
            userId: input.userId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return reviews;
    }),

  getRecentReview: privateProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: {
          clerkId: input.clerkId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return reviews;
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
          clerkId: userId,
        },
      });
      return review;
    }),
});
