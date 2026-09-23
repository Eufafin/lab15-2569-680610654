import { useState } from "react";

import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { Footer } from "@/components/footer";

import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";

import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(initialEnrollments);

  function handleRegister(newEnrollment: Enrollment) {
    setEnrollments((prev) => [...prev, newEnrollment]);
  }

  function handleDelete(courseId: string) {
    setEnrollments((prev) =>
      prev.filter(
        (enrollment) =>
          !(
            enrollment.studentId === currentStudent.studentId &&
            enrollment.courseId === courseId
          )
      )
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <main className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex w-full items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">
                รายวิชาทั้งหมด
              </h1>

              <p className="text-muted-foreground">
                {currentStudent.firstName +
                  " " +
                  currentStudent.lastName +
                  " (" +
                  currentStudent.studentId +
                  ")"}
              </p>
            </div>

            <RegisterDialog
              enrollments={enrollments}
              onRegister={handleRegister}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((course) => {
            const enrollment = enrollments.find(
              (item) =>
                item.courseId === course.courseId &&
                item.studentId === currentStudent.studentId
            );

            return (
              <CourseCard
                key={course.courseId}
                course={course}
                student={currentStudent}
                enrolledAt={enrollment?.enrolledAt}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}