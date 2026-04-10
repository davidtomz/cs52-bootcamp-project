import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getScore = query({
  args: {},
  handler: async (ctx) => {
    const record = await ctx.db.query("happiness").first();
    return record?.score ?? 0;
  },
});

export const vote = mutation({
  args: { delta: v.number() },
  handler: async (ctx, args) => {
    if (args.delta !== 1 && args.delta !== -1) {
      throw new Error("Delta must be +1 or -1.");
    }

    const record = await ctx.db.query("happiness").first();
    if (!record) {
      await ctx.db.insert("happiness", {
        score: args.delta,
        updatedAt: Date.now(),
      });
      return args.delta;
    }

    const nextScore = record.score + args.delta;
    await ctx.db.patch(record._id, {
      score: nextScore,
      updatedAt: Date.now(),
    });
    return nextScore;
  },
});
