import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, currentStudent } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Enrollment } from "@/lib/types";
type RegisterDialogProps = {
  enrollments: Enrollment[];
  onRegister: (enrollment: Enrollment) => void;
};

export function RegisterDialog({
  enrollments,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime());
  

function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!courseId) return;

  const now = new Date();

  const [hours, minutes] = time.split(":");

  now.setHours(Number(hours));
  now.setMinutes(Number(minutes));

  const newEnrollment: Enrollment = {
    studentId: currentStudent.studentId,
    courseId: courseId,
    enrolledAt: now.toISOString(),
  };

  onRegister(newEnrollment);

  setCourseId("");
  setOpen(false);
}
  function getCurrentTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
const enrolledCourseIds = enrollments
  .filter(
    (enrollment) =>
      enrollment.studentId === currentStudent.studentId
  )
  .map((enrollment) => enrollment.courseId);

const availableCourses = courses.filter(
  (course) => !enrolledCourseIds.includes(course.courseId)
);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        
        <Button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-plus" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent className="min-w-0 overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-4 min-w-0">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ</DialogDescription>
          </DialogHeader>

          <div className="space-y-2 min-w-0">
          <Label htmlFor="courseId">วิชา</Label>

          <Select
  value={courseId}
  onValueChange={(value) => setCourseId(value ?? "")}
  
>
  <SelectTrigger
    id="courseId"
    className="w-full min-w-0 overflow-hidden"
  >
<SelectValue placeholder="เลือกวิชา">
  <span className="min-w-0 block">
    {courseId
      ? (() => {
          const selectedCourse = courses.find(
            (course) => course.courseId === courseId
          );

          return selectedCourse
            ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
            : "";
        })()
      : ""}
  </span>
</SelectValue>
  </SelectTrigger>

  <SelectContent>
    {availableCourses.map((course) => (
      <SelectItem
        key={course.courseId}
        value={course.courseId}
      >
        {course.courseId} - {course.courseTitle}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
        </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">เวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input
              id="fullName"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">รหัสวิชา</Label>
            <Input
              id="program"
              value={currentStudent.program}
              readOnly
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>ยืนยันการลงทะเบียน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
