import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
function ProfilePage(props) {
  return <UserProfile session={props.session} />;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
