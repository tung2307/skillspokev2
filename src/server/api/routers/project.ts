import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { utapi } from "uploadthing/server";

export const projectRouter = createTRPCRouter({
  getStoreProject: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.storeProject.findMany({
        where: { storeId: input.storeId },
      });
      return project;
    }),

  deleteProject: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const projectPic = await ctx.prisma.projectPicture.findMany({
        where: { projectId: input.projectId },
      });

      try {
        // Wait until all delete operations are complete
        await Promise.all(
          projectPic.map((pic) => utapi.deleteFiles(pic.fileKey))
        );

        // Check if Promise.all() has completed successfully
        if (true) {
          await ctx.prisma.projectPicture.deleteMany({
            where: { projectId: input.projectId },
          });
          await ctx.prisma.storeProject.delete({
            where: { id: input.projectId },
          });
          return true;
        }
      } catch (error) {
        console.error("Error deleting files: ", error);
        // Handle error, e.g., roll back transaction or log the error
      }
      return false;
    }),

  getProjectPicture: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.projectPicture.findMany({
        where: { projectId: input.projectId },
      });
      return project;
    }),
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
