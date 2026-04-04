import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const workflows = await prisma.workflow.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(workflows), { status: 200 });
  } catch (error) {
    console.error("LOAD ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Failed to load workflows" }),
      { status: 500 }
    );
  }
}