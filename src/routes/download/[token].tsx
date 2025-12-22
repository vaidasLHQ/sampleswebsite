import { Title } from "@solidjs/meta";
import { createResource, For, Show } from "solid-js";
import { useParams } from "@solidjs/router";

type DownloadItem = {
  filename: string;
  url: string;
};

export default function DownloadPage() {
  const params = useParams();

  const [data] = createResource(async () => {
    const res = await fetch(`/api/downloads?token=${encodeURIComponent(params.token)}`);
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Invalid download link");
    }
    return (await res.json()) as { items: DownloadItem[] };
  });

  return (
    <main class="download-page">
      <Title>Your downloads - TRNDFY</Title>

      <section class="download-inner">
        <h1>Your downloads</h1>

        <Show when={data.loading}>
          <p>Loading…</p>
        </Show>

        <Show when={data.error}>
          <div class="download-error">
            <p>{(data.error as any)?.message ?? "Invalid download link"}</p>
          </div>
        </Show>

        <Show when={data()}>
          <div class="download-list">
            <For each={data()!.items}>
              {(it) => (
                <a class="download-item" href={it.url} rel="noopener">
                  {it.filename}
                </a>
              )}
            </For>
          </div>
          <p class="download-note">Links are time-limited and regenerated when you open this page.</p>
        </Show>
      </section>
    </main>
  );
}





