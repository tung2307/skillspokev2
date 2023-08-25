import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  getServices: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(async ({ ctx, input }) => {
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
        if (service.length < 1) {
          return null;
        }
        return service;
      }
      return null;
    }),
  getSearch: publicProcedure
    .input(z.object({ service: z.string(), location: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.location != "Loading..." ?? input.location != "") {
        const store = await ctx.prisma.store.findMany({
          where: {
            service: input.service,
            city: input.location,
            remote: true,
          },
        });
        return store;
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
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(280),
        service: z.string(), // Maximum of 100 characters for service name
        remote: z.boolean(),
        phone: z.string(), // Assuming phone numbers will be between 10 to 15 characters
        address1: z.string(),
        address2: z.string(), // This is optional, so min is 0
        ward: z.string(),
        district: z.string(),
        city: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const store = await ctx.prisma.store.create({
        data: {
          ...input,
        },
      });
      return store;
    }),
});
