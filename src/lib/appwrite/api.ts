import { INewUser } from "@/models";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

//Creates new user account
export const createUserAccount = async (user: INewUser) => {
  try {
    //creates new account from register form
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;

    //show new user initials as avatar icon
    const avatarUrl = avatars.getInitials(user.name);

    //save user to db using custom function
    const newUser = await saveUserDb({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      userName: user.username,
      imageUrl: avatarUrl,
    });
    return newAccount;
  } catch (error) {
    console.error(error);
  }
}

//Saves user to d
export const saveUserDb = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  userName?: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
  } catch (error) {
    console.log(error);
  }
};

// Login In
export const loginAccount = async (user: {email: string, password: string}) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error)
  }
  
}

//Get User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.usersCollectionId,
    [Query.equal('accountId', currentAccount.$id)]
    )
    if (!currentUser) throw Error

    return currentUser.documents[0];
 
  } catch (error) {
    console.log(error)
  }
}