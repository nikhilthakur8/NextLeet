import React from "react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision.jsx";
import { ColourfulText } from "../ui/colourful-text.jsx";
import { motion } from "motion/react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input.jsx";
import { Button } from "../ui/moving-border.jsx";
import subscribeUser from "../../appwrite/config.js";
const placeholders = [
    "payalKhanna324@gmail.com",
    "nishusharma24@outlook.com",
    "rahul.verma87@yahoo.com",
    "anita_singh1990@gmail.com",
    "arjun.mehra22@rediffmail.com",
    "deepika.rathi11@gmail.com",
    "manoj.patil76@outlook.com",
    "sneha.kapoor05@gmail.com",
    "vishal.kumar999@yahoo.com",
    "meena.joshi321@gmail.com",
];

export const Home = () => {
    const [message, setMessage] = React.useState({
        message: "",
        type: "",
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = e.target[0].value;
        if (email && regex.test(email)) {
            try {
                await subscribeUser(email);
                setMessage({
                    message:
                        "Thanks for subscribing! You will receive the next LeetCode question in your inbox.",
                    type: "success",
                });
            } catch (error) {
                setMessage({
                    message: error.message,
                    type: "error",
                });
            }
        } else {
            alert("Please enter a valid email address");
        }
    };

    // useEffect(() => {
    //     subscribeNotification();
    // }, []);
    // we will see this in future
    // async function subscribeNotification() {
    //     const permission = await Notification.requestPermission();
    //     if (permission !== "granted") {
    //         alert("Please allow notifications to subscribe");
    //         return;
    //     }
    //     const registration = await navigator.serviceWorker.register("/sw.js");
    //     const publicKey =
    //         "BPC87lEuILyQlGijtLRa812h7Ee2KxULPI-6G8ulRqd5uu6a4LW2d9ieQAnfHuoGo71WrfuCbxP6xENs_-eslRc";
    //     const existingSubscription =
    //         await registration.pushManager.getSubscription();
    //     if (existingSubscription) {
    //         return;
    //     }
    //     const subscription = await registration.pushManager.subscribe({
    //         userVisibleOnly: true,
    //         applicationServerKey: urlBase64ToUint8Array(publicKey),
    //     });

    //     await axios.post("subscribe", subscription, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });

    //     alert("Subscribed successfully!");
    // }
    // function urlBase64ToUint8Array(base64String) {
    //     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    //     const base64 = (base64String + padding)
    //         .replace(/\-/g, "+")
    //         .replace(/_/g, "/");

    //     const rawData = atob(base64);
    //     const outputArray = new Uint8Array(rawData.length);

    //     for (let i = 0; i < rawData.length; ++i) {
    //         outputArray[i] = rawData.charCodeAt(i);
    //     }
    //     return outputArray;
    // }

    return (
        <div className="">
            <div className="absolute pl-8 py-2 md:py-5  z-20 bg-neutral-950 border-b border-b-neutral-900 w-full md:text-4xl text-3xl font-bold">
                <ColourfulText text="Next Leet" />
            </div>
            <BackgroundBeamsWithCollision className="min-h-svh flex-col px-5  md:px-5 xl:px-0">
                <div className="md:text-5xl xl:text-6xl text-4xl font-bold bg-gradient-to-t mb-4 from-neutral-500 to-neutral-200 bg-clip-text text-transparent text-center">
                    Get Tomorrow's Leetcode Question, Today!
                </div>
                <p className="text-neutral-300  md:text-lg xl:text-2xl text-sm">
                    For India, Next Leetcode Question is available at 9:30 PM
                    IST instead of tomorrow 5:30 AM IST.
                </p>

                <div className="mt-8">
                    <Button
                        onClick={() => {
                            window.open(
                                "https://nextleet.vercel.app/",
                                "_blank"
                            );
                        }}
                        borderRadius="4rem"
                        className="bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-white border-neutral-200 dark:border-neutral-800  text-base md:text-lg "
                    >
                        Get TLD Now
                    </Button>
                </div>

                <div className=" w-full text-white text-start mt-10  md:text-lg xl:text-xl text-sm">
                    <p className="text-neutral-300 mb-4 text-center">
                        Next LeetCode Daily in your inbox at 9:30 PM daily :
                    </p>
                    {message?.message && message.message.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1 }}
                            className={` ${
                                message.type === "error"
                                    ? "text-red-600/[0.8]"
                                    : "text-green-600"
                            }  tracking-tight flex items-center justify-center`}
                        >
                            {message.message}
                        </motion.div>
                    ) : (
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onSubmit={onSubmit}
                            type="email"
                        />
                    )}
                </div>
            </BackgroundBeamsWithCollision>
        </div>
    );
};
