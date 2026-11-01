'use client'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [showInstructionsPopup, setShowInstructionsPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRole) {
      router.push(`/questionaire?role=${selectedRole}`);
    } else {
      alert('Please select a role before submitting.');
    }
  };

  // Close popup on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowRolePopup(false);
        setShowInstructionsPopup(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent background scroll when popup is open
  useEffect(() => {
    document.body.style.overflow =
      showRolePopup || showInstructionsPopup ? 'hidden' : 'auto';
  }, [showRolePopup, showInstructionsPopup]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Head>
        <title>Digital Pedagogical Evaluation Manual for MOOC</title>
        <meta
          name="description"
          content="Explore the Digital Pedagogical Evaluation Manual for Massive Open Online Courses (MOOCs)."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mooc-background.jpg"
          alt="MOOC Background"
          className="w-full h-full object-cover filter blur-sm"
        />
      </div>

      {/* Top Right Buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-4">
        <button
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 text-lg font-semibold"
          onClick={() => setShowInstructionsPopup(true)}
        >
          Instructions
        </button>

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-semibold"
          onClick={() => setShowRolePopup(true)}
        >
          Proceed
        </button>
      </div>

      {/* Main Title */}
      <div className="relative z-10 text-center bg-black bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Digital Pedagogical Evaluation Manual for MOOC
        </h1>
      </div>
       <div className="absolute bottom-4 left-4 p-75 text-white font-semibold text-lg z-20">
        Jerin P G
      </div>

      <div className="absolute bottom-4 right-4 p-75 text-white font-semibold text-lg z-20">
        Dr. Smitha S
      </div>


      {/* Role Selection Popup */}
      {showRolePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg w-11/12 max-w-md shadow-lg text-gray-800">
            <button
              onClick={() => setShowRolePopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Learner */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="Learner"
                    checked={selectedRole === 'Learner'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="text-lg text-gray-800">Learner</span>
                </label>

                {/* Teacher */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="Teacher"
                    checked={selectedRole === 'Teacher'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="text-lg text-gray-800">Teacher</span>
                </label>

                {/* Developer */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="Developer"
                    checked={selectedRole === 'Developer'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="text-lg text-gray-800">Developer</span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Instructions Popup */}
      {showInstructionsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg w-11/12 max-w-2xl shadow-lg text-gray-800 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowInstructionsPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            {/* Replace this with your actual long instruction text */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h1 className="text-3xl font-bold mb-4">Section A: Guidelines for Using the Evaluation Manual</h1>
              <h2 className="text-2xl font-bold mb-4">
                I. Introduction
              </h2>
              <h3 className="text-1xl font-bold mb-4">
                Background and Rationale
              </h3>
              <p>
                Over the last decade, MOOCs have reshaped the way people learn and teach. They have
                brought world-class courses to anyone with an internet connection, breaking barriers of distance,
                cost, and time. Yet, even with these advantages, there is an ongoing debate about their
                effectiveness. Many MOOCs see high enrollments but low completion rates. Learners often feel
                motivated in the beginning, but struggle to stay engaged. Instructors face challenges in balancing
                technology with pedagogy. Institutions, too, find it difficult to measure the true impact of these
                courses.
              </p>
              <p>
                Most existing evaluation efforts look only at a single side of the problem—some focus on
                technology, others on content, and a few on learner satisfaction. What is missing is a tool that can
                bring all these aspects together and give a complete picture of the strengths and weaknesses of a
                MOOC. This is the gap that this manual attempt to fill.
              </p>
              <h3 className="text-1xl font-bold mb-4">

                Purpose and Scope of the Manual
              </h3>
              <p>
                The purpose of this manual is straightforward: to offer a practical and holistic way to
                evaluate MOOCs. Unlike manuals made for large institutions or accreditation bodies, this
                framework is designed at the course level. It focuses directly on how a learner experiences the
                MOOC and how the course has been designed to meet educational goals.
                What makes this work different is that it is not just a static paper-based manual. It is
                created as a digital evaluation tool, which means it can be used easily across platforms, scaled for
                larger groups, and integrated with automated processes for quicker results. This makes it both
                flexible and future-ready.
              </p>
              <p>

                The manual is meant to be useful for a wide range of people:
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Teachers and course developers who want structured feedback on their MOOCs.
                  </li>
                  <li>
                    Learners who can share their experiences in a more guided way.
                  </li>
                  <li>
                    Researchers and evaluators who want reliable data for academic or policy studies.
                  </li>
                  <li>
                    Institutions and decision-makers who look for consistent measures of quality in online
                    courses.
                  </li>
                </ul>
                <br />
                <h3 className="text-1xl font-bold mb-4">
                  Objectives of the Evaluation Manual
                </h3>
                <p>
                  The main objectives of this manual are to:<br />
                  1. Create a comprehensive evaluation framework that looks at MOOCs from six
                  pedagogical perspectives: psychological, sociological, philosophical, technological,
                  content, and assessment.<br />

                  2. Use different types of items—Yes/No, Checklists, Rating Scales, And Open-Ended
                  responses—so that both numbers and narratives are captured.
                  3. Keep the evaluation learner-centered and inclusive, recognizing the diverse needs of
                  people who join MOOCs.<br />
                  4. Build the tool in a digital format, making it suitable for automation and large-scale use
                  without losing depth.<br />
                  5. Encourage a culture of continuous improvement, where the insights gained from
                  evaluation lead to better course design and richer learning experiences.
                </p>
                <br />
                <br />
                <h2 className="text-2xl font-bold mb-4">
                  II. Core Principles
                </h2>
                <p>
                  The development of this digital evaluation manual is grounded in strong pedagogical and
                  theoretical foundations. While MOOCs have gained global attention, their evaluation often
                  remains fragmented, focusing either on technology or on learner satisfaction alone. To overcome
                  this limitation, the present manual brings together insights from six complementary perspectives:
                  psychological theories of learning and motivation, sociological perspectives on participation and
                  inclusivity, philosophical reflections on the purposes of education, technological considerations
                  for digital learning environments, the quality and organization of content, and the role of
                  assessment in shaping learning outcomes. Together, these perspectives ensure that evaluation
                  does not remain superficial but captures the entire learning experience of MOOCs—from design
                  and delivery to learner engagement and outcomes.
                </p>
                <p>
                  Another guiding principle is the recognition that MOOCs should not be evaluated only as
                  technological products but as learning environments shaped by pedagogy and human experience.
                  The manual emphasizes learner-centeredness, inclusivity, and accessibility as core values. Every
                  criterion has been designed to reflect the realities of learners—how they stay motivated, how
                  they interact with peers and instructors, and how they make meaning from their learning
                  journeys. In this sense, the evaluation goes beyond measuring features to considering the lived
                  experiences of those who participate in MOOCs.
                </p>
                <p>
                  The framework is also influenced by Stufflebeam’s CIPP model of evaluation, which
                  stresses the importance of examining Context, Input, Process, and Product. Although originally

                  7

                  designed for program-level evaluations, the principles of the CIPP model have been adapted here
                  to suit the evaluation of a single course. Context and Input are addressed through the course
                  profile and design-related criteria, Process is captured through learner engagement and course
                  delivery, and Product is reflected in the assessment practices and outcomes of the MOOC.
                </p>
                <p>
                  Above all, the manual rests on the principle of continuous improvement. Evaluation is
                  not seen as a final judgment, but as a reflective exercise that allows educators and institutions to
                  strengthen their courses. By presenting the tool in a digital format, the process becomes more
                  efficient, scalable, and adaptable to automation, ensuring that results can be generated quickly
                  while still preserving depth and quality.
                </p>
                <br />
                <br />
                <h2 className="text-2xl font-bold mb-4">
                  III. Structure of the Evaluation Manual
                </h2>
                <p>
                  This evaluation manual has been designed to provide a 360-degree evaluation of
                  MOOCs, capturing the course experience from every possible angle. Rather than limiting
                  evaluation to a checklist of features or a single dimension, the framework brings together six
                  interrelated domains and four types of items. This layered structure ensures that both the
                  measurable aspects of a course and the lived experiences of learners are considered.
                </p>
                <br />
                <h3 className="text-1xl font-bold mb-4">
                  Domains of Evaluation
                </h3>
                <p>
                  The manual is built on six broad domains, each representing a different lens through
                  which a MOOC can be examined: <br />
                </p>
                1. Psychological Aspects – Focuses on how learners stay motivated, how they experience
                engagement, and how cognitive load is managed. It also considers accessibility features,
                inclusivity for diverse learners, and the role of design in sustaining attention.
                <br />2. Sociological Aspects – Examines how learners connect with one another, the sense of
                belonging that develops in online communities, and the inclusivity of different cultural
                and social backgrounds. It also looks at collaboration, peer learning, and the opportunities
                MOOCs provide for social interaction.
                <br />3. Philosophical Aspects – Reflects on the underlying educational values and orientations
                of the course. This includes questions of equity, ethics, learner autonomy, and the broader
                purpose of education in a digital world.
                <br />4. Technological Aspects – Considers the usability, navigation, reliability, and adaptability
                of the platform. It examines how well the technical features support learning rather than
                distract from it.
                <br />5. Content – Looks at the clarity, accuracy, relevance, and organization of course material.
                It also evaluates how content balances depth with accessibility and whether it is updated
                to reflect current knowledge.
                <br />6. Assessment – Evaluates how learner progress is tracked and measured. This includes the
                variety of assessment methods, their fairness, the quality of feedback, and the extent to
                which assessments encourage deeper learning.
                <p>
                  Together, these six domains ensure that evaluation extends beyond surface checks to capture the
                  holistic educational value of a MOOC.
                </p>
                <br />
                <h3 className="text-1xl font-bold mb-4">
                  Types of Items Used
                </h3>
                <p>
                  To evaluate each domain effectively, the manual uses four kinds of items:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Yes/No questions – Simple factual checks (e.g., “Does the course provide transcripts for
                    all videos?”).
                  </li>

                  <li>

                    Checklists – To record which features are present (e.g., peer discussion forums,
                    gamification, adaptive quizzes).
                  </li>
                  <li>
                    Rating scales – Five-point Likert items that capture perceptions of quality, usability, and
                    effectiveness. These provide quantitative data for statistical analysis.
                  </li>
                  <li>
                    Open-ended questions – Space for learners and evaluators to describe experiences, share
                    suggestions, or highlight issues that fixed items may miss.
                  </li>
                </ul>
                <p>
                  This combination blends the precision of quantitative measures with the depth of
                  qualitative feedback, ensuring that the evaluation is both reliable and meaningful.
                </p>

<br></br>
                <h2 className="text-2xl font-bold mb-4">
                  IV. How to Use This Manual
                </h2>
                <p>
                  This manual is intended for use by a wide range of stakeholders involved in MOOCs. It
                  has been designed to make evaluation straightforward, flexible, and meaningful for both
                  academic and practical purposes.
                </p>
                <br />
                <h3 className="text-1xl font-bold mb-4">
                  1. Who Can Use It
                </h3>
                <p>
                  The tool can be applied by different stakeholders, each contributing a valuable
                  perspective:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Learners – share direct experiences of the course, highlighting engagement, motivation,
                    and challenges.
                  </li>
                  <li>
                    Instructors and teachers – reflect on design choices, delivery methods, and learner
                    interaction.
                  </li>
                  <li>
                    Course developers and designers – check the balance between pedagogy, technology, and
                    content.
                  </li>
                  <li>
                    Experts and researchers – conduct systematic reviews for quality assurance or academic
                    studies.
                  </li>
                  <li>
                    Institutions and policymakers – use findings to shape guidelines and standards for
                    MOOCs.
                  </li>
                </ul>
                <p>
                  By including all these groups, the tool enables a 360-degree evaluation, ensuring that
                  MOOCs are viewed from every relevant angle.
                </p>
                <br />
                <h3 className="text-1xl font-bold mb-4">
                  2. Response Formats
                </h3>
                <p>
                  To capture both facts and perceptions, this manual uses four different types of items.
                  Each has a clear response format to maintain consistency across evaluations:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    1 Yes/No Items → Answer “Yes” if the feature is present and “No” if it is absent.
                    For scoring: Yes = 1 mark, No = 0 marks.
                    Example: “Does the course provide downloadable transcripts for all videos?”
                  </li>
                  <li>
                    2 Checklists → Select all features that apply from the list provided.
                    Example: “Tick if the course includes peer discussion forums, gamification, adaptive
                    quizzes, or project-based assignments.”
                  </li>
                  <li>
                    Rating Scales (Likert-type items) → Depending on the phrasing of the item, different
                    scales are used. All of them are five-point, ordered scales that allow respondents to
                    express their judgments with precision. The three scales used in this manual are:
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Agreement Scale (Pure Likert)
                        1 = Strongly Disagree
                        2 = Disagree
                        3 = Neutral
                        4 = Agree
                        5 = Strongly Agree
                        Example: “The platform activities helped me stay motivated throughout the
                        course.”
                      </li>
                      <li>
                        Effectiveness Scale
                        1 = Not Effective
                        2 = Slightly Effective
                        3 = Moderately Effective
                        4 = Effective
                        5 = Highly Effective
                        Example: “Rate the effectiveness of the discussion forum in supporting peer
                        learning.”
                      </li>
                      <li>
                        Quality Scale
                        1 = Very Poor
                        2 = Poor
                        3 = Average
                        4 = Good
                        5 = Excellent
                        Example: “Evaluate the quality of the course videos in terms of clarity and
                        presentation.”
                      </li>
                    </ul>
                  </li>
                  <li>
                    Open-ended Questions → Provide written responses that cannot be captured in fixed
                    categories.
                    Example: “What aspects of the course did you find most helpful, and what changes
                    would you recommend?”
                    These responses are not scored numerically but analyzed qualitatively to gain deeper
                    insights.
                  </li>
                </ul>
                <br></br>
                <h3 className="text-1xl font-bold mb-4">
                  3. Time and Mode of Administration
                </h3>
                <p>
                  One of the defining features of MOOCs is their accessibility—anyone, from anywhere, at
                  any time, can participate as long as they have a device and an internet connection. This manual
                  has been created in the same spirit. It is designed as a digital evaluation tool, so stakeholders can
                  complete it easily through a shared link, using a computer, tablet, or mobile phone.
                </p>
                <p>
                  Since it is digital, much of the process can be automated. Responses can be collected in
                  real time, scores can be generated instantly, and reports can be prepared with minimal effort.
                  This allows the tool to be applied widely without overburdening evaluators.
                </p>
                <p>
                  At the same time, recognizing that internet access may not always be available, the
                  manual can also be adapted for offline use. Paper-based responses may be collected and later
                  entered into the system for scoring and analysis, ensuring inclusivity for all participants.
                </p>
                <p>
                  The manual contains around 426 items, and the average completion time is between 1 to
                  1.5 hours. While this may appear lengthy compared to a typical feedback survey, it is important
                  to note that this is not just a short response form but a comprehensive evaluation manual for an
                  entire MOOC. The purpose is to capture the psychological, sociological, philosophical,
                  technological, content-related, and assessment aspects of the course in detail. Hence, the time
                  invested ensures that the evaluation reflects the full depth and complexity of a complete learning
                  experience.
                </p>
                <br></br>
                <h2 className="text-2xl font-bold mb-4">
                  V. Scoring and Interpretation
                </h2>
                <p>
                  The evaluation manual is designed not only to collect responses but also to generate
                  meaningful results that can guide reflection and improvement. Since the tool uses different types
                  of items, the scoring method varies depending on the item type.
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                     <h3 className="text-1xl font-bold mb-4">
                      1. Yes/No Items
                      </h3>
                    These items are scored in a simple binary format:
                    Yes = 1 mark
                    No = 0 marks
                    Scores can be summed within a domain or reported as percentages (e.g., “12 out of 15
                    features present = 80%”).
                  </li>
                  <li>
                     <h3 className="text-1xl font-bold mb-4">
                    2. Checklists
                    </h3>
                    Each selected option within a checklist item is recorded as a positive response. The
                    percentage of features available in the MOOC is calculated using the formula:

                    For example, selecting 6 out of 10 features equals 60% availability.
                    To maintain uniformity across checklists of varying lengths, the percentage is converted into a
                    four-point grade, adapted from the NAAC Accreditation Framework (2020):
                    <br></br>
                    <table className="border-collapse border border-gray-400 w-full text-left">
                      <thead className="bg-blue-200">
                        <tr>
                          <th className="border border-gray-400 px-4 py-2">Percentage of Features Available</th>
                          <th className="border border-gray-400 px-4 py-2">Grade Point</th>
                          <th className="border border-gray-400 px-4 py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">0-25 %</td>
                          <td className="border border-gray-400 px-4 py-2">1</td>
                          <td className="border border-gray-400 px-4 py-2">Poor</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">26-50 %</td>
                          <td className="border border-gray-400 px-4 py-2">2</td>
                          <td className="border border-gray-400 px-4 py-2">Moderate</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">51-75 %</td>
                          <td className="border border-gray-400 px-4 py-2">3</td>
                          <td className="border border-gray-400 px-4 py-2">Good</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">76-100 %</td>
                          <td className="border border-gray-400 px-4 py-2">4</td>
                          <td className="border border-gray-400 px-4 py-2">Excellent</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <br></br>
                  <li>
                    <h3 className="text-1xl font-bold mb-4">
                      3. Rating Scales (Likert-type items)
                    </h3>
                    <p>
                      The manual uses three variations of Likert-type scales, depending on the wording of the
                      item:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Agreement Scale (1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Strongly
                        Agree, 5 = Strongly Agree)
                      </li>
                      <li>
                        Effectiveness Scale (1 = Not Effective, 2 = Slightly Effective, 3 = Moderately
                        Effective, 4 = Effective, 5 = Highly Effective)
                      </li>
                      <li>
                        Quality Scale (1 = Very Poor 1 = Very Poor, 2 = Poor, 3 = Average, 4 = Good, 5 =
                        Excellent)
                      </li>
                    </ul>
                    <p>
                      Responses are scored from 1 to 5. Subscale scores are calculated by taking the average
                      rating across items in that domain.
                    </p>
                  </li>
                  <li>

                    <h3 className="text-1xl font-bold mb-4">
                      4. Domain (Subscale) Scores
                    </h3>
                    <p>
                      Each of the six domains—Psychological, Sociological, Philosophical, Technological,
                      Content, and Assessment—receives its own score.
                      Scores from Yes/No, checklists, and rating-scale items are combined into a domain-level average
                      or percentage.
                      This allows evaluators to identify strengths and weaknesses in specific areas of the MOOC.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-1xl font-bold mb-4">
                      5. Overall Evaluation Score
                    </h3>
                    <p>
                      The domain scores can then be combined to produce an overall evaluation score for the
                      course. This score reflects the MOOC’s quality in a holistic way, considering both quantitative
                      and qualitative feedback.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-1xl font-bold mb-4">
                      6. Computation of Total Marks and Overall Pedagogical Score
                    </h3>
                    <p>
                      Each domain of the Pedagogical Evaluation Manual for MOOCs comprises a specific
                      number of items across three response formats—Yes/No, Likert scale, and Checklist items. For
                      each item type, the maximum possible score is determined based on the scoring criteria outlined
                      earlier. The sum of these maximum values represents the total possible marks for each domain.
                    </p>
                    <table className="border-collapse border border-gray-400 w-full text-left">
                      <thead className="bg-blue-200">
                        <tr>
                          <th className="border border-gray-400 px-4 py-2">Domain</th>
                          <th className="border border-gray-400 px-4 py-2">Yes/No Items</th>
                          <th className="border border-gray-400 px-4 py-2">Likert Items</th>
                          <th className="border border-gray-400 px-4 py-2">Checklist Items</th>
                          <th className="border border-gray-400 px-4 py-2">Total Maximum Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">Psychological Aspects</td>
                          <td className="border border-gray-400 px-4 py-2">47</td>
                          <td className="border border-gray-400 px-4 py-2">17</td>
                          <td className="border border-gray-400 px-4 py-2">1</td>
                          <td className="border border-gray-400 px-4 py-2">136</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">Sociological Aspects</td>
                          <td className="border border-gray-400 px-4 py-2">52</td>
                          <td className="border border-gray-400 px-4 py-2">21</td>
                          <td className="border border-gray-400 px-4 py-2">6</td>
                          <td className="border border-gray-400 px-4 py-2">181</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">Philosophical Aspects</td>
                          <td className="border border-gray-400 px-4 py-2">24</td>
                          <td className="border border-gray-400 px-4 py-2">43</td>
                          <td className="border border-gray-400 px-4 py-2">8</td>
                          <td className="border border-gray-400 px-4 py-2">271</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">Technological Aspects</td>
                          <td className="border border-gray-400 px-4 py-2">39</td>
                          <td className="border border-gray-400 px-4 py-2">28</td>
                          <td className="border border-gray-400 px-4 py-2">9</td>
                          <td className="border border-gray-400 px-4 py-2">215</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">Content Aspects</td>
                          <td className="border border-gray-400 px-4 py-2">34</td>
                          <td className="border border-gray-400 px-4 py-2">15</td>
                          <td className="border border-gray-400 px-4 py-2">10</td>
                          <td className="border border-gray-400 px-4 py-2">149</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">Assessment Aspects</td>
                          <td className="border border-gray-400 px-4 py-2">36</td>
                          <td className="border border-gray-400 px-4 py-2">22</td>
                          <td className="border border-gray-400 px-4 py-2">10</td>
                          <td className="border border-gray-400 px-4 py-2">186</td>
                        </tr>
                        <tr className="bg-blue-100 font-bold">
                          <td className="border border-gray-400 px-4 py-2">Overall Total</td>
                          <td className="border border-gray-400 px-4 py-2">232</td>
                          <td className="border border-gray-400 px-4 py-2">146</td>
                          <td className="border border-gray-400 px-4 py-2">44</td>
                          <td className="border border-gray-400 px-4 py-2">1138</td>
                        </tr>
                      </tbody>
                    </table>
                    <br></br>
                    <p>
                      Thus, the manual carries a maximum total of 1138 marks distributed across six
                      pedagogical domains.
                      <br></br>
                      During testing or actual evaluation, the evaluator records the marks obtained for each
                      item. The sum of all obtained marks within a domain is compared against its maximum to yield a
                      percentage score using the formula:
                      <br></br>
                      This approach ensures uniform interpretation across MOOCs and allows comparison
                      between different courses. The same formula can be extended to calculate the overall
                      pedagogical percentage score across all domains:
                      <br></br>
                      The resulting percentage values may be interpreted according to the following grading scale:
                    </p>
                    <br></br>
                    <table className="border-collapse border border-gray-400 w-full text-left">
                      <thead className="bg-blue-200">
                        <tr>
                          <th className="border border-gray-400 px-4 py-2">Percentage Range</th>
                          <th className="border border-gray-400 px-4 py-2">Grade</th>
                          <th className="border border-gray-400 px-4 py-2">Interpretation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">81-100%</td>
                          <td className="border border-gray-400 px-4 py-2">A</td>
                          <td className="border border-gray-400 px-4 py-2">Excellent</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">61-80%</td>
                          <td className="border border-gray-400 px-4 py-2">B</td>
                          <td className="border border-gray-400 px-4 py-2">Good</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="border border-gray-400 px-4 py-2">41-60%</td>
                          <td className="border border-gray-400 px-4 py-2">C</td>
                          <td className="border border-gray-400 px-4 py-2">Moderate</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-400 px-4 py-2">0-40%</td>
                          <td className="border border-gray-400 px-4 py-2">D</td>
                          <td className="border border-gray-400 px-4 py-2">Need Improvement</td>
                        </tr>
                      </tbody>
                    </table>

                    <br></br>
                    <p>
                      This total mark and percentage-based scoring structure allows the evaluator to provide
                      both domain-specific and overall ratings for a MOOC, making the evaluation process
                      transparent, standardized, and easily comparable across courses.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-1xl font-bold mb-4">
                      7. Interpretation of Scores
                    </h3>
                    <p>
                      To make results more meaningful, scores can be interpreted using descriptive ranges such as:
                      <ul className="list-disc ml-6 space-y-2">
                        <li>
                          Below 40% → Needs significant improvement
                        </li>
                        <li>
                          41–60% → Satisfactory, but areas for improvement remain
                        </li>
                        <li>
                          61–80% → Good, with many strengths
                        </li>
                        <li>
                          81–100% → Excellent, demonstrates high-quality design and delivery
                        </li>

                      </ul>
                      <p>
                        These ranges are flexible and can be adapted based on the context of the study or
                        institutional requirements.
                      </p>
                      <li>
                        <h3 className="text-1xl font-bold mb-4">
                          8. Role of Open-Ended Responses
                        </h3>
                        <p>
                          In addition to numerical scores, the manual also collects open-ended feedback from
                          respondents. These qualitative responses are not assigned marks but are analyzed to capture
                          themes, suggestions, and challenges that may not appear in the quantitative results.
                          <br></br>
                          For example, while a course might receive a high average score in the Technological
                          Aspects domain, open-ended responses may reveal recurring issues such as internet connectivity
                          problems or navigation difficulties. Similarly, suggestions for improving assessments,
                          introducing new activities, or enhancing content creativity often emerge more clearly from
                          written reflections.
                          <br></br>

                          When preparing domain-level or overall evaluation reports, these open-ended insights are
                          presented alongside the quantitative scores. This ensures that the evaluation remains holistic and
                          balanced, combining measurable results with lived experiences.
                        </p>
                      </li>
                    </p>
                  </li>
                  <li>
                    <h3 className="text-1xl font-bold mb-4">
                      9. Use of Results
                    </h3>
                    <p>
                      The results of this evaluation are meant to be used constructively for improving MOOCs.
                      Instructors and course developers can identify strengths and gaps, institutions can apply the
                      findings for quality assurance, and researchers can use the data for further study. Learner
                      feedback, both quantitative and qualitative, should be seen not as a judgment but as a guide for
                      continuous improvement.
                    </p>
                  </li>
                </ul>
                <br></br>
                <h2 className="text-2xl font-bold mb-4">
                  VI. Ethics and Confidentiality
                </h2>
                <p>
                  The evaluation process respects the dignity and rights of all participants. Responses
                  collected through this manual are treated with strict confidentiality and will be used only for
                  academic and quality improvement purposes. Individual responses will not be disclosed; only
                  aggregated results will be reported.
                  <br>
                  </br>
                  Participation in the evaluation is voluntary, and respondents may choose not to answer
                  any item if they are not comfortable. Care will be taken to ensure that feedback is used
                  constructively, without bias or prejudice, and solely for enhancing the quality of MOOCs.
                </p>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
