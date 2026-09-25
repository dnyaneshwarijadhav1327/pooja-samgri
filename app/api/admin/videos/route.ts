import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'making_videos.json');

const defaultVideos = [
  {
    id: "vid-1",
    title: "Pure Hand-Rolled Cotton Diya Wicks (Phool Batti)",
    category: "Diya Wicks",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=600",
    duration: "1:30 min",
    description: "Handcrafted by rural artisans using 100% unbleached virgin cotton for steady, long-lasting aarti flames."
  },
  {
    id: "vid-2",
    title: "Authentic Organic Bhimseni Camphor Distillation",
    category: "Camphor & Dhoop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=600",
    duration: "2:15 min",
    description: "Pure crystalline flakes harvested directly from pine trees, burning 100% cleanly without black residue."
  },
  {
    id: "vid-3",
    title: "Sacred Mysore Sandalwood & Turmeric Paste Preparation",
    category: "Sacred Pastes",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=600",
    duration: "1:45 min",
    description: "Traditional stone-grinding of fragrant Mysore Sandalwood infused with Kashmiri saffron and Gangajal."
  },
  {
    id: "vid-4",
    title: "51-Herb Vedic Havan Samagri Formulation",
    category: "Havan Samagri",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600",
    duration: "2:40 min",
    description: "Carefully selected blend of 51 Ayurvedic medicinal herbs, guggal, loban, and sacred dry fruits for auspicious Yagnas."
  },
  {
    id: "vid-5",
    title: "Hand-Rolled Natural Flora Agarbatti & Cow Dung Dhoop",
    category: "Incense Sticks",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600",
    duration: "1:55 min",
    description: "Charcoal-free incense hand-rolled with temple flowers, essential oils, and sacred herbs."
  },
  {
    id: "vid-6",
    title: "Artisanal Pure Brass Diya & Bell Crafting",
    category: "Brass Utensils",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600",
    duration: "2:10 min",
    description: "Traditional metalsmiths molding and engraving heavy pure brass diyas and resonant puja bells."
  }
];

function readVideos() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      const dataDir = path.dirname(dataFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultVideos, null, 2), 'utf-8');
      return defaultVideos;
    }
    const content = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading videos JSON file:', error);
    return defaultVideos;
  }
}

function writeVideos(videos: any[]) {
  try {
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(videos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing videos JSON file:', error);
  }
}

export async function GET() {
  const videos = readVideos();
  return NextResponse.json(videos);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, videoUrl, thumbnail, duration, description } = body;

    if (!title || !videoUrl) {
      return NextResponse.json({ error: 'Title and video URL are required.' }, { status: 400 });
    }

    const videos = readVideos();
    const newVideo = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      category: category ? category.trim() : 'Handcrafted Preparation',
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnail && thumbnail.trim() 
        ? thumbnail.trim() 
        : 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600',
      duration: duration ? duration.trim() : '1:30 min',
      description: description ? description.trim() : 'Traditional handcrafted pooja samagri made with pure Vedic ingredients.',
      createdAt: new Date().toISOString(),
    };

    videos.unshift(newVideo);
    writeVideos(videos);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('Failed to create video:', error);
    return NextResponse.json({ error: 'Failed to create video.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Video ID is required.' }, { status: 400 });
    }

    let videos = readVideos();
    videos = videos.filter((v: any) => v.id !== id);
    writeVideos(videos);

    return NextResponse.json({ success: true, message: 'Video deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete video:', error);
    return NextResponse.json({ error: 'Failed to delete video.' }, { status: 500 });
  }
}
