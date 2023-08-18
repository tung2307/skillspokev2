import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  //createUser: privateProcedure.input(z.object({ userId: z.string() })),
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          clerkId: input.userId,
        },
      });
      return user;
    }),
  create: privateProcedure
    .input(z.object({ name: z.string().min(1).max(280) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      console.log(input.name);
      const user = await ctx.prisma.user.create({
        data: {
          clerkId: userId,
          name: input.name,
        },
      });
      return user;
    }),
});
