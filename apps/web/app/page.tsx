export default async function Home() {
  const res = await fetch('http://localhost:7777/glimpses');
  const data = await res.json()
  console.log(data)
  return <div>{data.map((d: any) => {
    return (
      <div key={d.id}>
        <div>{ d.slug }</div>
        <div>{ d.isPublic.toString() }</div>
      </div>
    )
  })}</div>;
}
