import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  //createUser: privateProcedure.input(z.object({ userId: z.string() })),
  getStore: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.userId != "") {
        const store = await ctx.prisma.store.findFirst({
          where: {
            userId: input.userId,
          },
        });
        return store;
      }
      return null;
    }),
  create: privateProcedure
    .input(z.object({ name: z.string().min(1).max(280) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const user = await ctx.prisma.user.create({
        data: {
          clerkId: userId,
          name: input.name,
        },
      });
      return user;
    }),
});
