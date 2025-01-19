import React, {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useRouteName} from "@/utils/useRouteName";

const HeadTitle: React.FC = () => {
    const router = useRouter();
    const initialTitle = useRouteName(router.pathname);
    const [pageTitle, setPageTitle] = useState(`${initialTitle} - LogicAI`);

    useEffect(() => {
        setPageTitle(`${initialTitle} - LogicAI`);
    }, [initialTitle]);

    return (
        <Head>
            <title>{pageTitle}</title>
        </Head>
    );
};

export default HeadTitle;
