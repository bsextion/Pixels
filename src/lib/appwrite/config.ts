import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

//retreieve env variables
export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID, //for media
    savedCollectionId: import.meta.env.VITE_APPWRITE_SAVED_COLLECTION_ID, 
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_ID_COLLECTION_ID,
    postsollectionId: import.meta.env.VITE_APPWRITE_POSTS_ID_COLLECTION_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.endpoint);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

