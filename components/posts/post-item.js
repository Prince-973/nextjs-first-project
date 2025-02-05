import React from "react";
import classes from "./post-item.module.css";
import Link from "next/link";
import Image from "next/image";
function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const imagePath = `/images/posts/${slug}/${image}`;
  const LinkPath = `/images/posts/${slug}`;
  return (
    <li className={classes.post}>
      <Link href={LinkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time datetime="">{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
// /home/dev/Project-1/API_next/blog_App/public/images/posts/getting-started-with-nextjs/getting-started-with-nextjs.jpg
