export type InstagramPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

type InstagramMediaChild = {
  media_url?: string;
  media_type?: string;
};

type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data?: InstagramMediaChild[];
  };
};

type InstagramMediaResponse = {
  data?: InstagramMediaItem[];
};

const MEDIA_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_url,media_type}";

function resolveImageUrl(item: InstagramMediaItem): string | null {
  if (item.media_type === "IMAGE" && item.media_url) {
    return item.media_url;
  }

  if (item.media_type === "VIDEO" && item.thumbnail_url) {
    return item.thumbnail_url;
  }

  if (item.media_type === "CAROUSEL_ALBUM") {
    const firstChild = item.children?.data?.[0];
    if (firstChild?.media_url) {
      return firstChild.media_url;
    }
    if (item.media_url) {
      return item.media_url;
    }
  }

  return item.media_url ?? item.thumbnail_url ?? null;
}

function normalizePost(item: InstagramMediaItem): InstagramPost | null {
  const imageUrl = resolveImageUrl(item);
  if (!imageUrl) {
    return null;
  }

  return {
    id: item.id,
    imageUrl,
    permalink: item.permalink,
    caption: item.caption,
    timestamp: item.timestamp,
  };
}

export async function getInstagramMedia(
  limit = 12,
): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "INSTAGRAM_ACCESS_TOKEN is not set. Photography feed will be empty.",
      );
    }
    return [];
  }

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", MEDIA_FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        "Instagram API error:",
        response.status,
        await response.text(),
      );
      return [];
    }

    const payload = (await response.json()) as InstagramMediaResponse;
    const posts = (payload.data ?? [])
      .map(normalizePost)
      .filter((post): post is InstagramPost => post !== null);

    return posts;
  } catch (error) {
    console.error("Failed to fetch Instagram media:", error);
    return [];
  }
}

export function getInstagramProfileUrl(): string | null {
  const username = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME?.trim();
  if (!username) {
    return null;
  }

  return `https://instagram.com/${username.replace(/^@/, "")}`;
}
