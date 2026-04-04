export const runtime = "node.js";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();

    const workflow = await prisma.workflow.create({
      data: {
        userId,
        nodes: body.nodes,
        edges: body.edges,
      },
    });

    return new Response(JSON.stringify(workflow), { status: 200 });
  } catch (error) {
    console.error("SAVE ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Failed to save workflow" }),
      { status: 500 }
    );
  }
}