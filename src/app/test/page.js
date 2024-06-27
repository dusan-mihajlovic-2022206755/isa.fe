"use client"
import useAuth from "@/hooks/useAuth";
import {Button} from "reactstrap";

export default function TestPage() {
    const AxiosAuth = useAuth();

    const callTest = async () => {
        const test = await AxiosAuth.get("/users/get-list")
    }

    return(
        <>
            <Button className="btn btn-primary" onClick={() => {
                callTest();
            }}>Call function</Button>
        </>
    )
}