// src/utils/Page.jsx
import { useEffect } from "react";

const Page = ({ title, children }) => {
    useEffect(() => {
        document.title = title || "TaskCrowd";
    }, [title]);

    return children;
};

export default Page;
