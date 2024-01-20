import { FirebaseDynamicLinkResponse } from "models";

const FirebaseService = {
    getDynamicLink:
        async (data: {
            merchantName: string,
            minAndroidVersion: string,
            iosAppStoreId: string
        }): Promise<FirebaseDynamicLinkResponse> => {

            console.log(`Function: 'FirebaseService.getDynamicLink()'`, data);

            return new Promise<FirebaseDynamicLinkResponse>(
                resolve => setTimeout(() => {
                    resolve({
                        shortLink: 'https://testcobrand.page.link/6V7Rt9cWH9Si661y6',
                        previewLink: 'ttps://testcobrand.page.link/6V7Rt9cWH9Si661y6?d=1'
                    })
                }, 1000));
        }
};

export default FirebaseService;
