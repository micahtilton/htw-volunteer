import { authorize } from "@/auth";

export default async function() {
  return (<div>{JSON.stringify(await authorize({email:"micha@volunteer.com", password: "changeme"}))}</div>)
}