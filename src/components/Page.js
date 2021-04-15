import { useEffect } from "react";

export const Page = (props) => {
    const { title, setTitle } = props;
    useEffect(() => {
        setTitle(title);
        document.title = title;
    }, [title, setTitle]);
    return props.children;
};
