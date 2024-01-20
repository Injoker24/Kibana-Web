import Axios from 'axios';
import { FirebaseDynamicLinkResponse, FirebaseDynamicLinkRequest } from 'models';

const FirebaseService = {
    getDynamicLink:
        async (data: {
            merchantName: string,
            minAndroidVersion: string,
            iosAppStoreId: string
        }): Promise<FirebaseDynamicLinkResponse> => {

            const request: FirebaseDynamicLinkRequest = {
                dynamicLinkInfo: {
                    domainUriPrefix: process.env.REACT_APP_FIREBASE_DOMAIN_URI_PREFIX || '',
                    link: `https://www.bca.co.id/Sakuku?partner=${data.merchantName}`,
                    androidInfo: {
                        androidPackageName: 'com.bca.sakuku',
                        androidMinPackageVersionCode: data.minAndroidVersion
                    },
                    iosInfo: {
                        iosBundleId: 'com.bca.sakuku',
                        iosAppStoreId: data.iosAppStoreId
                    },
                    navigationInfo: {
                        enableForcedRedirect: true
                    }
                }
            };

            const response =
                await Axios.post<FirebaseDynamicLinkResponse>(
                    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.REACT_APP_FIREBASE_KEY}`,
                    request
                );

            return response.data;
        }
};

export default FirebaseService;
