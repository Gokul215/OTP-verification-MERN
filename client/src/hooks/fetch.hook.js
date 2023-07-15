import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));
                //console.log("2");
                // if(query){
                //  console.log(query);
                // }
                //  else{
                //     console.log("not")
                //  }
            //    const username  = !query ? await getUsername() :  await axios.get(`/api/${query}`).username;
               //const username=user.username;
                //console.log(username,"2");
                const username  = !query ? await getUsername() :'';
                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}