import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { courseId } = await req.json();

  try {
    // Delete the course along with all related records
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    console.log("Course and related records deleted successfully.");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return new NextResponse(error, { status: 500 });
  }
}
