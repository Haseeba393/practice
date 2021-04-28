/*
    File that contains apis
*/

import axios from "axios"
const APP_ID = '608911ff5e703f4523efe1b2';

/**
 * API to fetch posts
 * @param {String} limit 
 * @param {String} page 
 * @returns 
 */
export const _POST_API = (limit, page) => {
    return new Promise((resolve, reject)=>{
        try {
            axios({
                method: 'GET',
                url: "https://dummyapi.io/data/api/post?page=" + page + "&limit=" + limit,
                headers:{
                    "app-id": APP_ID
                }
            })
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            reject(err);
        }
    })
}