import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Store } from "@prisma/client";
import { utapi } from "uploadthing/server";
import { StorePicture } from "@prisma/client";
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
      if (input.location !== "Loading..." && input.location !== "") {
        const store = await ctx.prisma.store.findMany({
          where: {
            service: {
              contains: input.service,
            },
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

  deleteStore: privateProcedure
    .input(z.object({ storeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.storeId != "") {
        const store = await ctx.prisma.store.delete({
          where: {
            id: input.storeId,
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
  getStoreProfilePicture: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.storeId != "") {
        const store = await ctx.prisma.storePicture.findFirst({
          where: {
            storeId: input.storeId,
          },
        });
        return store;
      }
      return null;
    }),
  createProfilePic: privateProcedure
    .input(
      z.object({
        storeId: z.string(),
        fileKey: z.string(),
        fileUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const storePicture = await ctx.prisma.storePicture.create({
        data: {
          ...input,
        },
      });
      return storePicture;
    }),
  deleteProfilePic: privateProcedure
    .input(z.object({ storeId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const storePicture = await ctx.prisma.storePicture.findFirst({
        where: {
          storeId: input.storeId,
          fileKey: input.name,
        },
      });

      if (storePicture) {
        await ctx.prisma.storePicture.delete({
          where: {
            id: storePicture.id,
          },
        });
        await utapi.deleteFiles(input.name);
      }
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
      const store = await ctx.prisma.store.create({
        data: {
          ...input,
        },
      });
      return store;
    }),
});
