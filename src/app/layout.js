'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header/Header";
import Provider from "@/app/providers";
import SessionStatusWrapper from "@/components/Session/SessionStatusWrapper";
import {TestProvider} from "@/contexts/testContext";
import {ListActionProvider} from "@/contexts/listActionContext";
import {ToastContainer} from "react-toastify";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Provider>
            <SessionStatusWrapper>
                <div className="container py-3">
                    <Header/>
                    <main>
                        <TestProvider>
                            <ListActionProvider>
                                {children}
                            </ListActionProvider>
                        </TestProvider>
                    </main>
                    <Footer/>
                    <ToastContainer/>
                </div>
            </SessionStatusWrapper>
        </Provider>
        </body>
        </html>
    );
}
