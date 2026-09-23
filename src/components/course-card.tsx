import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onDelete?: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onDelete,
}: CourseCardProps) {
  const isEnrolled = !!enrolledAt;

  const formattedDate = enrolledAt
    ? new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(enrolledAt))
    : "";

  return (
    <Card>
      <CardHeader className="relative">
        {/* Badge */}
        <div
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs ${
            isEnrolled
              ? "bg-yellow-200 text-yellow-800 dark:bg-purple-900 dark:text-purple-300"
              : "bg-purple-200 text-purple-800 dark:bg-yellow-900 dark:text-yellow-300"
          }`}
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </div>

        <CardTitle className="pr-28 text-base">
          {course.courseTitle}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
          {course.instructors.join(", ")}
        </p>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>

            <p>โปรแกรม: {student.program}</p>

            <p>ลงทะเบียนเมื่อ: {formattedDate}</p>
          </div>

          {/* ปุ่มยกเลิกการลงทะเบียน */}
          <Button
            
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(course.courseId)}
          >
            <Trash2 className="text-red-500" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}