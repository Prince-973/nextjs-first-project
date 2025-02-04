function UserProfilePage(props) {
  return <h1>{props.userName}</h1>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      userName: "Max",
    },
  };
}
export default UserProfilePage;
