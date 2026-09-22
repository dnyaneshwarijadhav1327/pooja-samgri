import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {}

    // Clean file name
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error('File Upload Error:', error);

    // Fallback: Convert to Base64 Data URL if filesystem write has issues
    try {
      const data = await request.formData();
      const file: File | null = data.get('file') as unknown as File;
      if (file) {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');
        const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;
        return NextResponse.json({ success: true, url: dataUrl });
      }
    } catch (e) {}

    return NextResponse.json({ error: 'Failed to upload image file' }, { status: 500 });
  }
}
