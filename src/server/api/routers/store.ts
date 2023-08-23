import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  //createUser: privateProcedure.input(z.object({ userId: z.string() })),
  getServices: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.location);
      if (input.location != "Loading..." ?? input.location != "") {
        const service = await ctx.prisma.store.findMany({
          where: {
            city: input.location,
            remote: true,
          },
          take: 3,
          orderBy: {
            storePicture: {
              _count: "desc",
            },
          },
        });
        return service;
      }
      return null;
    }),
  getStoreProfile: privateProcedure
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
