import dbConnect from "@/lib/dbConnect";
import Contact from '@/models/Contact';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const contact = await Contact.findById(params.id);
    if (!contact) {
      return Response.json({ error: 'Không tìm thấy liên hệ' }, { status: 404 });
    }
    return Response.json(contact);
  } catch (error) {
    return Response.json({ error: 'Lỗi khi lấy thông tin liên hệ' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const updates = await req.json();
    const updatedContact = await Contact.findByIdAndUpdate(params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return Response.json({ error: 'Không tìm thấy liên hệ để cập nhật' }, { status: 404 });
    }

    return Response.json(updatedContact);
  } catch (error) {
    return Response.json({ error: 'Cập nhật liên hệ thất bại' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Contact.findByIdAndDelete(params.id);
    if (!deleted) {
      return Response.json({ error: 'Không tìm thấy liên hệ để xoá' }, { status: 404 });
    }
    return Response.json({ message: 'Đã xoá liên hệ' });
  } catch (error) {
    return Response.json({ error: 'Xoá liên hệ thất bại' }, { status: 500 });
  }
}
