"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import useAxiosPublic from "./UseAxiosPublic";

export const InsertContext = createContext(null);

const InsertPosts = ({ children }) => {
    const [dataToInsert, setDataToInsert] = useState();
    const [fetchedData, setFetchedData] = useState([])
    const axios = useAxiosPublic();

    const dataInsert = async (api) => {
        try {
            console.log(dataToInsert, 'insertion');
            const insertedResponse = await axios.post(api, dataToInsert);
            console.log("Inserted:", insertedResponse.data.dataToInsert);
            console.log("Data to Insert:", dataToInsert);
        } catch (error) {
            console.error("Error inserting data:", error);
        }
    };

    const fetchApi = useCallback(async (api) => {
        if (!api) return;
        const res = await axios.get(api)
        setFetchedData(res.data)
        return res.data;
    }, [axios])

    



    const value = { setDataToInsert, dataInsert, fetchApi, fetchedData };

    return <InsertContext.Provider value={value}>{children}</InsertContext.Provider>;
};

export default InsertPosts;
