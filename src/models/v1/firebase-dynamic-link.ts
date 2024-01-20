//#region Request
export interface FirebaseDynamicLinkRequest {
    dynamicLinkInfo: FirebaseDynamicLinkInfo
}

interface FirebaseDynamicLinkInfo {
    domainUriPrefix: string;
    link: string;
    androidInfo: FirebaseAndroidInfo;
    iosInfo: FirebaseIosInfo;
    navigationInfo: FirebaseNavigationInfo;
}

interface FirebaseAndroidInfo {
    androidPackageName: string;
    androidMinPackageVersionCode: string;
}

interface FirebaseIosInfo {
    iosBundleId: string;
    iosAppStoreId: string;
}

interface FirebaseNavigationInfo {
    enableForcedRedirect: boolean;
}
//#endregion

//#region Response
export interface FirebaseDynamicLinkResponse {
    shortLink: string;
    previewLink: string;
}
//#endregion