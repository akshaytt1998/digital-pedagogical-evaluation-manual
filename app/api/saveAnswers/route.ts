import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the request body
    const answers = body.answers; // Extract answers from the request body

    // Log the received answers (replace this with your database logic)
    console.log("Received answers:", answers);

    // Return a success response
    return NextResponse.json(
      { message: "Answers saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving answers:", error);
    return NextResponse.json(
      { message: "Failed to save answers" },
      { status: 500 }
    );
  }
}