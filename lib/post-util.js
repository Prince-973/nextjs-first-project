import path from "path";
import matter from "gray-matter";
import fs from "fs";
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostFile() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName);
  // console.log(filePath);

  const fileContent = fs.readFileSync(filePath, "utf8");
  // console.log(fileContent);

  const { data, content } = matter(fileContent);
  // console.log(data);

  const postSlug = fileName.replace(/\.md$/, ""); //remove file extention
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = getPostFile();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPost() {
  const allPosts = getAllPosts();
  // console.log(allPosts);

  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  // console.log(featuredPosts);

  return featuredPosts;
}
