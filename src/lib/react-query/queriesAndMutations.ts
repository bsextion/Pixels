import { INewUser } from '../../models/index';
import { createUserAccount, loginAccount, logoutAccount } from "@/lib/appwrite/api";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}


export const useLoginAccount = () => {
    return useMutation({
       mutationFn: (user: {email: string, password: string}) => loginAccount(user)
    })
}

export const useLogoutAccount = () => {
    return useMutation({
       mutationFn: logoutAccount
    })
}