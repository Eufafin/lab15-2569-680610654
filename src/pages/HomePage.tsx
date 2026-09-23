import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ระบบลงทะเบียนเรียน CPE & ISNE</CardTitle>
        </CardHeader>
        <CardContent>
          <Button >
            <Link to="/enrollment">ไปหน้าลงทะเบียนเรียน</Link>
          </Button>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        จัดทำโดย Kittipat Namjak รหัสนักศึกษา 680610654
      </p>

      <Footer className="mt-auto w-full" />
    </div>
  );
}