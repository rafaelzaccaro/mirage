import { GlimpseCard } from "@web/components/GlimpseCard";
import { Stack } from "@chakra-ui/react";

function truncateText(text: string): string {
  return text.length > 255 ? text.substring(0, 255) + "..." : text
}
export default async function Home() {
  const res = await fetch('http://localhost:7777/glimpses', { cache: 'no-store'});
  const data = await res.json()

  return <Stack direction={'row'} spacing={'3'}>{data.map((d: any) => {
    return (
      <GlimpseCard key={d.id} slug={d.slug} content={truncateText(d.content)} secret={d.secret} lifetime={d.lifetime} thumb={d.thumb}/>
    )
  })}</Stack>;
}
