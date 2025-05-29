import React from "react";

export const Notification = ({ message }) => {
	console.log(message);
    return (
        <div className="text-gray-300 sticky py-1 md:text-base text-sm font-semibold drop-shadow-md bg-linear-65 from-zinc-900 to-slate-900 text-center">
            <p>{message}</p>
        </div>
    );
};
