import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Store } from "@prisma/client";
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
            OR: [{ district: input.location }, { remote: true }],
          },
        });
        return store;
      }
      return null;
    }),
  getStoreUserProfile: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }): Promise<Store[] | null> => {
      if (input.userId != "") {
        const store = await ctx.prisma.store.findMany({
          where: {
            userId: input.userId,
          },
        });
        return store;
      }
      return null;
    }),
  getStoreProfile: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.storeId != "") {
        const store = await ctx.prisma.store.findFirst({
          where: {
            id: input.storeId,
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
        service: z.string(),
        remote: z.boolean(),
        phone: z.string(),
        address1: z.string(),
        address2: z.string(),
        ward: z.string(),
        district: z.string(),
        city: z.string(),
        introduction: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isStore = await ctx.prisma.store.findFirst({
        where: {
          name: input.name,
          service: input.service,
          district: input.district,
          city: input.city,
        },
      });
      if (isStore) {
        throw new Error("A store with the provided details already exists.");
      }

      console.log(input);
      const store = await ctx.prisma.store.create({
        data: {
          ...input,
        },
      });
      return store;
    }),
});
