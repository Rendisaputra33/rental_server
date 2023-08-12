export declare const CLOUD = "Cloudinary";
export declare const CloudinaryProvider: {
    provide: string;
    useFactory: () => import("cloudinary").ConfigOptions;
};
