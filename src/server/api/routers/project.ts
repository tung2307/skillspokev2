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

  //   create: privateProcedure
  //     .input(z.object({}))
  //     .mutation(async ({ ctx, input }) => {
  //       return null;
  //     }),
});
