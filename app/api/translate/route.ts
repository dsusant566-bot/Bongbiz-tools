import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const from = searchParams.get('from') || 'en';
  const to = searchParams.get('to') || 'bn';

  if (!text) {
    return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // The Google Translate API response structure for 'dt=t' is [[["translatedText","originalText",null,null,1]],null,"sourceLanguage"]
    const translatedText = data[0][0][0];

    return NextResponse.json({ translatedText });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to translate' }, { status: 500 });
  }
}
