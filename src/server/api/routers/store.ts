import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Store } from "@prisma/client";
import { utapi } from "uploadthing/server";

export const storeRouter = createTRPCRouter({
  checkIfStoreIsFavorite: privateProcedure
    .input(z.object({ storeId: z.string(), clerkId: z.string() }))
    .query(async ({ ctx, input }) => {
      let isFavorite = false;
      if (ctx.userId === input.clerkId) {
        const isSaved = await ctx.prisma.storeFavorite.findFirst({
          where: {
            storeId: input.storeId,
            clerkId: input.clerkId,
          },
        });
        if (isSaved !== null) {
          isFavorite = true;
        }
      }
      return isFavorite;
    }),
  checkStoreIsFavorite: privateProcedure.query(async ({ ctx }) => {
    const clerkId = ctx.userId;
    const isSaved = await ctx.prisma.storeFavorite.findMany({
      where: {
        clerkId: clerkId,
      },
    });
    return isSaved;
  }),
  createFavorite: privateProcedure
    .input(z.object({ storeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const clerkId = ctx.userId;
      const save = await ctx.prisma.storeFavorite.create({
        data: {
          ...input,
          clerkId: clerkId,
        },
      });
      return save;
    }),
  deleteFavorite: privateProcedure
    .input(z.object({ storeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const clerkId = ctx.userId;
      const deleteSave = await ctx.prisma.storeFavorite.delete({
        where: {
          storeId_clerkId: {
            storeId: input.storeId,
            clerkId: clerkId,
          },
        },
      });
      return deleteSave;
    }),

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
