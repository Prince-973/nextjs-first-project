import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";

function ContextPage() {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your message" />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContextPage;
