import {Client, Account, Databases, Functions, Storage, Teams, Users, Avatars} from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
}

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.endpoint);
