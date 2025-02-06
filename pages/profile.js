import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
function ProfilePage() {
  return <UserProfile />;
}

export default ProfilePage;
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Redirect if no session
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  // Ensure session.user and its properties are defined
  const user = session.user || {};
  user.name = user.name || null;
  user.image = user.image || null;

  return {
    props: {
      session: { ...session, user }, // Pass the modified session object
    },
  };
}

// export async function getServerSideProps(context) {
//   // const session = await getSession({ req: context.req });
//   const session = await getServerSession(context.req, context.res, authOptions);
//   session.user = session.user || {};
//   session.user.name = session.user.name || null;
//   session.user.image = session.user.image || null;

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }
