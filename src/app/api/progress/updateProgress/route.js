import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { courseId, chapterId, videoDone, quizDone, selectedAnswers } = body;

  try {
    const existingProgress = await prisma.userProgress.findFirst({
      where: {
        courseId,
        chapterId,
      },
    });
    if (!existingProgress) {
      // If there's no existing record, create a new one
      await prisma.userProgress.create({
        data: {
          courseId,
          chapterId,
          videoDone,
          quizDone,
        },
      });

      console.log("User progress created successfully");
    } else {
      if (videoDone) {
        // If there's an existing record, update it
        await prisma.userProgress.update({
          where: {
            id: existingProgress.id,
          },
          data: {
            videoDone,
          },
        });
        console.log("New user video progress updated successfully");

        return NextResponse.json({
          success: true,
        });
      }
      if (quizDone) {
        // If there's an existing record, update it
        await prisma.userProgress.update({
          where: {
            id: existingProgress.id,
          },
          data: {
            quizDone,
          },
        });

        console.log("New user quiz progress updated successfully");
      }
    }
    if (selectedAnswers) {
      for (const [questionId, selectedAnswer] of Object.entries(
        selectedAnswers
      )) {
        await prisma.question.update({
          where: { id: questionId },
          data: { selectedAnswer },
        });
      }

      // Fetch all questions for the given chapterId
      const allQuestions = await prisma.question.findMany({
        where: {
          chapterId,
        },
      });

      // Filter questions where selectedAnswer is not null and matches answer
      const matchingQuestions = allQuestions.filter((question) => {
        return (
          question.selectedAnswer !== null &&
          question.selectedAnswer === question.answer
        );
      });

      // Create a new entry in the History model
      await prisma.history.create({
        data: {
          chapterId, // Assuming chapterId is already defined
          correct: matchingQuestions.length,
        },
      });

      console.log("New user quiz answers and history updated successfully");
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json({
        success: true,
      });
    }
  } catch (error) {
    console.error("Error updating user progress:", error);
    return new NextResponse(error, { status: 500 });
  }
}
