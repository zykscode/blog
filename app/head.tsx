import HeadMeta from "#/components/HeadMeta";
import { useRouter } from "next/navigation";

export default function Head({title,description,content,date,image}) {
  const router = useRouter()
  console.log({router:router})
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`https://leerob.io$`} />
        <link rel="canonical" href={`https://leerob.io$`} />
        <meta property="og:type" content={''} />
        <meta property="og:site_name" content="Lee Robinson" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {date && (
          <meta property="article:published_time" content={date} />
        )}
      <link rel="icon" href="/favicon.ico" />
      <HeadMeta/>
    </>
  )
}
