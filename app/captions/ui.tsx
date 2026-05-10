"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";

type Platform = "instagram" | "facebook" | "whatsapp";
type Tone = "professional" | "friendly" | "luxury" | "energetic";
type Category =
  | "business"
  | "sale"
  | "new-arrival"
  | "service"
  | "food"
  | "travel"
  | "real-estate";

const hashtagPacks: Record<Category, string[]> = {
  business: ["#SmallBusiness", "#BusinessOwner", "#Entrepreneur", "#LocalBusiness", "#SupportLocal", "#BongoBiz"],
  sale: ["#Sale", "#LimitedTime", "#Discount", "#Deal", "#ShopNow", "#Offer"],
  "new-arrival": ["#NewArrival", "#JustIn", "#NewCollection", "#NowAvailable", "#Trending", "#MustHave"],
  service: ["#Service", "#Professional", "#Trusted", "#Quality", "#CustomerFirst", "#BookNow"],
  food: ["#Foodie", "#FoodLovers", "#Delicious", "#Homemade", "#Fresh", "#Yummy"],
  travel: ["#Travel", "#Wanderlust", "#Explore", "#Trip", "#Adventure", "#TravelGram"],
  "real-estate": ["#RealEstate", "#Property", "#DreamHome", "#HomeForSale", "#Invest", "#Realtor"],
};

function titleCase(s: string) {
  return s
    .split(/[\s-]+/g)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCaption({
  product,
  offer,
  city,
  tone,
  platform,
  category,
}: {
  product: string;
  offer: string;
  city: string;
  tone: Tone;
  platform: Platform;
  category: Category;
}) {
  const p = product.trim() || "our latest";
  const c = city.trim();
  const o = offer.trim();

  const hook =
    tone === "professional"
      ? `Now available: ${p}.`
      : tone === "luxury"
        ? `A refined drop: ${p}.`
        : tone === "energetic"
          ? `New drop alert: ${p}!`
          : `Fresh update: ${p}!`;

  const value =
    category === "sale"
      ? o
        ? `Offer: ${o}.`
        : "Limited-time deals available."
      : category === "service"
        ? "Fast, reliable service you can trust."
        : "Quality you’ll feel from day one.";

  const cta =
    platform === "whatsapp"
      ? "Reply here to order / book now."
      : "DM us to order • Limited slots today.";

  const location = c ? `📍 ${c}` : "";

  const lines = [hook, value, cta, location].filter(Boolean);
  return lines.join("\n");
}

export function CaptionsClient() {
  const [platform, setPlatform] = React.useState<Platform>("instagram");
  const [tone, setTone] = React.useState<Tone>("professional");
  const [category, setCategory] = React.useState<Category>("business");
  const [product, setProduct] = React.useState("Suronno Enterprises");
  const [offer, setOffer] = React.useState("10% OFF this week");
  const [city, setCity] = React.useState("Kolkata");
  const [hashtagCount, setHashtagCount] = React.useState("12");

  const caption = React.useMemo(
    () =>
      buildCaption({
        product,
        offer,
        city,
        tone,
        platform,
        category,
      }),
    [product, offer, city, tone, platform, category]
  );

  const tags = React.useMemo(() => {
    const base = hashtagPacks[category] ?? [];
    const count = Math.max(3, Math.min(30, Number(hashtagCount) || 12));
    const mixed = shuffle([...base, "#BongoBizTools", "#MadeInIndia", "#QualityMatters"]);
    return mixed.slice(0, Math.min(count, mixed.length)).join(" ");
  }, [category, hashtagCount]);

  const output =
    platform === "instagram"
      ? `${caption}\n\n${tags}`
      : platform === "facebook"
        ? `${caption}\n\n${tags}`
        : caption;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Platform">
            <Select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="whatsapp">WhatsApp</option>
            </Select>
          </Field>

          <Field label="Tone">
            <Select value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="luxury">Luxury</option>
              <option value="energetic">Energetic</option>
            </Select>
          </Field>

          <Field label="Category">
            <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              <option value="business">Business</option>
              <option value="sale">Sale</option>
              <option value="new-arrival">New arrival</option>
              <option value="service">Service</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="real-estate">Real estate</option>
            </Select>
          </Field>

          <Field label="Brand / product / topic">
            <Input value={product} onChange={(e) => setProduct(e.target.value)} />
          </Field>
          <Field label="Offer (optional)">
            <Input value={offer} onChange={(e) => setOffer(e.target.value)} />
          </Field>
          <Field label="City (optional)">
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </Field>

          <Field label="Hashtag count" hint="3–30">
            <Input inputMode="decimal" value={hashtagCount} onChange={(e) => setHashtagCount(e.target.value)} />
          </Field>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPlatform("instagram");
                setTone("professional");
                setCategory("business");
                setProduct("Suronno Enterprises");
                setOffer("10% OFF this week");
                setCity("Kolkata");
                setHashtagCount("12");
              }}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(output);
              }}
            >
              Copy output
            </Button>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Platform" value={titleCase(platform)} subvalue="Target" />
          <Stat label="Tone" value={titleCase(tone)} subvalue="Style" />
          <Stat label="Category" value={titleCase(category)} subvalue="Hashtags" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Generated output</h2>
          <div className="mt-4 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
            <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-zinc-100">
              {output}
            </pre>
          </div>
          {platform !== "whatsapp" ? (
            <div className="mt-4 rounded-2xl bg-white/5 p-4 text-xs text-zinc-400 ring-1 ring-white/10">
              Tip: Rotate hashtag packs per post to avoid repetition. Keep the most important tags at the front.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

