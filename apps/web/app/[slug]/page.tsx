export default async function Glimpse({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>
}