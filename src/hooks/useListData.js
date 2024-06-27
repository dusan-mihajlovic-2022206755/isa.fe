import {useCallback, useState} from "react";
import {get} from "@/core/httpClient";
import useAuth from "@/hooks/useAuth";

const useListData = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const AxiosAuth = useAuth();

    const getData = useCallback(async (url) => {
        setLoading(true);
        let result = await AxiosAuth.get(url);

        setData(result.data);
        setLoading(false);
    }, [url]);

    return {getData, loading, data};
};

export default useListData;