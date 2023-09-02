import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getStoreProject: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.storeProject.findMany({
        where: { storeId: input.storeId },
      });
      return project;
    }),
  // getSpecificProject:privateProcedure.
  createProjectPicture: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
        fileUrl: z.string(),
        fileKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.projectPicture.create({
        data: {
          ...input,
        },
      });
      return project;
    }),
  create: privateProcedure
    .input(
      z.object({
        storeId: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.storeProject.create({
        data: {
          ...input,
          clerkId: ctx.userId,
        },
      });
      return project;
    }),
});
