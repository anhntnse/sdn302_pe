import dbConnect from "@/lib/dbConnect";
import Contact from '@/models/Contact';

// Lấy danh sách tất cả liên hệ
export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ name: 1 });
    return Response.json(contacts);
  } catch (error) {
    return Response.json({ error: 'Không thể lấy danh sách liên hệ' }, { status: 500 });
  }
}

// Tạo mới một liên hệ
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newContact = await Contact.create(body);
    return Response.json(newContact, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Tạo liên hệ thất bại' }, { status: 500 });
  }
}
