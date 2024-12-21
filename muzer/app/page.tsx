import Image from "next/image";
import Appbar from "./components/Appbar";
import { useSession } from "next-auth/react";
// console.log(process.env.GOOGLE_CLIENT_SECRET);
export default function Home() {
  return (
    <div>
        <Appbar/>
    </div>
  );
}
 