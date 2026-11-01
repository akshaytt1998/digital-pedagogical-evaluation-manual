import { NextResponse } from "next/server";
import data from './data'
export async function GET() {
    // const data = [
    //     {
    //       mainTitle: '1.Introduction',
    //       mainIndex: '1',
    //       categories: [
    //         {
    //           categoryTitle: '1.1 Profile of the course',
    //           categoryIndex: '1.1',
    //           questionsSet: [
    //             {
    //               question: "1. Name of the course",
    //               type: 4,
    //               index: 1
    //             },
    //             {
    //               question: "2. Course offering institute",
    //               type: 3,
    //               index: 2
    //             },
    //             {
    //               question: "3. Platform offering the course ",
    //               type: 3,
    //               index: 3
    //             },
    //             {
    //               question: "4. Name of the instructors with designation",
    //               type: 3,
    //               index: 4
    //             },
    //             {
    //               question: "5. Course Type",
    //               type: 3,
    //               index: 5
    //             },
    //             {
    //               question: "6. Language of the course content",
    //               type: 3,
    //               index: 6
    //             },
    //             {
    //               question: "7. No. of languages in which the course is available",
    //               type: 3,
    //               index: 7
    //             },
    //             {
    //               question: "8. Duration of the course",
    //               type: 3,
    //               index: 8
    //             },
    //             {
    //               question: "10. Credit Points",
    //               type: 3,
    //               index: 10
    //             },
    //             {
    //               question: "11. Expected academic level of the course",
    //               type: 1,
    //               index: 11,
    //               checklist: ["Foundation", "Preparatory", "Middle", "Secondary", "Graduate", "Post Graduate"]
    //             },
    //             {
    //               question: "12. Does the course conduct a certificate examination",
    //               type: 2,
    //               index: 12
    //             },
    //             {
    //               question: "13. The course authorized or recognized by",
    //               type: 1,
    //               index: 13,
    //               checklist: ["Government", "Privet"]
    //             },
    
    //           ]
    //         },
    //         {
    //           categoryTitle: '1.2 Detailed Information About the Course ',
    //           categoryIndex: '1.2',
    //           questionsSet: [
    //             {
    //               question: "1. Starting date",
    //               type: 3,
    //               index: 14
    //             },
    //             {
    //               question: "2. End  date",
    //               type: 3,
    //               index: 15
    //             },
    //             {
    //               question: "3. No. of learner enrolled",
    //               type: 3,
    //               index: 16
    //             },
    //             {
    //               question: "4. No. of learner certified",
    //               type: 3,
    //               index: 17
    //             },
    //             {
    //               question: "5. Does the course contain a detailed introduction video?",
    //               type: 2,
    //               index: 18
    //             },
    //             {
    //               question: "6. Does the course have a comprehensive written introduction?",
    //               type: 2,
    //               index: 19
    //             },
    //             {
    //               question: "7. Is the course free",
    //               type: 2,
    //               index: 20
    //             },
    //             {
    //               question: "8. Does the course mandate any prerequisites or background knowledge?",
    //               type: 2,
    //               index: 21
    //             },
    //             {
    //               question: "If Yes, Mention",
    //               type: 3,
    //               index: 22
    //             },
    //             {
    //               question: "9.Does the course introduction clearly state its learning objectives and the necessary skills learner will acquire?",
    //               type: 2,
    //               index: 23
    //             },
    //             {
    //               question: "10.How many testimonials has the course so far?",
    //               type: 3,
    //               index: 24
    //             },
    //             {
    //               question: "11.Does the course provide a section for FAQs(Frequently Asked Questions) ?",
    //               type: 2,
    //               index: 25
    //             },
    //             {
    //               question: "12.Does the course include references from recognized sources?",
    //               type: 2,
    //               index: 26
    //             },
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       mainTitle: 'Psychological',
    //       mainIndex: '2',
    //       categories: [
    //         {
    //           categoryTitle: 'User Interface',
    //           categoryIndex: '2.1',
    //           subCategories: [
    //             {
    //               title: 'Attractiveness',
    //               index: '2.1.1',
    //               questionsSet: [
    //                 { 
    //                     question: "", 
    //                     type: 1, 
    //                     checklist: [], 
    //                     index: 27 
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]

  return NextResponse.json({ questions: data });
}