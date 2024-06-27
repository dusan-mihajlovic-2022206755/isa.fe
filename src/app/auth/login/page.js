"use client"
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";

export default function LoginPage({searchParams}) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onSubmit',
    });

    return (
        <div>
            {searchParams?.message && (
                <div className="alert alert-danger" role="alert">
                    {searchParams?.message}
                </div>
            )}

            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control mb-2"  {...register("email")}/>
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && (
                    <div className={"text-danger mb-2"}>{errors.email?.message}</div>
                )}
            </div>
            <div className="form-floating">
                <input type="password" className="form-control mb-2" {...register("password")}/>
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && (
                    <div className={"text-danger mb-2"}>{errors.password?.message}</div>
                )}
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="button" onClick={() => {
                handleSubmit(async (data) => {
                    try {
                        const result = await signIn("credentials", {
                            email: data.email,
                            password: data.password,
                            redirect: false,  // Set redirect to false to handle the result manually
                        });
                        if (result.error) {
                            console.error('Sign-in error:', result.error);
                            // Handle sign-in error (e.g., show an error message to the user)
                        } else {
                            console.log('Sign-in success:', result);
                            // Handle successful sign-in (e.g., redirect to a different page)
                            window.location.href = result.url || "/";
                        }
                    } catch (error) {
                        console.error('Sign-in failed:', error);
                        // Handle unexpected errors
                    }
                })();
            }}>Sign in
            </button>
        </div>
    );
}